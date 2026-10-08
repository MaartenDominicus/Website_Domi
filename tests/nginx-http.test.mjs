import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import http from "node:http";
import test from "node:test";
import { gunzipSync } from "node:zlib";

// Explicit opt-in: this suite must never send requests to the public website.
const base = new URL(process.env.DOMI_NGINX_TEST_URL ?? "http://127.0.0.1:8080");
assert.equal(base.protocol, "http:");
assert.ok(["127.0.0.1", "[::1]"].includes(base.hostname), "use a loopback Nginx server");
assert.equal(base.pathname, "/");
const output = new URL("../out/", import.meta.url);

function request(path, encoding = "gzip", extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const req = http.get(new URL(path, base), {
      headers: { "Accept-Encoding": encoding, ...extraHeaders },
    }, res => {
      const chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
      res.on("error", reject);
    });
    req.setTimeout(5000, () => req.destroy(new Error("local Nginx request timed out")));
    req.on("error", reject);
  });
}

function securityHeaders(response) {
  assert.equal(response.headers["x-content-type-options"], "nosniff");
  assert.equal(response.headers["x-frame-options"], "DENY");
  assert.equal(response.headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.equal(response.headers["content-security-policy"],
    "base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action https://formsubmit.co");
}

test("mutable pages and files revalidate while unchanged content returns a bodyless 304", async () => {
  for (const path of ["/", "/en/", "/diensten/woningrenovatie/", "/kennis/veilige-elektrische-installatie/", "/robots.txt", "/sitemap.xml", "/projects/renovatie-amsterdam.webp"]) {
    const first = await request(path, "identity");
    assert.equal(first.status, 200, path);
    assert.equal(first.headers["cache-control"], "no-cache", path);
    assert.ok(first.headers.etag, path + " should have an ETag validator");
    assert.ok(first.headers["last-modified"], path + " should have a modification-time validator");
    securityHeaders(first);
    for (const validator of [{ "If-None-Match": first.headers.etag }, { "If-Modified-Since": first.headers["last-modified"] }]) {
      const unchanged = await request(path, "identity", validator);
      assert.equal(unchanged.status, 304, path);
      assert.equal(unchanged.body.length, 0, path);
      assert.equal(unchanged.headers["cache-control"], "no-cache", path);
      securityHeaders(unchanged);
    }
    const stale = await request(path, "identity", { "If-None-Match": '"domi-stale-validator"' });
    assert.equal(stale.status, 200, path);
    assert.deepEqual(stale.body, first.body, path);
  }
});

test("Nginx compresses exported text with byte-identical decoded content", async () => {
  const home = await readFile(new URL("index.html", output), "utf8");
  const assets = [...new Set([...home.matchAll(/(?:src|href)="([^" ]+\.(?:css|js))"/g)].map(([, path]) => path))];
  assert.ok(assets.some(path => path.endsWith(".css")));
  assert.ok(assets.some(path => path.endsWith(".js")));
  for (const path of ["/", "/en/", "/kennis/veilige-elektrische-installatie/", "/sitemap.xml", ...assets]) {
    const file = path.endsWith("/") ? `${path.slice(1)}index.html` : path.slice(1);
    const expected = await readFile(new URL(file, output));
    for (const headers of [{}, { Via: "1.1 local-proxy" }]) {
      const response = await request(path, "gzip", headers);
      assert.equal(response.status, 200, path);
      securityHeaders(response);
      if (expected.length >= 1024) {
        assert.match(response.headers.vary ?? "", /\bAccept-Encoding\b/i, path);
        assert.equal(response.headers["content-encoding"], "gzip", path);
        assert.deepEqual(gunzipSync(response.body), expected, path);
        assert.ok(response.body.length < expected.length, path + " compression should reduce transfer size");
      } else {
        assert.equal(response.headers["content-encoding"], undefined, path);
        assert.deepEqual(response.body, expected, path);
      }
    }
  }
});

test("Nginx respects clients declining gzip and leaves images and small files intact", async () => {
  const expected = await readFile(new URL("index.html", output));
  for (const encoding of ["identity", "gzip;q=0, identity;q=1"]) {
    const response = await request("/", encoding);
    assert.equal(response.status, 200);
    assert.equal(response.headers["content-encoding"], undefined);
    assert.deepEqual(response.body, expected);
  }
  for (const path of ["/robots.txt", "/projects/renovatie-amsterdam.webp"]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers["content-encoding"], undefined, path);
    assert.deepEqual(response.body, await readFile(new URL(path.slice(1), output)), path);
  }
});

test("Nginx preserves redirects, missing-resource status, security headers and asset caching", async () => {
  const redirect = await request("/contact.html");
  assert.equal(redirect.status, 308);
  const destination = new URL(redirect.headers.location, base);
  assert.equal(destination.pathname + destination.hash, "/#contact");
  securityHeaders(redirect);
  for (const path of ["/does-not-exist-compression-check", "/_next/static/missing.js"]) {
    const response = await request(path);
    assert.equal(response.status, 404, path);
    securityHeaders(response);
    assert.doesNotMatch(response.headers["cache-control"] ?? "", /max-age=31536000/);
  }
  const home = await readFile(new URL("index.html", output), "utf8");
  const css = home.match(/href="([^" ]+\.css)"/)?.[1];
  assert.ok(css);
  const asset = await request(css);
  assert.match(asset.headers["cache-control"], /max-age=31536000/);
  securityHeaders(asset);
});

test("explicit index documents redirect once to directory URLs without losing query strings", async () => {
  for (const [source, target] of [
    ["/index.html", "/"],
    ["/en/index.html?source=local&step=2", "/en/?source=local&step=2"],
    ["/diensten/water-sanitair/index.html", "/diensten/water-sanitair/"],
    ["/kennis/veilige-elektrische-installatie/index.html", "/kennis/veilige-elektrische-installatie/"],
    ["/projecten/riolering-apeldoorn/index.html", "/projecten/riolering-apeldoorn/"],
  ]) {
    const response = await request(source);
    assert.equal(response.status, 308, source);
    securityHeaders(response);
    assert.equal(response.headers.location, target, "relative redirect preserves HTTPS at the tunnel edge");
    const destination = new URL(response.headers.location, base);
    assert.equal(destination.origin, base.origin, source);
    assert.equal(destination.pathname + destination.search, target, source);
    const final = await request(target);
    assert.equal(final.status, 200, target + " must not redirect in a loop");
    const file = destination.pathname.slice(1) + "index.html";
    assert.deepEqual(final.headers["content-encoding"] === "gzip" ? gunzipSync(final.body) : final.body,
      await readFile(new URL(file, output)), target);
  }
  // Query text must not be mistaken for an explicit index-document path.
  const query = await request("/?next=/index.html");
  assert.equal(query.status, 200);
  const missing = await request("/missing-index-check/index.html");
  assert.equal(missing.status, 308);
  assert.equal((await request(new URL(missing.headers.location, base).pathname)).status, 404);
});
