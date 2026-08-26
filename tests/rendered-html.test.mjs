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
  assert.match(html, /<img class="hero-image"[^>]*apeldoorn-hideaway\.webp/);
  assert.doesNotMatch(html, /pexels/i);
  assert.match(html, /id="over"/);
  assert.match(html, /id="diensten"/);
  assert.match(html, /id="projecten"/);
  assert.match(html, /id="reviews"/);
  assert.match(html, /id="kennis"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /domi-logo-intro\.gif/);
  assert.match(html, /Actief door heel Nederland/);
  assert.match(html, /Instagram/);
  assert.match(html, /Pinterest/);
  assert.equal((html.match(/<small>Klantreactie<\/small>/g) ?? []).length, 18);
  assert.equal((html.match(/class="review-card"/g) ?? []).length, 18);
  assert.match(html, /aria-label="Pauzeer"/);
  assert.equal((html.match(/aria-haspopup="dialog"/g) ?? []).length, 14);
  assert.equal((html.match(/class="service-card-shell/g) ?? []).length, 8);
  assert.equal((html.match(/class="service-more-button"/g) ?? []).length, 8);
  assert.equal((html.match(/class="service-image"/g) ?? []).length, 8);
  assert.equal((html.match(/<article class="project-card/g) ?? []).length, 6);
  assert.equal((html.match(/class="project-card-trigger"/g) ?? []).length, 6);
  assert.equal((html.match(/<span>Bekijk project<\/span>/g) ?? []).length, 6);
  assert.match(html, /Badkamerrenovatie · Amsterdam/);
  assert.doesNotMatch(html, /project-card text-only/);
  assert.ok(html.indexOf('id="over"') < html.indexOf('id="diensten"'));
  assert.ok(html.indexOf('id="diensten"') < html.indexOf('id="projecten"'));
  assert.match(html, /class="review-navigation"/);
  assert.match(html, /<h2 id="featured-title">Actief door heel Nederland<\/h2>/);
  assert.match(html, /class="featured-marquee" role="list"/);
  assert.match(html, /Christiaan · Tuinhuis Amsterdam/);
  assert.match(html, /Robin · Tiny House Amsterdam/);
  assert.match(html, /class="scroll-depth-story"/);
  assert.match(html, /class="scroll-depth-foreground"/);
  assert.match(html, /Techniek verdwijnt/);
  assert.match(html, /action="https:\/\/formsubmit\.co\/e2a3109e56f2b784903eb6ae24352c31"/);
  assert.match(html, /mailto:troosbouw@gmail\.com/);
  assert.match(html, /tel:\+31610983085/);
  assert.match(html, /wa\.me\/31610983085/);
  assert.doesNotMatch(html, /<details>/);
  assert.match(html, /aria-pressed="true"[^>]*>NL</);
  assert.match(html, /aria-pressed="false"[^>]*>EN</);
  assert.match(html, /Troos Bouw/i);
  assert.match(html, /Oudere elektrische installatie: waar let u op\?/);
  assert.match(html, /Hang- en sluitwerk in oudere woningen/);
  assert.match(html, /Tegels en voegen kiezen voor de badkamer/);
  assert.match(html, /href="\/kennis\/veilige-elektrische-installatie"/);
  assert.match(html, /href="\/kennis\/binnendeuren-hang-en-sluitwerk"/);
  assert.match(html, /href="\/kennis\/tegels-en-voegen-kiezen"/);
});

test("server-renders an indexable English route", async () => {
  const response = await request("/en");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Domi Installatie \| Construction, installation &amp; renovation<\/title>/i);
  assert.match(html, /lang="en"/);
  assert.match(html, /Working throughout the Netherlands/);
  assert.match(html, /Lucinda · Recreational home/);
  assert.match(html, /href="\/en\/insights\/tegels-en-voegen-kiezen"/);
});

test("publishes source-based knowledge articles with metadata and references", async () => {
  const routes = [
    ["/kennis/veilige-elektrische-installatie", "Electriciteit", "Ook dit kan dmv domotica", 8, "/blog/hoofdschakelaar.jpg"],
    ["/kennis/binnendeuren-hang-en-sluitwerk", "Hang- en sluitwerk: Deursloten, scharnieren en beslag", "een definitieve prijsopgave pas mogelijk na inspectie op locatie", 3, "/blog/doorhangende-deurhendel.jpg"],
    ["/kennis/tegels-en-voegen-kiezen", "Bathroom & Tiles Guide", "Washer-Dryer Combo", 42, "/blog/badkamer-tegels.jpg"],
  ];

  for (const [path, title, finalText, imageCount, cover] of routes) {
    const response = await request(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(title.replace("&", "(?:&|&amp;)")));
    assert.match(html, new RegExp(finalText));
    assert.match(html, new RegExp(`<figure class="original-blog-cover"><img src="${cover.replaceAll(".", "\\.")}"`));
    assert.doesNotMatch(html, /Over deze publicatie|About this publication/);
    assert.doesNotMatch(html, /class="original-blog-note"/);
    assert.match(html, /<a class="brand" href="\/"/);
    assert.match(html, /<a class="blog-back" href="\/#kennis"/);
    assert.match(html, /class="scroll-progress"/);
    assert.match(html, new RegExp(`href="/en/insights/${path.split("/").at(-1)}"`));
    const articleStart = html.indexOf('<div class="original-article">');
    const articleEnd = html.indexOf('<section class="blog-cta">', articleStart);
    const visibleArticle = html.slice(articleStart, articleEnd).replace(/<!--[\s\S]*?-->/g, "");
    assert.equal((visibleArticle.match(/<img\b/g) ?? []).length, imageCount);
    assert.match(visibleArticle, /<nav id="toc"/);
    const tocHtml = visibleArticle.slice(visibleArticle.indexOf('<nav id="toc"'), visibleArticle.indexOf("</nav>") + 6);
    const tocTargets = [...tocHtml.matchAll(/<a href="#([^"]+)"/g)].map((match) => match[1]);
    assert.ok(tocTargets.length > 0);
    for (const target of tocTargets) assert.match(visibleArticle, new RegExp(`id="${target}"`));

    if (path.endsWith("tegels-en-voegen-kiezen")) {
      assert.match(visibleArticle, /<button id="collapse-all">Expand All<\/button>/);
      assert.doesNotMatch(visibleArticle, /<button[^>]*disabled/);
      assert.match(visibleArticle, /class="bond-diagram half-bond"/);
      assert.match(visibleArticle, /class="bond-diagram full-bond"/);
      assert.equal((visibleArticle.match(/class="visually-hidden pattern-source"/g) ?? []).length, 2);
    }
  }

  const english = await request("/en/insights/veilige-elektrische-installatie");
  assert.equal(english.status, 200);
  assert.match(await english.text(), /Complete information from the existing blog post/);
});

test("publishes every new suggestion-based article in Dutch and English", async () => {
  const articles = [
    ["verborgen-waterlek-opsporen", "Een verborgen waterlek herkennen", "How to spot a hidden water leak"],
    ["warmwatertoestel-kiezen", "Welk warmwatertoestel", "Which hot-water system"],
    ["signalen-elektrische-problemen", "Vijf signalen", "Five signs"],
    ["badkamerventilator-kiezen", "Een badkamerventilator kiezen", "Choosing a bathroom extractor"],
    ["leidingnoodgeval-eerste-stappen", "Lekkage of gesprongen leiding", "Leak or burst pipe"],
  ];

  for (const [slug, dutchTitle, englishTitle] of articles) {
    const dutch = await request(`/kennis/${slug}`);
    assert.equal(dutch.status, 200);
    const dutchHtml = await dutch.text();
    assert.match(dutchHtml, new RegExp(dutchTitle));
    assert.match(dutchHtml, new RegExp(`href="/en/insights/${slug}"`));
    assert.equal((dutchHtml.match(/class="blog-body"/g) ?? []).length, 1);

    const english = await request(`/en/insights/${slug}`);
    assert.equal(english.status, 200);
    const englishHtml = await english.text();
    assert.match(englishHtml, new RegExp(englishTitle));
    assert.match(englishHtml, new RegExp(`href="/kennis/${slug}"`));
    assert.match(englishHtml, /In this article/);
  }
});

test("privacy and terms pages are available", async () => {
  for (const path of ["/privacy", "/voorwaarden"]) {
    const response = await request(path);
    assert.equal(response.status, 200);
  }
});

test("legacy section URLs redirect into the Domi one-page site", async () => {
  const response = await request("/contact.html");
  assert.ok([307, 308].includes(response.status));
  assert.match(response.headers.get("location") ?? "", /\/#contact$/);
});
