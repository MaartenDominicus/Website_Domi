/* eslint-disable @next/next/no-html-link-for-pages -- Static routes use full document navigation. */
import type { Metadata } from "next";
import { projectsNl } from "../../project-data";

const path = "/diensten/water-sanitair";
const title = "Leidingwerk, sanitair en riolering | Domi Installatie";
const description = "Leidingen verleggen, sanitair aansluiten en riolering aanleggen bij uw woningverbouwing. Bekijk eigen projecten in Amsterdam en Apeldoorn en bespreek uw plannen.";
const project = projectsNl.find(({ slug }) => slug === "riolering-apeldoorn")!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { nl: path } },
  openGraph: { title, description, url: path, type: "website", locale: "nl_NL", images: [{ url: project.image, alt: project.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

export default function WaterServicePage() {
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
        <nav aria-label="Broodkruimel"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/#diensten">Diensten</a><span aria-hidden="true"> / </span><span aria-current="page">Water en sanitair</span></nav>
        <p className="eyebrow dark"><span />Water &amp; sanitair</p>
        <h1>Leidingwerk, sanitair en riolering bij uw verbouwing</h1>
        <p className="service-page-lead">Een nieuwe badkamer of een andere indeling vraagt vaak om aangepaste waterleidingen, afvoeren en aansluitingen. Bespreek het leidingwerk samen met het sanitair en de afwerking, voordat de werkzaamheden beginnen.</p>
        <a className="button button-primary" href="/#contact">Bespreek uw leidingwerk</a>
        <section aria-labelledby="scope-title">
          <h2 id="scope-title">Van waterleiding tot afvoer</h2>
          <p>Domi Installatie combineert installatiewerk met verbouwing en afwerking van particuliere woningen. U kunt uw plannen bespreken voor:</p>
          <ul>
            <li>Waterleidingen plaatsen of verleggen voor de nieuwe indeling.</li>
            <li>Kranen, toiletten en sanitair aansluiten.</li>
            <li>Afvoeren en aansluitingen aanpassen bij een badkamerverbouwing.</li>
            <li>Een nieuwe rioolaansluiting, met graafwerk en een passend leidingverloop.</li>
            <li>Een lekkage gericht opsporen voordat herstelwerk begint.</li>
          </ul>
          <p>De bestaande installatie en de gewenste indeling bepalen welke aanpassingen nodig zijn. Bij een complete badkamerverbouwing stemmen we leidingwerk, elektra, tegelwerk en montage op elkaar af.</p>
          <a href="/diensten/badkamerrenovatie">Meer over badkamer en toilet verbouwen</a>
        </section>
        <section className="service-page-project" aria-labelledby="example-title">
          <div>
            <p className="eyebrow dark"><span />Eigen project - Apeldoorn</p>
            <h2 id="example-title">Een rioolaansluiting door bosrijke grond</h2>
            <p>In Apeldoorn is een nieuwe rioolaansluiting aangelegd, inclusief graafwerk en leidingverloop. Wortels, hoogteverschillen en bereikbaarheid speelden mee bij de voorbereiding.</p>
            <p>De foto komt uit het eigen projectarchief. Op de projectpagina leest u over de aanleg en het herstel van het terrein.</p>
            <a href={`/projecten/${project.slug}`}>Bekijk de rioolaansluiting in Apeldoorn</a>
          </div>
          <figure><img src={project.image} alt={project.alt} width="640" height="530" loading="lazy" decoding="async" /><figcaption>Rioolaansluiting uit het eigen projectarchief in Apeldoorn.</figcaption></figure>
        </section>
        <section aria-labelledby="bathroom-title">
          <h2 id="bathroom-title">Leidingwerk bij een badkamer in Amsterdam</h2>
          <p>Bij het badkamer- en toiletproject in Amsterdam zijn leidingwerk, afvoeren en aansluitingen afgestemd op de nieuwe indeling. Daarna zijn de wanden voorbereid voor het tegelwerk.</p>
          <a href="/projecten/badkamer-toilet-amsterdam">Bekijk de badkamer en het toilet in Amsterdam</a>
        </section>
        <section aria-labelledby="prepare-title">
          <h2 id="prepare-title">Wat vermeldt u bij uw aanvraag?</h2>
          <p>Vermeld de plaats van de woning, welke ruimte verandert en welke kranen, toiletten of andere aansluitingen u wilt plaatsen of verplaatsen. Geef aan of het werk onderdeel is van een grotere verbouwing.</p>
          <p>Bij een rioolaansluiting helpt een beschrijving van het terrein en de bereikbaarheid. Bij een lekkage kunt u aangeven waar u vocht ziet en wanneer het probleem optreedt. Vermeld geen gevoelige persoonsgegevens in het formulier.</p>
          <p>Domi werkt aan particuliere woningen door heel Nederland. De projecten hierboven zijn voorbeelden uit Apeldoorn en Amsterdam.</p>
          <a className="button button-primary" href="/#contact">Bespreek uw project</a>
          <p>U kunt ook bellen: <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
        </section>
        <section aria-labelledby="reading-title">
          <h2 id="reading-title">Meer lezen over leidingwerk</h2>
          <ul>
            <li><a href="/kennis/verborgen-waterlek-opsporen">Een verborgen waterlek opsporen</a></li>
            <li><a href="/kennis/leidingnoodgeval-eerste-stappen">Eerste stappen bij een leidingnoodgeval</a></li>
          </ul>
        </section>
      </main>
      <footer className="service-page-footer"><a href="/">Domi Installatie</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></footer>
    </div>
  );
}
