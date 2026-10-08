/* eslint-disable @next/next/no-html-link-for-pages -- Static routes use full document navigation. */
import type { Metadata } from "next";
import { projectsNl } from "../../project-data";

const path = "/diensten/vloerverwarming";
const title = "Vloerverwarming bij uw verbouwing | Domi Installatie";
const description = "Vloerverwarming, radiatoren en leidingaanpassingen bij uw woningverbouwing. Bekijk ons vloerverwarmingsproject in Kampen en bespreek uw plannen.";
const project = projectsNl.find(({ slug }) => slug === "vloerverwarming-kampen")!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { nl: path } },
  openGraph: { title, description, url: path, type: "website", locale: "nl_NL", images: [{ url: project.image, alt: project.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

export default function HeatingServicePage() {
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
        <nav aria-label="Broodkruimel"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/#diensten">Diensten</a><span aria-hidden="true"> / </span><span aria-current="page">Vloerverwarming</span></nav>
        <p className="eyebrow dark"><span />Verwarming</p>
        <h1>Vloerverwarming en leidingwerk bij uw woningverbouwing</h1>
        <p className="service-page-lead">Wilt u vloerverwarming aanleggen of verandert de indeling van uw woning? Bespreek de verwarming samen met de vloeropbouw, het leidingwerk en de bestaande installatie. Zo worden de werkzaamheden en de afwerking op elkaar afgestemd.</p>
        <a className="button button-primary" href="/#contact">Bespreek uw verwarming</a>
        <section aria-labelledby="scope-title">
          <h2 id="scope-title">Verwarming als onderdeel van de verbouwing</h2>
          <p>Domi Installatie combineert installatiewerk met verbouwing en afwerking van particuliere woningen. U kunt uw plannen bespreken voor:</p>
          <ul>
            <li>Vloerverwarming met een verdeler en leidingnet.</li>
            <li>Radiatoren en leidingaanpassingen bij een andere indeling.</li>
            <li>Het verbeteren van de warmteverdeling, afgestemd op de ruimte en de bestaande installatie.</li>
          </ul>
          <p>Welke aanpak past, hangt af van de woning en de bestaande situatie. Geef daarom bij uw aanvraag aan wat er al aanwezig is en welke ruimtes u wilt veranderen.</p>
        </section>
        <section className="service-page-project" aria-labelledby="example-title">
          <div>
            <p className="eyebrow dark"><span />Eigen project - Kampen</p>
            <h2 id="example-title">Een leidingplan en bereikbare verdeler</h2>
            <p>Bij het vloerverwarmingsproject in Kampen zijn een verdeler en leidingnet aangelegd. Het leidingplan is afgestemd op de ruimte, vloeropbouw en bestaande installatie.</p>
            <p>De vloer is verdeeld in groepen en de verdeler heeft een bereikbare positie gekregen. Voor het dichtzetten zijn de groepen afzonderlijk gevuld, ontlucht en op druk gecontroleerd.</p>
            <a href={`/projecten/${project.slug}`}>Bekijk het vloerverwarmingsproject in Kampen</a>
          </div>
          <figure><img src={project.image} alt={project.alt} width="640" height="530" loading="lazy" decoding="async" /><figcaption>Vloerverwarmingsverdeler en leidingwerk uit het eigen projectarchief in Kampen.</figcaption></figure>
        </section>
        <section aria-labelledby="prepare-title">
          <h2 id="prepare-title">Wat vermeldt u bij uw aanvraag?</h2>
          <p>Vermeld de plaats van de woning, de ruimtes die u wilt verwarmen en de huidige verwarming. Geef aan of de vloer wordt vernieuwd en welke vloerafwerking u in gedachten heeft. Een globale oppervlakte en een beschrijving van de beschikbare ruimte voor de verdeler helpen om uw plannen te bespreken.</p>
          <p>Vertel ook of het werk onderdeel is van een grotere verbouwing. De planning van leidingwerk en vloerafwerking moet op elkaar aansluiten. Vermeld geen gevoelige persoonsgegevens in het formulier.</p>
          <a className="button button-primary" href="/#contact">Bespreek uw project</a>
          <p>U kunt ook bellen: <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
        </section>
        <section aria-labelledby="related-title">
          <h2 id="related-title">Installatiewerk combineren</h2>
          <p>Verandert ook de indeling van uw badkamer of de plaats van aansluitpunten? Bekijk de andere diensten om de werkzaamheden samen te bespreken.</p>
          <ul>
            <li><a href="/diensten/water-sanitair">Leidingwerk, sanitair en riolering</a></li>
            <li><a href="/diensten/badkamerrenovatie">Badkamer en toilet verbouwen</a></li>
          </ul>
        </section>
      </main>
      <footer className="service-page-footer"><a href="/">Domi Installatie</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></footer>
    </div>
  );
}
