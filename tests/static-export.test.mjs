import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);
const read = (path) => readFile(new URL(path, output), "utf8");

test("exported documents are compatible with the Nginx form and embedding policy", async () => {
  const sitemap = await read("sitemap.xml");
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, url]) => new URL(url).pathname);
  let forms = 0;
  for (const file of [...routes.map(route => `${route.slice(1).replace(/\/$/, "")}${route === "/" ? "" : "/"}index.html`), "404.html"]) {
    const html = await read(file);
    assert.doesNotMatch(html, /<(?:base|object|embed)\b/i, file);
    assert.doesNotMatch(html, /\bformaction\s*=/i, file);
    for (const [, attributes] of html.matchAll(/<form\b([^>]*)>/gi)) {
      forms++;
      const action = attributes.match(/\baction="([^"]+)"/i)?.[1];
      assert.equal(action, "https://formsubmit.co/e2a3109e56f2b784903eb6ae24352c31", file);
      assert.match(attributes, /\bmethod="POST"/i, file);
    }
  }
  assert.equal(forms, 2, "Dutch and English contact forms remain available");
});

test("static error document has its own title and no homepage indexing signals", async () => {
  const html = await read("404.html");
  const head = html.split("</head>")[0];
  assert.match(head, /<title>Pagina niet gevonden \| Domi Installatie<\/title>/);
  assert.match(head, /<meta name="robots" content="noindex">/);
  assert.doesNotMatch(head, /rel="canonical"|rel="alternate"|property="og:|name="twitter:/);
  assert.match(html, /<h1>Deze pagina bestaat niet\.<\/h1>/);
  assert.match(html, /href="\/">Naar home/);
  assert.match(html, /href="\/#projecten">Bekijk projecten/);
  assert.match(head, /rel="stylesheet"/);
});

test("service and project skip links bypass headers into keyboard-focusable main content", async () => {
  const sitemap = await read("sitemap.xml");
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, url]) => new URL(url).pathname)
    .filter(path => /^\/(?:diensten|projecten|en\/projects)\//.test(path));
  assert.equal(routes.length, 19);
  for (const route of routes) {
    const html = await read(`${route.slice(1).replace(/\/$/, "")}/index.html`);
    const body = html.split(/<body\b[^>]*>/)[1];
    const target = route.startsWith("/diensten/") ? "service-content" : "project-content";
    const firstLink = body.match(/<a\b[^>]*>[\s\S]*?<\/a>/)?.[0];
    assert.ok(firstLink, route);
    assert.ok(firstLink.includes(`class="skip-link" href="#${target}"`), route);
    assert.ok(firstLink.includes(route.startsWith("/en/") ? "Skip to content" : "Direct naar de inhoud"), route);
    assert.equal((body.match(/<main\b/g) ?? []).length, 1, route);
    assert.equal((body.match(new RegExp(`id="${target}"`, "g")) ?? []).length, 1, route);
    assert.match(body, new RegExp(`<main id="${target}" tabindex="-1"`), route);
    assert.ok(body.indexOf("</header>") < body.indexOf(`<main id="${target}"`), route);
  }
});

test("every exported article has a first skip link to focusable main content beyond the header", async () => {
  const sitemap = await read("sitemap.xml");
  const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.matrisbouw\.nl(\/(?:kennis|en\/insights)\/[^<]+)<\/loc>/g)].map(([, route]) => route);
  assert.equal(routes.length, 16);
  for (const route of routes) {
    const html = await read(`${route.slice(1).replace(/\/$/, "")}/index.html`);
    const body = html.split(/<body\b[^>]*>/)[1];
    const firstLink = body.match(/<a\b[^>]*>[\s\S]*?<\/a>/)?.[0];
    assert.ok(firstLink, route);
    assert.match(firstLink, /class="skip-link" href="#article-content"/);
    assert.ok(firstLink.includes(route.startsWith("/en/") ? "Skip to content" : "Direct naar de inhoud"), route);
    assert.equal((body.match(/<main\b/g) ?? []).length, 1, route);
    assert.equal((body.match(/id="article-content"/g) ?? []).length, 1, route);
    assert.match(body, /<main id="article-content" tabindex="-1">\s*<article>/);
    assert.ok(body.indexOf("</header>") < body.indexOf('<main id="article-content"'), route);
  }
  const home = await read("index.html");
  const cssPaths = [...home.matchAll(/href="([^" ]+\.css)"/g)].map(([, path]) => path);
  const css = (await Promise.all(cssPaths.map(path => read(path.slice(1))))).join("\n");
  assert.match(css, /\.skip-link:focus\s*\{[^}]*top:\s*16px/);
});

