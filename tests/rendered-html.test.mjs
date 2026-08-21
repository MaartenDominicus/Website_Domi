import assert from "node:assert/strict";
import test from "node:test";

async function request(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Domi Installatie home page", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Domi Installatie \| Bouw, installatie &amp; renovatie<\/title>/i);
  assert.match(html, /Eén vakteam/);
  assert.match(html, /<video class="hero-image"[^>]*autoPlay=""[^>]*muted=""[^>]*loop=""/);
  assert.match(html, /6474358-hd_1920_1080_25fps\.mp4/);
  assert.match(html, /id="over"/);
  assert.match(html, /id="diensten"/);
  assert.match(html, /id="projecten"/);
  assert.match(html, /id="reviews"/);
  assert.match(html, /id="kennis"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /domi-logo-intro\.gif/);
  assert.match(html, /Our work featured in/);
  assert.match(html, /Instagram/);
  assert.match(html, /LinkedIn/);
  assert.equal((html.match(/<small>Voorbeeldreview<\/small>/g) ?? []).length, 18);
  assert.equal((html.match(/class="review-card"/g) ?? []).length, 18);
  assert.match(html, /aria-label="Pauzeer"/);
  assert.equal((html.match(/aria-haspopup="dialog"/g) ?? []).length, 17);
  assert.equal((html.match(/class="service-card-shell/g) ?? []).length, 8);
  assert.equal((html.match(/class="service-more-button"/g) ?? []).length, 8);
  assert.equal((html.match(/class="service-image"/g) ?? []).length, 8);
  assert.equal((html.match(/<article class="project-card/g) ?? []).length, 6);
  assert.equal((html.match(/class="project-card-trigger"/g) ?? []).length, 6);
  assert.equal((html.match(/<span>Bekijk project<\/span>/g) ?? []).length, 6);
  assert.match(html, /Historisch pand renovatie/);
  assert.match(html, /project-card text-only/);
  assert.ok(html.indexOf('id="diensten"') < html.indexOf('id="projecten"'));
  assert.ok(html.indexOf('id="projecten"') < html.indexOf('id="over"'));
  assert.match(html, /class="review-navigation"/);
  assert.match(html, /<h2 id="featured-title">Our work featured in<\/h2>/);
  assert.match(html, /class="featured-marquee" role="list"/);
  assert.match(html, /\/logos\/linda\.png/);
  assert.match(html, /\/logos\/vtwonen\.png/);
  assert.doesNotMatch(html, /<details>/);
  assert.match(html, /aria-pressed="true"[^>]*>NL</);
  assert.match(html, /aria-pressed="false"[^>]*>EN</);
  assert.doesNotMatch(html, /Troos Bouw/i);
});

test("legacy section URLs redirect into the Domi one-page site", async () => {
  const response = await request("/contact.html");
  assert.ok([307, 308].includes(response.status));
  assert.match(response.headers.get("location") ?? "", /\/#contact$/);
});
