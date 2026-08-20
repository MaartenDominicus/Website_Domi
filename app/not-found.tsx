import { SiteShell } from "./site-components";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="not-found">
        <p className="eyebrow dark">404 · Niet gevonden</p>
        <h1>Deze pagina bestaat niet.</h1>
        <p>Misschien is de link verouderd. De projecten, diensten en contactpagina staan voor u klaar.</p>
        <div><a className="button button-dark" href="/">Naar home</a><a className="text-link" href="/project.html">Bekijk projecten ↗</a></div>
      </section>
    </SiteShell>
  );
}