test("finishing service is discoverable with complete static metadata and usable destinations", async () => {
  const route = "/diensten/tegel-stuc-schilderwerk";
  const url = `https://www.matrisbouw.nl${route}`;
  const html = await read(`${route.slice(1)}/index.html`);
  const head = html.split("</head>")[0];
  const home = await read("index.html");
  assert.ok(home.includes(`href="${route}"`));
  assert.ok((await read("sitemap.xml")).includes(`<loc>${url}</loc>`));
  assert.match(head, /<title>Tegel-, stuc- en schilderwerk bij verbouwing \| Domi Installatie<\/title>/);
  assert.ok(head.includes(`rel="canonical" href="${url}"`));
  assert.ok(head.includes(`property="og:url" content="${url}"`));
  assert.match(head, /name="description" content="Tegelwerk, stucwerk en schilderwerk/);
  assert.match(html, /<html lang="nl"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /href="#service-content"/);
  assert.match(html, /<main id="service-content"/);
  assert.match(html, /aria-current="page">Tegel-, stuc- en schilderwerk/);
  for (const [, heading] of html.matchAll(/<section\b[^>]*aria-labelledby="([^"]+)"/g)) {
    assert.ok(html.includes(`<h2 id="${heading}"`), heading);
  }
  const image = html.match(/<img\b[^>]*src="\/projects\/badkamer-amsterdam\.webp"[^>]*>/)?.[0];
  assert.ok(image);
  assert.match(image, /alt="[^"]+"/);
  assert.match(image, /width="640" height="530"/);
  assert.match(image, /loading="lazy" decoding="async"/);
  assert.ok((await readFile(new URL("projects/badkamer-amsterdam.webp", output))).length > 0);
  assert.match(html, /href="tel:\+31610983085"/);
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^" ]*)"/g)) {
    const [path, fragment] = href.split("#");
    const destination = path === "/" ? home : await read(`${path.slice(1)}/index.html`);
    assert.match(destination, /<main\b/, href);
    if (fragment) assert.ok(destination.includes(`id="${fragment}"`), href);
  }
});

test("home renovation service connects its documented projects and exports crawlable metadata", async () => {
  const route = "/diensten/woningrenovatie";
  const url = `https://www.matrisbouw.nl${route}`;
  const html = await read(`${route.slice(1)}/index.html`);
  const head = html.split("</head>")[0];
  const home = await read("index.html");
  assert.ok(home.includes(`href="${route}"`));
  assert.ok((await read("sitemap.xml")).includes(`<loc>${url}</loc>`));
  assert.match(head, /<title>Woningrenovatie en complete verbouwing \| Domi Installatie<\/title>/);
  assert.ok(head.includes(`rel="canonical" href="${url}"`));
  assert.ok(head.includes(`property="og:url" content="${url}"`));
  assert.match(head, /name="description" content="Bouw, installatiewerk en afwerking/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /aria-current="page">Woningrenovatie/);
  for (const [, heading] of html.matchAll(/<section\b[^>]*aria-labelledby="([^"]+)"/g)) {
    assert.ok(html.includes(`<h2 id="${heading}"`), heading);
  }
  for (const slug of ["complete-renovatie-amsterdam", "complete-renovatie-rotterdam"]) {
    assert.ok(html.includes(`href="/projecten/${slug}"`));
  }
  const image = html.match(/<img\b[^>]*src="\/projects\/renovatie-amsterdam\.webp"[^>]*>/)?.[0];
  assert.ok(image);
  assert.match(image, /alt="[^"]+"/);
  assert.match(image, /width="640" height="530"/);
  assert.match(image, /loading="lazy" decoding="async"/);
  assert.ok((await readFile(new URL("projects/renovatie-amsterdam.webp", output))).length > 0);
  assert.match(html, /href="tel:\+31610983085"/);
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^" ]*)"/g)) {
    const [path, fragment] = href.split("#");
    const destination = path === "/" ? home : await read(`${path.slice(1)}/index.html`);
    assert.match(destination, /<main\b/, href);
    if (fragment) assert.ok(destination.includes(`id="${fragment}"`), href);
  }
});

