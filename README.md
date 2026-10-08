# Domi Installatie website

## Revalidate mutable files on the Debian/Nginx origin

Nginx sends `Cache-Control: no-cache` for pages and unversioned files, including
robots, sitemap and project photos. Browsers may store these responses but must
validate them before reuse, so content at the same URL is checked again after a
release. Existing ETag and Last-Modified validators allow unchanged responses
to return a bodyless `304`. Versioned `/_next/static/` assets retain their
one-year cache lifetime.

The loopback Nginx HTTP suite checks this policy, both validators, stale-validator
responses and security headers alongside existing compression, asset caching,
redirect and 404 checks. The new test failed against the previous configuration
and all five HTTP tests passed with the change on local Nginx 1.30.5.
The site build and all 29 site tests also pass. Blog source, data and rendering
files remain byte-identical. Existing local changes were preserved.

This policy applies to the supplied Nginx origin; GitHub Pages does not consume
this configuration. Debian/Docker and Cloudflare edge caching remain unverified.
An edge cache rule can override origin headers. No deployment was performed.
Evidence: [Nginx expires documentation](https://nginx.org/en/docs/http/ngx_http_headers_module.html#expires).
Public Amsterdam renovation competitor search excerpts were reviewed without
fetching their pages or copying text.

## Woningrenovatie service page

`/diensten/woningrenovatie` gives the existing renovation service a dedicated
Dutch page with scope, enquiry preparation and the documented Amsterdam and
Rotterdam renovation projects. Service claims come from `app/domi-site.tsx`;
project details and the existing photo come from `app/project-data.ts`.
The homepage, sitemap and static export include the route. It uses the existing
service layout, a focusable skip-link target and a dimensioned lazy-loaded image.

`npm test` passes all 29 tests, including discovery, exported metadata, project
links, image availability and every local link/fragment on the new page.
`npm run lint` has no errors and 31 image warnings, including two on this page.
Blog source/rendering hashes are unchanged; the run's homepage diff adds only
the service link. Existing user changes are preserved. Browser rendering,
production indexing and rankings remain unverified. No deployment was performed.

Research: [Google helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
and [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
Public Amsterdam competitor search excerpts (including Woon Techniek and Tris)
were reviewed for service-page presentation. No competitor pages were directly
fetched or text copied; competitor claims are not evidence for Domi's services.

## Explicit index-document redirects

The Debian/Nginx origin permanently redirects explicit `/index.html` requests
to `/`, and nested index documents to their directory URL (for example,
`/en/index.html` to `/en/`). Query strings are preserved. Redirects use relative
Location headers to retain HTTPS when the tunnel connects to the HTTP origin.
The rule inspects
the original request URI so Nginx's internal directory-index lookup does not
cause a redirect loop. Existing page canonicals remain unchanged.

`npm run test:nginx` checks homepage, language, service, article and project
redirects, their final exported content, query preservation and unknown-page
404 handling. The rule passed syntax and loopback HTTP checks using the local
Nginx 1.30.5 binary. The build and all 28 site tests pass; lint has no errors
and 29 existing image warnings. Blog source hashes are unchanged.

This applies to the supplied Nginx deployment only. Debian containers,
Cloudflare edge responses and production indexing remain unverified; GitHub
Pages does not consume this Nginx configuration. No deployment was performed.
Evidence: [Google duplicate-URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
and [Nginx rewrite directives](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html).
Public Amsterdam renovation competitor search excerpts were reviewed without
fetching competitor pages or copying their text.

## Static error-page export

The exporter requires its missing-route probe to return an HTML 404 before
writing `out/404.html`. The shared error document has a descriptive Dutch title
and retains `noindex`, styles and recovery links; it omits inherited homepage
canonical, language alternates and social metadata. Normal page metadata is
unchanged. `npm test` covers the exported document and rejection of unexpected
response statuses or content types.

This complements the existing Nginx 404 handling; it does not set HTTP status
codes on a hosting provider. Check a nonexistent URL after any hosting change.
Production GitHub Pages, Nginx and Cloudflare responses remain unverified.
Evidence: [Google HTTP status guidance](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes).
Public competitor search excerpts were reviewed without fetching competitor
pages or copying text. All blog source files remain byte-identical for this run.

Static export of the Vinext site. The canonical public address is
`https://www.matrisbouw.nl`. `npm run build:pages` writes the site, including
`robots.txt` and `sitemap.xml`, to `out/`.

## Local checks

```bash
npm ci
npm run build:pages
npm test
npm run lint
```

## Service and project skip-link focus

All six service pages and both languages of the six project pages use
`tabIndex={-1}` on their main-content skip-link targets. This allows native
fragment navigation to move keyboard focus past the header while keeping the
main container out of the normal Tab sequence. No JavaScript is required.

`npm test` checks all eighteen exported pages for the first skip link, a unique
focusable main target, and its position after the header. Manual browser and
screen-reader checks remain part of release verification: press Tab, activate
the skip link, then confirm that subsequent tabbing continues within the main
content. Blog source text is unchanged.

Evidence: [W3C skip-link technique G1](https://www.w3.org/WAI/WCAG21/Techniques/general/G1)
requires activation to move focus to the main content area. Public competitor
search excerpts were reviewed; no competitor pages were fetched or copied.

## Debian VM or container on Proxmox

Use a Debian VM or LXC that can run Docker Compose. Install Docker Engine and
its Compose plugin, then copy this repository to the host. The production image
builds the static site and serves it through Nginx. Only the `cloudflared`
container connects to Cloudflare; Compose publishes no host port for Nginx.

1. Add `www.matrisbouw.nl` to a Cloudflare zone you control. Create a remotely
   managed Cloudflare Tunnel and a public hostname for `www.matrisbouw.nl` with
   service URL `http://web:80`. Point the hostname's DNS record at the tunnel.
2. Copy `.env.example` to `.env` and paste the tunnel token from Cloudflare.
   Restrict `.env` permissions to the deployment account. Never commit it.
3. Run `docker compose up -d --build` in this directory. Check
   `docker compose ps` and `docker compose logs cloudflared`.
4. Verify `https://www.matrisbouw.nl/`, `/robots.txt`, `/sitemap.xml`, a
   project detail route, and a nonexistent route. Check that the certificate
   is valid and that the origin is not reachable through a public IP/port.
5. When moving from GitHub Pages, disable the Pages deployment workflow after
   DNS has switched and the tunnel has been checked. Leave the old site live
   until that point.

The contact form posts to FormSubmit, outside this server. Confirm its form
recipient and privacy notice before production deployment.

## Cloudflare security settings

In **Security > Settings > Bot traffic**, enable bot protection appropriate to
the plan and allow verified search engine bots so the site remains indexable.
Choose the AI crawler policy intentionally; blocking AI training/agent bots is
available separately from search bots. Turn on Cloudflare's managed WAF rules
if included in the plan. Start any broad challenge or rate limit in log mode,
inspect Security Events for false positives, then apply it to abusive paths or
rates. Do not challenge every page request: search indexing and visitors may be
blocked. `robots.txt` is a crawl preference, not access control.

Keep the tunnel token private, restrict SSH on the Debian host, apply security
updates to Debian and container images, and do not forward TCP 80/443 from the
router to the origin. Cloudflare Tunnel needs outbound connectivity to Cloudflare.

Cloudflare account settings cannot be activated by the repository alone.

## Current publishing path

`.github/workflows/pages.yml` still deploys `out/` to GitHub Pages from `main`.
This remains the active workflow until the Debian/Cloudflare migration is
verified. The `CNAME` file and all canonical URLs use the same hostname.

## Static SEO metadata

The exporter requests blocking metadata using the renderer's `Twitterbot` user
agent mode. Every visitor receives the resulting complete static HTML, with
canonical and language-alternate links in the document head even without
JavaScript. Article, project and legal pages declare their own Open Graph URLs.
`npm test` checks metadata and reciprocal language links across all sitemap URLs.

The sitemap intentionally omits `lastmod` until verified dates of significant
content changes are available. Do not substitute the build or export time.

## Legacy URL redirects

The existing section aliases (such as `/contact.html`, `/offerte` and
`/blog.html`) live in `app/legacy-redirects.json`. The application sends a
permanent 308 redirect to the matching homepage section. Static export writes
an immediate HTML refresh and a visible fallback link for each alias so GitHub
Pages works without JavaScript. These aliases stay out of the sitemap.

For Debian/Nginx, the exporter also generates `dist/legacy-redirects.conf`.
The Docker image copies this outside the public document root and Nginx
includes it to send HTTP 308 responses, including trailing-slash variants of
extensionless aliases. Rebuild the image after changing the mapping. Unknown
routes continue to return 404. Verify a legacy URL's status and Location header
on the deployment host; GitHub Pages serves the HTML fallback with status 200.

## Contact form accessibility

The contact form keeps native browser validation and normal FormSubmit POST
submission, including when JavaScript is unavailable. Required fields, the
optional telephone field, and location/message instructions are visible in both
languages. With JavaScript, invalid controls also receive persistent linked
messages, `aria-invalid`, and an announced summary whose links focus the fields.
Correcting a field clears its error. No success state is shown before the provider
confirms submission.

Input length limits improve form usability; they are client-side constraints,
not server-side abuse protection. The existing FormSubmit honeypot is retained.
Provider delivery, CAPTCHA behavior, and server-side limits require separate
production verification. Local checks must not send test enquiries to the live
recipient.


## Homepage language navigation

The NL and EN controls are ordinary links to `/` and `/en`. They load the
exported language page so the URL, visible language, document language, title,
canonical and social metadata stay aligned, including without JavaScript.
Each link names its language and the current page is marked with aria-current.
The mobile menu's keyboard loop includes both language links. Switching language
loads a new page and resets unsent form input; use the browser Back button to
return to the previous page.

Guidance: [Google multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
and [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

## Nginx text compression

The Debian origin enables gzip for HTML and text assets of at least 1 KiB,
including CSS, JavaScript and the XML sitemap. `Vary: Accept-Encoding` separates
compressed and uncompressed responses in caches. Compression also applies when
a proxy supplies a `Via` header. Images and fonts retain their existing encoding.
See [Nginx gzip guidance](https://nginx.org/en/docs/http/ngx_http_gzip_module.html).

After building the site, run `npm run test:nginx` against a local Nginx serving
`out/` with `deploy/nginx.conf` and the generated redirects. It defaults to
`http://127.0.0.1:8080`; set `DOMI_NGINX_TEST_URL` for another loopback port.
For an isolated local check with Docker on Debian, the following serves the built
files on loopback without starting the tunnel (run from the repository root):

```bash
docker run --detach --name domi-nginx-check --publish 127.0.0.1:8080:80 \
  --mount "type=bind,src=$PWD/out,dst=/usr/share/nginx/html,readonly" \
  --mount "type=bind,src=$PWD/deploy/nginx.conf,dst=/etc/nginx/conf.d/default.conf,readonly" \
  --mount "type=bind,src=$PWD/dist/legacy-redirects.conf,dst=/etc/nginx/legacy-redirects.conf,readonly" \
  nginx:alpine
npm run test:nginx
docker stop domi-nginx-check
docker rm domi-nginx-check
```

The suite checks byte-identical decoded pages/assets, proxy requests, clients
declining gzip, images, redirects, 404s, security headers and existing asset
caching. It rejects public hostnames. Check compression again through Cloudflare
after migration: edge negotiation and caching require production verification.

## Lightweight logo introduction

Homepage and project headers use the existing 12,253-byte static logo instead
of the 598,530-byte animated GIF (about 98% less logo transfer on a cold visit).
The homepage footer shares that static asset. The brief introduction now uses
CSS opacity and transform, enabled only for `prefers-reduced-motion: no-preference`.
Reduced-motion users and browsers without that media feature see the complete
static logo immediately. Explicit image dimensions reserve a square image box.
The original GIF and its generation script remain available in the repository.

`npm test` verifies every sitemap page exports the static logo and no longer
references the GIF; it also checks the exported logo bytes and size budget.
This measures the asset reduction, not a field Core Web Vitals improvement.
Browser motion and production performance still need validation when releasing.

Guidance: [Google LCP optimization](https://web.dev/articles/optimize-lcp) and
[W3C motion preference technique](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html).

## Water and sanitation service page

`/diensten/water-sanitair` covers the existing water/sanitation service and
links to the documented drainage project in Apeldoorn and bathroom project in
Amsterdam. Its scope is based on `app/domi-site.tsx` and `app/project-data.ts`;
locations describe those projects, without adding local offices or availability
claims. The Dutch homepage links to it and the static export and sitemap include
it. It shares the existing accessible service-page layout and project assets.

`npm test` checks discovery, exported destinations, page structure, image
attributes, canonical and social metadata. Existing blog text is unchanged.
Indexing, search rankings and production rendering require release verification.
Guidance: [Google crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
and [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## Vloerverwarming service page

`/diensten/vloerverwarming` connects the existing heating service to the
documented manifold and pipework project in Kampen. Service scope comes from
`app/domi-site.tsx`; project details and the photo come from
`app/project-data.ts`. Kampen identifies the example project. The page adds no
installation-method, energy-saving, pricing or qualification claims.

The Dutch homepage, sitemap and static export include the route. It uses the
existing service layout with a skip link, labelled sections, a breadcrumb,
dimensioned lazy-loaded project image and contact links. `npm test` checks
discovery, exported link destinations, the image, structure and route metadata.
Blog source text is unchanged. Production rendering and search indexing still
require verification after release.

Research used Google's guidance linked above and public search-result excerpts
for heating service pages in Kampen. The competitor robots.txt could not be
retrieved, so no competitor page was fetched or copied.

## Timmerwerk and montage service page

`/diensten/timmerwerk-montage` gives the existing carpentry service a dedicated
Dutch landing page. Scope comes from `app/domi-site.tsx`; the Rotterdam staircase
renovation and Amsterdam garden house examples come from `app/project-data.ts`.
Locations identify documented projects, without adding local office or
availability claims. The page uses existing project photography and service-page
styles, and links to the unchanged door-hardware article and related services.
The homepage, sitemap and static export include the route.

`npm test` checks crawl discovery, canonical/social metadata in the exported
head, page structure, image availability and every local link/fragment on the
new page. Blog sources were hashed before and after editing and the run diff
was inspected. Browser rendering, production indexing and rankings remain
unverified; no deployment is performed.

Research: [Google crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
and public search-result excerpts for carpentry services in Rotterdam and
Amsterdam. Kreber Onderhoud's robots.txt was inaccessible through the research
tool, so no direct competitor page was fetched or copied. Competitor claims are
not used as evidence for Domi's services.

## Article source-language accessibility

Original article bodies and their generated contents lists now declare the
source language. In particular, the English tile guide embedded in the Dutch
knowledge page uses `lang="en"`, while the surrounding page remains Dutch.
Translated articles retain their own contents language. Article language links
also declare `lang` and `hreflang`. This supports pronunciation selection in
assistive technology without translating or changing any blog text.

Evidence: [W3C WCAG Language of Parts](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts/).
Public competitor search excerpts were reviewed; no competitor page was fetched
or text copied. `npm test` passes all 22 tests, including exported language
attributes on the original guides and a translated article. Blog-source hashes
were unchanged and the component diff was inspected. Targeted ESLint has no
errors (two existing image warnings). Full TypeScript checking remains blocked
by missing Cloudflare types and existing files in `work/modal-baseline`.
Screen-reader pronunciation and production behavior remain unverified.

## Original article image layout stability

The seven local images inside the electrical and door-hardware article bodies
now receive intrinsic width and height attributes measured from the existing
JPEGs. The renderer adds these attributes without modifying source article
HTML or text. Responsive CSS uses automatic height so the attributes do not
stretch the images. Existing lazy loading and asynchronous decoding remain.

`npm test` checks the rendered dimensions against JPEG headers in the exported
assets and passes all 23 tests. Blog HTML, knowledge data and homepage source
hashes were unchanged; the article-renderer diff only adds image attributes.
External article images retain their existing markup because their dimensions
have not been verified. Browser rendering and field layout-shift improvement
remain unverified. No deployment was performed.

Evidence: [Google layout-shift guidance](https://web.dev/articles/optimize-cls).
Public search excerpts for Amsterdam bathroom-installation competitors were
reviewed; no competitor pages were fetched or text copied.

## Tegel-, stuc- en schilderwerk service page

`/diensten/tegel-stuc-schilderwerk` describes the existing finishing service
from `app/domi-site.tsx`. It connects that scope to the documented Amsterdam
bathroom tilework and Rotterdam painting/finishing project in
`app/project-data.ts`, using existing photography. Locations identify project
examples. The page includes enquiry preparation, contact links and related
services, with a homepage link, sitemap entry and static export route.

The existing service-page styles provide the layout. A skip link, labelled
sections, breadcrumb and dimensioned lazy-loaded image support accessibility.
`npm test` checks crawl discovery, metadata, page structure, image availability
and every local link/fragment. Blog text is preserved verbatim. Browser rendering,
production indexing and rankings require verification after release.

Research: [Google helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
and [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
Public search excerpts for Amsterdam finishing-service competitors were reviewed.
STUCCERS' robots.txt was inaccessible through the research tool, so no competitor
page was fetched or copied. Competitor claims do not substantiate Domi's services.
