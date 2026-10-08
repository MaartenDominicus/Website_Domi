/* eslint-disable @next/next/no-html-link-for-pages -- Static routes use full document navigation. */
import type { Metadata } from "next";
import { projectsNl } from "../../project-data";

const path = "/diensten/elektra-verlichting";
const title = "Elektra en verlichting bij verbouwing | Domi Installatie";
const description = "Extra groepen, stopcontacten en binnen- en buitenverlichting bij uw woningverbouwing. Bekijk ons tuinhuisproject met elektra in Amsterdam en bespreek uw plannen.";
const project = projectsNl.find(({ slug }) => slug === "tuinhuis-amsterdam")!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { nl: path } },
  openGraph: { title, description, url: path, type: "website", locale: "nl_NL", images: [{ url: project.image, alt: project.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

export default function ElectricalServicePage() {
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
        <nav aria-label="Broodkruimel"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/#diensten">Diensten</a><span aria-hidden="true"> / </span><span aria-current="page">Elektra en verlichting</span></nav>
        <p className="eyebrow dark"><span />Elektra &amp; verlichting</p>
        <h1>Elektra en verlichting bij uw verbouwing</h1>
        <p className="service-page-lead">Een andere indeling vraagt vaak ook om andere aansluitpunten. Stem extra groepen, stopcontacten en verlichting af op het gebruik van de ruimte en de afwerking van uw woning.</p>
        <a className="button button-primary" href="/#contact">Bespreek uw elektrawerk</a>
        <section aria-labelledby="scope-title">
          <h2 id="scope-title">Aansluitingen en verlichting in samenhang</h2>
          <p>Domi Installatie combineert elektrawerk met verbouwing en afwerking van particuliere woningen. Binnen dit vakgebied kunt u uw plannen bespreken voor:</p>
          <ul>
            <li>Extra groepen voor het voorgenomen gebruik van de woning.</li>
            <li>Extra stopcontacten op plaatsen die passen bij de nieuwe indeling.</li>
            <li>Binnenverlichting, afgestemd op de functie van de ruimte.</li>
            <li>Buitenverlichting en elektra als onderdeel van een buitenverbouwing.</li>
          </ul>
          <p>We bekijken belasting, kabelroutes en toekomstig gebruik als een geheel. Bij de opname bespreken we de bestaande situatie en stemmen we techniek, werkzaamheden en afwerking op elkaar af.</p>
        </section>
        <section className="service-page-project" aria-labelledby="example-title">
          <div>
            <p className="eyebrow dark"><span />Eigen project - Amsterdam</p>
            <h2 id="example-title">Elektra meegenomen in een tuinhuis</h2>
            <p>Bij dit tuinhuis in Amsterdam zijn elektra en verlichting direct meegenomen in de bouw. Het project combineert een beschutte lounge met afgesloten bergruimte.</p>
            <p>De foto toont het gerealiseerde tuinhuis. Op de projectpagina leest u hoe bouw en installatie samen zijn aangepakt.</p>
            <a href={`/projecten/${project.slug}`}>Bekijk het tuinhuis met elektra in Amsterdam</a>
          </div>
          <figure><img src={project.image} alt={project.alt} width="640" height="530" loading="lazy" decoding="async" /><figcaption>Tuinhuis uit het eigen projectarchief in Amsterdam.</figcaption></figure>
        </section>
        <section aria-labelledby="prepare-title">
          <h2 id="prepare-title">Wat vermeldt u bij uw aanvraag?</h2>
          <p>Geef de plaats van de woning aan, welke ruimtes veranderen en waar u aansluitingen of verlichting wilt toevoegen. Vermeld ook welke apparaten u wilt gebruiken en of het werk onderdeel is van een grotere verbouwing.</p>
          <p>Een plattegrond met de gewenste aansluitpunten helpt om de plannen te bespreken. De benodigde werkzaamheden hangen af van de bestaande installatie; die beoordelen we bij de opname.</p>
          <p>Domi werkt aan particuliere woningen door heel Nederland. Het tuinhuis hierboven is een voorbeeld uit Amsterdam.</p>
          <a className="button button-primary" href="/#contact">Bespreek uw project</a>
          <p>U kunt ook bellen: <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
        </section>
        <section aria-labelledby="reading-title">
          <h2 id="reading-title">Meer lezen voor uw verbouwing</h2>
          <ul>
            <li><a href="/kennis/veilige-elektrische-installatie">Oudere elektrische installatie: waar let u op?</a></li>
            <li><a href="/kennis/signalen-elektrische-problemen">Vijf signalen dat uw elektrische installatie aandacht vraagt</a></li>
            <li><a href="/diensten/badkamerrenovatie">Badkamer en toilet verbouwen met installatie en afwerking</a></li>
          </ul>
        </section>
      </main>
      <footer className="service-page-footer"><a href="/">Domi Installatie</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></footer>
    </div>
  );
}