function jpegDimensions(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8);
  for (let offset = 2; offset < bytes.length;) {
    assert.equal(bytes[offset], 0xff);
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      return [bytes.readUInt16BE(offset + 7), bytes.readUInt16BE(offset + 5)];
    }
    offset += 2 + length;
  }
  throw new Error("JPEG dimensions not found");
}

test("local original-article images reserve space using actual exported JPEG dimensions", async () => {
  let checked = 0;
  for (const slug of ["veilige-elektrische-installatie", "binnendeuren-hang-en-sluitwerk"]) {
    const html = await read(`kennis/${slug}/index.html`);
    const body = html.match(/<div class="original-article"[^>]*>([\s\S]*?)<section class="blog-cta">/)?.[1];
    assert.ok(body, slug);
    for (const [tag] of body.matchAll(/<img\b[^>]*>/g)) {
      const src = tag.match(/src="(\/blog\/[^"]+)"/)?.[1];
      if (!src) continue;
      const [width, height] = jpegDimensions(await readFile(new URL(src.slice(1), output)));
      assert.ok(tag.includes(`width="${width}"`), `${src}: actual width`);
      assert.ok(tag.includes(`height="${height}"`), `${src}: actual height`);
      assert.match(tag, /loading="lazy"/);
      assert.match(tag, /decoding="async"/);
      checked++;
    }
  }
  assert.equal(checked, 7);
});

test("article bodies and contents links declare their source language", async () => {
  const cases = [
    ["kennis/tegels-en-voegen-kiezen", "nl", "en"],
    ["en/insights/tegels-en-voegen-kiezen", "en", "en"],
    ["kennis/veilige-elektrische-installatie", "nl", "nl"],
    ["kennis/binnendeuren-hang-en-sluitwerk", "nl", "nl"],
  ];
  for (const [route, pageLanguage, bodyLanguage] of cases) {
    const html = await read(`${route}/index.html`);
    assert.match(html, new RegExp(`<html\\s+lang="${pageLanguage}"`), route);
    assert.match(html, new RegExp(`<div class="original-article" lang="${bodyLanguage}"`), route);
    const aside = html.match(/<aside class="blog-aside">([\s\S]*?)<\/aside>/)?.[1];
    assert.ok(aside, route);
    assert.match(aside, new RegExp(`<ol lang="${bodyLanguage}"`), route);
    for (const language of ["nl", "en"]) {
      assert.match(html, new RegExp(`hrefLang="${language}" lang="${language}">${language.toUpperCase()}<\\/a>`), route);
    }
  }
  // Translated articles continue to use their own language, rather than the source's.
  const translated = await read("en/insights/veilige-elektrische-installatie/index.html");
  assert.match(translated, /<ol lang="en"/);
  assert.doesNotMatch(translated, /class="original-article"/);
});

test("static pages declare the language of their visible content", async () => {
  for (const path of ["index.html", "kennis/veilige-elektrische-installatie/index.html"]) {
    assert.match(await read(path), /<html\s+lang="nl"/i, path);
  }
  for (const path of [
    "en/index.html",
    "en/projects/complete-renovatie-amsterdam/index.html",
    "en/insights/veilige-elektrische-installatie/index.html",
  ]) {
    assert.match(await read(path), /<html\s+lang="en"/i, path);
  }
});

