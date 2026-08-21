import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <Link className="brand not-found-brand" href="/" aria-label="Domi Installatie home">
        <span className="brand-mark"><img src="/domi-logo.jpg" alt="" /></span>
        <span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span>
      </Link>
      <p className="eyebrow dark"><span />404</p>
      <h1>Deze pagina bestaat niet.</h1>
      <p>Ga terug naar de website of neem direct een kijkje bij de projecten.</p>
      <div><Link className="button button-primary" href="/">Naar home</Link><Link className="button not-found-outline" href="/#projecten">Bekijk projecten</Link></div>
    </main>
  );
}
