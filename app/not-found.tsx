/* eslint-disable @next/next/no-html-link-for-pages -- GitHub Pages uses full document navigation for statically exported routes. */

export default function NotFound() {
  return (
    <main className="not-found">
      <a className="brand not-found-brand" href="/" aria-label="Domi Installatie home">
        <span className="brand-mark"><img src="/domi-logo.jpg" alt="" /></span>
        <span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span>
      </a>
      <p className="eyebrow dark"><span />404</p>
      <h1>Deze pagina bestaat niet.</h1>
      <p>Ga terug naar de website of neem direct een kijkje bij de projecten.</p>
      <div><a className="button button-primary" href="/">Naar home</a><a className="button not-found-outline" href="/#projecten">Bekijk projecten</a></div>
    </main>
  );
}