test("static export includes crawl metadata for the canonical domain", async () => {
  assert.match(await read("robots.txt"), /Sitemap: https:\/\/www\.matrisbouw\.nl\/sitemap\.xml/);
  assert.match(await read("sitemap.xml"), /<loc>https:\/\/www\.matrisbouw\.nl\/<\/loc>/);
});

test("contact form includes FormSubmit's spam honeypot", async () => {
  const html = await read("index.html");
  assert.match(html, /name="_honey"/);
  assert.match(html, /class="contact-honeypot"/);
});


test("bathroom service is discoverable and exported with its own metadata", async () => {
  const route = "/diensten/badkamerrenovatie";
  const url = `https://www.matrisbouw.nl${route}`;
  const html = await read(`${route.slice(1)}/index.html`);
  assert.match(await read("index.html"), /href="\/diensten\/badkamerrenovatie"/);
  assert.ok((await read("sitemap.xml")).includes(`<loc>${url}</loc>`));
  assert.match(html, /<title>Badkamer en toilet verbouwen \| Domi Installatie<\/title>/);
  assert.ok(html.includes(`rel="canonical" href="${url}"`));
  assert.ok(html.includes(`property="og:url" content="${url}"`));
  assert.doesNotMatch(html, /hrefLang="en"|hreflang="en"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /href="#service-content"/);
  assert.match(html, /id="service-content"/);
  for (const target of ["/projecten/badkamer-toilet-amsterdam", "/kennis/tegels-en-voegen-kiezen", "/kennis/badkamerventilator-kiezen"]) {
    assert.ok(html.includes(`href="${target}"`));
    await read(`${target.slice(1)}/index.html`);
  }
  assert.match(html, /href="tel:\+31610983085"/);
  assert.match(html, /href="\/#contact"/);
});

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), value]));
}

test("water service connects documented work to crawlable project and contact routes", async () => {
  const route = "/diensten/water-sanitair";
  const html = await read(`${route.slice(1)}/index.html`);
  assert.match(await read("index.html"), /href="\/diensten\/water-sanitair"[^>]*>Meer over leidingwerk, sanitair en riolering/);
  assert.ok((await read("sitemap.xml")).includes(`<loc>https://www.matrisbouw.nl${route}</loc>`));
  assert.match(html, /<title>Leidingwerk, sanitair en riolering \| Domi Installatie<\/title>/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /href="#service-content"/);
  assert.match(html, /id="service-content"/);
  assert.match(html, /aria-current="page">Water en sanitair/);
  assert.match(html, /href="\/#contact"/);
  assert.match(html, /href="tel:\+31610983085"/);
  for (const target of ["/projecten/riolering-apeldoorn", "/projecten/badkamer-toilet-amsterdam", "/diensten/badkamerrenovatie", "/kennis/verborgen-waterlek-opsporen", "/kennis/leidingnoodgeval-eerste-stappen"]) {
    assert.ok(html.includes(`href="${target}"`), target);
    await read(`${target.slice(1)}/index.html`);
  }
  assert.match(html, /<img[^>]*src="\/projects\/riolering-apeldoorn.webp"[^>]*alt="Aanleg van een rioolaansluiting in Apeldoorn"[^>]*width="640"[^>]*height="530"[^>]*loading="lazy"/);
  assert.doesNotMatch(html, /spoedservice|24\/7|gecertificeerd|vanaf €|binnen .*uur/i);
});

