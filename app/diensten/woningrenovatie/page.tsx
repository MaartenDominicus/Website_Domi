/* eslint-disable @next/next/no-html-link-for-pages -- Static routes use full document navigation. */
import type { Metadata } from "next";
import { projectsNl } from "../../project-data";

const path = "/diensten/woningrenovatie";
const title = "Woningrenovatie en complete verbouwing | Domi Installatie";
const description = "Bouw, installatiewerk en afwerking bij uw woningrenovatie. Bekijk onze complete renovaties in Amsterdam en Rotterdam en bespreek uw verbouwplannen.";
const project = projectsNl.find(({ slug }) => slug === "complete-renovatie-amsterdam")!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { nl: path } },
  openGraph: { title, description, url: path, type: "website", locale: "nl_NL", images: [{ url: project.image, alt: project.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

export default function HomeRenovationServicePage() {
  return (
    <div className="service-page">
      <a className="skip-link" href="#service-content">Direct naar de inhoud</a>
      <header className="service-page-header">
        <a className="brand" href="/" aria-label="Domi Installatie home">
          <span className="brand-mark"><img src="/domi-logo.jpg" alt="" width="64" height="64" /></span>
          <span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span>
        </a>
        <a href="/#diensten">Alle diensten</a>
      </header>
      <main id="service-content" tabIndex={-1} className="service-page-content">
        <nav aria-label="Broodkruimel"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/#diensten">Diensten</a><span aria-hidden="true"> / </span><span aria-current="page">Woningrenovatie</span></nav>
        <p className="eyebrow dark"><span />Renovatie &amp; verbouwing</p>
        <h1>Woningrenovatie: bouw, installatie en afwerking in samenhang</h1>
        <p className="service-page-lead">Een andere indeling heeft ook gevolgen voor aansluitpunten, wanden en vloeren. Domi Installatie combineert bouwkundige aanpassingen, installatiewerk en afwerking bij verbouwingen van particuliere woningen, met één aanspreekpunt voor het project.</p>
        <a className="button button-primary" href="/#contact">Bespreek uw woningrenovatie</a>
        <section aria-labelledby="scope-title">
          <h2 id="scope-title">Welke werkzaamheden horen bij uw verbouwing?</h2>
          <p>De bestaande woning en uw wensen bepalen de omvang. Bespreek welke ruimtes u wilt veranderen en welke onderdelen behouden kunnen blijven. Werkzaamheden die Domi bij een renovatie combineert zijn:</p>
          <ul>
            <li>Bouwkundige aanpassingen voor een nieuwe indeling.</li>
            <li>Elektra, verlichting, leidingwerk en aansluitpunten passend bij het gebruik.</li>
            <li>Timmerwerk, deuren, plinten en maatwerkdetails.</li>
            <li>Afwerking van wanden, vloeren en plafonds met tegel-, stuc- en schilderwerk.</li>
          </ul>
          <p>Bij de opname stemmen we de werkzaamheden op elkaar af. Leg ook vast wat buiten de opdracht valt en welke materiaalkeuzes nog openstaan, zodat de verschillende fases op hetzelfde plan aansluiten.</p>
        </section>
        <section className="service-page-project" aria-labelledby="amsterdam-title">
          <div>
            <p className="eyebrow dark"><span />Eigen project - Amsterdam</p>
            <h2 id="amsterdam-title">Een nieuwe indeling met meer licht en ruimte</h2>
            <p>Bij de volledige woningrenovatie in Amsterdam zijn indeling, beglazing en technische werkzaamheden samen aangepakt. Aansluitpunten zijn verplaatst naar de nieuwe indeling en wanden, plafonds en vloeren zijn opnieuw opgebouwd.</p>
            <a href={`/projecten/${project.slug}`}>Bekijk de complete renovatie in Amsterdam</a>
          </div>
          <figure><img src={project.image} alt={project.alt} width="640" height="530" loading="lazy" decoding="async" /><figcaption>Lichte woonruimte uit het eigen renovatieproject in Amsterdam.</figcaption></figure>
        </section>
        <section aria-labelledby="rotterdam-title">
          <h2 id="rotterdam-title">Trap, timmerdetails en woonruimtes in Rotterdam</h2>
          <p>De complete renovatie in Rotterdam bracht woonruimtes, verkeerszones en afwerking samen in één plan. De trap is hersteld en afgewerkt; daaromheen zijn timmerwerk, schilderwerk en technische punten vernieuwd.</p>
          <a href="/projecten/complete-renovatie-rotterdam">Bekijk de woningrenovatie in Rotterdam</a>
          <p>Amsterdam en Rotterdam zijn de locaties van deze projectvoorbeelden. Domi werkt aan particuliere woningen door heel Nederland; vermeld de plaats van uw woning bij uw aanvraag.</p>
        </section>
        <section aria-labelledby="prepare-title">
          <h2 id="prepare-title">Uw verbouwplannen bespreken</h2>
          <p>Een aanvraag hoeft nog geen uitgewerkt ontwerp te bevatten. Geef alvast aan:</p>
          <ul>
            <li>In welke plaats de woning staat en welke ruimtes u wilt verbouwen.</li>
            <li>Wat u aan de indeling of het dagelijks gebruik wilt veranderen.</li>
            <li>Welke bestaande onderdelen en afwerkingen u wilt behouden.</li>
            <li>Of de woning tijdens de werkzaamheden bewoond blijft en welke toegang beschikbaar is.</li>
            <li>Welke keuzes al vaststaan en welke vragen u nog wilt bespreken.</li>
          </ul>
          <p>Na het bespreken van uw wensen en de bestaande situatie volgt een voorstel voor aanpak, werkzaamheden en planning. Vermeld geen gevoelige persoonsgegevens in het contactformulier.</p>
          <a className="button button-primary" href="/#contact">Bespreek uw verbouwing</a>
          <p>U kunt ook bellen: <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
        </section>
        <section aria-labelledby="related-title">
          <h2 id="related-title">Onderdelen van een woningrenovatie</h2>
          <ul>
            <li><a href="/diensten/elektra-verlichting">Elektra en verlichting</a></li>
            <li><a href="/diensten/water-sanitair">Leidingwerk en sanitair</a></li>
            <li><a href="/diensten/badkamerrenovatie">Badkamer en toilet verbouwen</a></li>
            <li><a href="/diensten/timmerwerk-montage">Timmerwerk en montage</a></li>
            <li><a href="/diensten/tegel-stuc-schilderwerk">Tegel-, stuc- en schilderwerk</a></li>
          </ul>
        </section>
      </main>
      <footer className="service-page-footer"><a href="/">Domi Installatie</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></footer>
    </div>
  );
}