function metadataTags(html) {
  return [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(([tag]) => attributes(tag));
}

test("carpentry service is discoverable and its exported links and image resolve", async () => {
  const route = "/diensten/timmerwerk-montage";
  const html = await read(`${route.slice(1)}/index.html`);
  assert.ok((await read("index.html")).includes(`href="${route}"`));
  assert.ok((await read("sitemap.xml")).includes(`<loc>https://www.matrisbouw.nl${route}</loc>`));
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /aria-current="page">Timmerwerk en montage/);
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
    if (href.startsWith("tel:")) continue;
    const target = new URL(href, `https://www.matrisbouw.nl${route}`);
    assert.equal(target.origin, "https://www.matrisbouw.nl");
    const destination = target.pathname === "/" ? "index.html" : `${target.pathname.slice(1)}/index.html`;
    const linkedHtml = await read(destination);
    if (target.hash) assert.ok(linkedHtml.includes(`id="${target.hash.slice(1)}"`), href);
  }
  for (const [, tag] of html.matchAll(/(<img\b[^>]*>)/g)) {
    const image = attributes(tag);
    assert.ok(image.alt !== undefined);
    assert.ok(Number(image.width) > 0 && Number(image.height) > 0);
    assert.ok((await readFile(new URL(image.src.slice(1), output))).length > 0);
  }
  for (const target of ["/projecten/complete-renovatie-rotterdam", "/projecten/tuinhuis-amsterdam", "/kennis/binnendeuren-hang-en-sluitwerk"]) {
    assert.ok(html.includes(`href="${target}"`), target);
  }
});

test("heating service exposes the documented Kampen project and working enquiry links", async () => {
  const route = "/diensten/vloerverwarming";
  const html = await read(`${route.slice(1)}/index.html`);
  assert.match(await read("index.html"), /href="\/diensten\/vloerverwarming"[^>]*>Meer over vloerverwarming/);
  assert.ok((await read("sitemap.xml")).includes(`<loc>https://www.matrisbouw.nl${route}</loc>`));
  assert.match(html, /<title>Vloerverwarming bij uw verbouwing \| Domi Installatie<\/title>/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /href="#service-content"/);
  assert.match(html, /<main id="service-content"/);
  assert.match(html, /aria-current="page">Vloerverwarming/);
  for (const target of ["/projecten/vloerverwarming-kampen", "/diensten/water-sanitair", "/diensten/badkamerrenovatie", "/privacy", "/voorwaarden"]) {
    assert.ok(html.includes(`href="${target}"`), target);
    await read(`${target.slice(1)}/index.html`);
  }
  const home = await read("index.html");
  assert.match(html, /href="\/#contact"/);
  assert.match(home, /id="contact"/);
  assert.match(html, /href="tel:\+31610983085"/);
  assert.match(html, /<img[^>]*src="\/projects\/vloerverwarming-kampen.webp"[^>]*alt="Vloerverwarmingsverdeler en leidingwerk in Kampen"[^>]*width="640"[^>]*height="530"[^>]*loading="lazy"[^>]*decoding="async"/);
  const image = await readFile(new URL("projects/vloerverwarming-kampen.webp", output));
  assert.ok(image.length > 0);
  assert.doesNotMatch(html, /infrezen|droogbouw|energiebesparing|warmtepomp|gecertificeerd|vanaf €|24\/7/i);
});

test("every sitemap page has its own canonical and social metadata in the head", async () => {
  const sitemap = await read("sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => new URL(url));
  assert.ok(urls.length > 0);
  assert.equal(new Set(urls.map(String)).size, urls.length, "duplicate sitemap URLs");
  const pages = new Map();
  for (const url of urls) {
    const path = url.pathname;
    const html = await read(path === "/" ? "index.html" : path.slice(1) + "/index.html");
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
    assert.ok(head, path + " head missing");
    const tags = metadataTags(head);
    const canonicals = tags.filter(tag => tag.rel === "canonical");
    assert.equal(canonicals.length, 1, path + " needs one canonical in head");
    assert.equal(new URL(canonicals[0].href).href, url.href, path + " canonical mismatch");
    const social = tags.filter(tag => tag.property === "og:url");
    assert.equal(social.length, 1, path + " needs one Open Graph URL in head");
    assert.equal(new URL(social[0].content).href, url.href, path + " social URL mismatch");
    assert.equal((head.match(/<title\b/g) ?? []).length, 1, path + " title missing or duplicated");
    for (const name of ["description", "twitter:title", "twitter:description"]) {
      const matches = tags.filter(tag => tag.name === name);
      assert.equal(matches.length, 1, path + " needs " + name);
      assert.ok(matches[0].content.length > 0, path + " empty " + name);
    }
    const bodyTags = metadataTags(html.slice(html.indexOf("</head>") + 7));
    assert.ok(!bodyTags.some(tag => tag.rel === "canonical" || tag.hreflang), path + " SEO links outside head");
    pages.set(url.href, tags.filter(tag => tag.rel === "alternate" && tag.hreflang));
  }
  for (const [url, alternates] of pages) {
    const path = new URL(url).pathname;
    const paired = path === "/" || path === "/en" || /^\/(?:kennis|projecten|en\/(?:insights|projects))\//.test(path);
    assert.deepEqual(alternates.map(tag => tag.hreflang).sort(), paired ? ["en", "nl"] : (path.startsWith("/diensten/") ? ["nl"] : []), path + " unexpected language alternates");
    for (const alternate of alternates) {
      const target = new URL(alternate.href).href;
      assert.ok(pages.has(target), path + " alternate is not exported: " + target);
      assert.deepEqual(pages.get(target), alternates, path + " language links must be reciprocal");
    }
  }
});

test("sitemap does not claim unverified content modification dates", async () => {
  assert.doesNotMatch(await read("sitemap.xml"), /<lastmod\b/);
});


test("every legacy route survives static hosting and has a permanent Nginx redirect", async () => {
  const redirects = JSON.parse(await readFile(new URL("../app/legacy-redirects.json", import.meta.url), "utf8"));
  const nginx = await readFile(new URL("../dist/legacy-redirects.conf", import.meta.url), "utf8");
  const home = await read("index.html");
  const sitemap = await read("sitemap.xml");
  assert.equal(Object.keys(redirects).length, 23, "all existing legacy routes must survive");
  for (const [slug, fragment] of Object.entries(redirects)) {
    const html = await read(slug.endsWith(".html") ? slug : `${slug}/index.html`);
    const target = `/${fragment}`;
    assert.ok(html.includes(`<meta http-equiv="refresh" content="0;url=${target}">`), slug);
    assert.ok(html.includes(`<a href="${target}">`), slug + " needs a visible fallback link");
    assert.ok(html.includes('rel="canonical" href="https://www.matrisbouw.nl/"'), slug);
    assert.doesNotMatch(html, /<script\b/i, slug + " must work without JavaScript");
    assert.ok(home.includes(`id="${fragment.slice(1)}"`), slug + " needs an existing section");
    assert.ok(nginx.includes(`location = /${slug} { return 308 "${target}"; }`), slug);
    if (!slug.endsWith(".html")) {
      assert.ok(nginx.includes(`location = /${slug}/ { return 308 "${target}"; }`), slug + " trailing slash");
    }
    assert.ok(!sitemap.includes(`<loc>https://www.matrisbouw.nl/${slug}</loc>`), slug + " must not be in sitemap");
  }
  const config = await readFile(new URL("../deploy/nginx.conf", import.meta.url), "utf8");
  const dockerfile = await readFile(new URL("../Dockerfile", import.meta.url), "utf8");
  assert.ok(config.includes("include /etc/nginx/legacy-redirects.conf;"));
  assert.ok(dockerfile.includes("COPY --from=build /site/dist/legacy-redirects.conf /etc/nginx/legacy-redirects.conf"));
  assert.doesNotMatch(nginx, /location \/ \{|location ~|__proto__|constructor/);
  await assert.rejects(read("legacy-redirects.conf"), { code: "ENOENT" });
});


test("electrical service is crawlable with accurate metadata and working destinations", async () => {
  const route = "/diensten/elektra-verlichting";
  const url = `https://www.matrisbouw.nl${route}`;
  const html = await read(`${route.slice(1)}/index.html`);
  const head = html.split("</head>")[0];
  assert.match(await read("index.html"), /href="\/diensten\/elektra-verlichting"[^>]*>Meer over elektra en verlichting bij uw verbouwing/);
  assert.ok((await read("sitemap.xml")).includes(`<loc>${url}</loc>`));
  assert.match(head, /<title>Elektra en verlichting bij verbouwing \| Domi Installatie<\/title>/);
  assert.ok(head.includes(`rel="canonical" href="${url}"`));
  assert.ok(head.includes(`property="og:url" content="${url}"`));
  assert.match(head, /name="description" content="Extra groepen, stopcontacten/);
  assert.doesNotMatch(html, /hrefLang="en"|hreflang="en"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /href="#service-content"/);
  assert.match(html, /<main id="service-content"/);
  assert.match(html, /aria-current="page">Elektra en verlichting/);
  assert.match(html, /src="\/projects\/tuinhuis-amsterdam\.webp"[^>]*loading="lazy"/);
  assert.match(html, /href="tel:\+31610983085"/);
  assert.doesNotMatch(html, /24\/7|gecertificeerd|vanaf .[0-9]|binnen .*uur/i);
  const home = await read("index.html");
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^" ]*)"/g)) {
    const [path, fragment] = href.split("#");
    if (path === "/") {
      if (fragment) assert.ok(home.includes(`id="${fragment}"`), href);
    } else {
      assert.ok((await read(`${path.slice(1)}/index.html`)).includes("<main"), href);
    }
  }
});


test("homepage language navigation works without JavaScript and targets matching metadata", async () => {
  for (const [path, current] of [["index.html", "nl"], ["en/index.html", "en"]]) {
    const html = await read(path);
    const switcher = html.match(/<div class="language-switch"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    assert.ok(switcher, path + " language navigation missing");
    assert.doesNotMatch(switcher, /<button\b/, path + " language navigation must use links");
    const links = [...switcher.matchAll(/<a\b([^>]*)>/g)].map(([, tag]) => attributes(tag));
    assert.equal(links.length, 2, path);
    assert.equal(links.filter(link => link["aria-current"] === "page").length, 1, path);
    for (const [locale, href, label] of [["nl", "/", "Nederlands"], ["en", "/en", "English"]]) {
      const link = links.find(item => item.href === href);
      assert.ok(link, path + " missing " + href);
      assert.equal(link.hreflang, locale);
      assert.equal(link.lang, locale);
      assert.equal(link["aria-label"], label);
      assert.equal(link["aria-current"], locale === current ? "page" : undefined);
      const destination = await read(href === "/" ? "index.html" : "en/index.html");
      assert.ok(destination.includes('<html lang="' + locale + '"'), href + " document language");
      const tags = metadataTags(destination.split("</head>")[0]);
      const canonical = tags.find(tag => tag.rel === "canonical");
      assert.equal(new URL(canonical.href).href, new URL(href, "https://www.matrisbouw.nl").href);
      assert.equal(new URL(tags.find(tag => tag.property === "og:url").content).href, new URL(canonical.href).href);
      assert.ok(destination.includes(locale === "nl" ? "Complete verbouwingen" : "Complete home renovations"));
    }
  }
});


test("every indexed page serves the lightweight logo instead of the animation asset", async () => {
  const sitemap = await read("sitemap.xml");
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
  assert.ok(paths.length > 0);
  for (const path of paths) {
    const file = path === "/" ? "index.html" : `${path.slice(1)}/index.html`;
    const html = await read(file);
    assert.doesNotMatch(html, /domi-logo-intro\.gif/, path);
    const logos = [...html.matchAll(/<img\b[^>]*src="\/domi-logo\.jpg"[^>]*>/g)];
    assert.ok(logos.length > 0, `${path}: missing static logo`);
    for (const [tag] of logos.filter(([tag]) => tag.includes('class="brand-logo-intro"'))) {
      assert.match(tag, /width="\d+"/, path);
      assert.match(tag, /height="\d+"/, path);
      assert.match(tag, /alt=""/, path);
    }
  }
  const exported = await readFile(new URL("domi-logo.jpg", output));
  const source = await readFile(new URL("../public/domi-logo.jpg", import.meta.url));
  const animated = await readFile(new URL("../public/domi-logo-intro.gif", import.meta.url));
  assert.deepEqual(exported, source);
  assert.ok(exported.length < 20_000, "static logo exceeds 20 KB budget");
  assert.ok(exported.length < animated.length * 0.03, "logo transfer reduction is below 97%");
});
