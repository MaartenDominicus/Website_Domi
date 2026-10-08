/* eslint-disable @next/next/no-html-link-for-pages -- Static routes use full document navigation. */
import type { Metadata } from "next";
import { projectsNl } from "../../project-data";

const path = "/diensten/timmerwerk-montage";
const title = "Timmerwerk en montage bij verbouwing | Domi Installatie";
const description = "Aftimmering, deuren, plinten en maatwerk bij uw woningverbouwing. Bekijk ons timmerwerk in Rotterdam en het tuinhuis in Amsterdam en bespreek uw plannen.";
const project = projectsNl.find(({ slug }) => slug === "complete-renovatie-rotterdam")!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { nl: path } },
  openGraph: { title, description, url: path, type: "website", locale: "nl_NL", images: [{ url: project.image, alt: project.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

export default function CarpentryServicePage() {
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
        <nav aria-label="Broodkruimel"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/#diensten">Diensten</a><span aria-hidden="true"> / </span><span aria-current="page">Timmerwerk en montage</span></nav>
        <p className="eyebrow dark"><span />Timmerwerk &amp; montage</p>
        <h1>Timmerwerk en montage voor uw woningverbouwing</h1>
        <p className="service-page-lead">Deuren, plinten en aftimmering verbinden de verschillende onderdelen van een verbouwing. Bespreek uw maatwerk samen met de indeling, aansluitpunten en afwerking, zodat het past bij de ruimte en het dagelijks gebruik.</p>
        <a className="button button-primary" href="/#contact">Bespreek uw timmerwerk</a>
        <section aria-labelledby="scope-title">
          <h2 id="scope-title">Van aftimmering tot praktische interieuroplossingen</h2>
          <p>Domi Installatie combineert timmerwerk en montage met bouw, installatiewerk en afwerking van particuliere woningen. U kunt uw plannen bespreken voor:</p>
          <ul>
            <li>Aftimmering en ombouwen passend bij de beschikbare ruimte.</li>
            <li>Deuren en plinten als onderdeel van de verbouwing.</li>
            <li>Maatwerkdetails en praktische interieuroplossingen.</li>
          </ul>
          <p>De bestaande situatie bepaalt welke werkzaamheden nodig zijn. Geef aan welke onderdelen u wilt behouden en waar u iets wilt veranderen.</p>
        </section>
        <section className="service-page-project" aria-labelledby="example-title">
          <div>
            <p className="eyebrow dark"><span />Eigen project - Rotterdam</p>
            <h2 id="example-title">Timmerdetails rondom een vernieuwde trap</h2>
            <p>Bij de complete renovatie in Rotterdam is de trap hersteld en afgewerkt. Daaromheen zijn timmerwerk, schilderwerk en technische punten vernieuwd, met aandacht voor de overgangen tussen plinten, kozijnen, wanden en treden.</p>
            <a href={`/projecten/${project.slug}`}>Bekijk de woningrenovatie in Rotterdam</a>
          </div>
          <figure><img src={project.image} alt={project.alt} width="640" height="530" loading="lazy" decoding="async" /><figcaption>Afgewerkte trap uit het eigen projectarchief in Rotterdam.</figcaption></figure>
        </section>
        <section aria-labelledby="outdoor-title">
          <h2 id="outdoor-title">Maatwerk houtbouw in Amsterdam</h2>
          <p>Het tuinhuisproject in Amsterdam laat zien hoe houtbouw en installatiewerk samenkomen. Het maatwerk tuinhuis heeft een open lounge en een afgesloten berggedeelte. Elektra en verlichting zijn meegenomen in de opbouw.</p>
          <a href="/projecten/tuinhuis-amsterdam">Bekijk het tuinhuis in Amsterdam</a>
        </section>
        <section aria-labelledby="prepare-title">
          <h2 id="prepare-title">Wat vermeldt u bij uw aanvraag?</h2>
          <p>Vermeld de plaats van de woning, de ruimte en de onderdelen die u wilt laten aanpassen. Globale maten, het gewenste gebruik en een beschrijving van de huidige afwerking helpen om uw plannen te bespreken.</p>
          <p>Vertel ook of het timmerwerk deel uitmaakt van een grotere verbouwing en of aansluitpunten bereikbaar moeten blijven. Vermeld geen gevoelige persoonsgegevens in het formulier.</p>
          <a className="button button-primary" href="/#contact">Bespreek uw project</a>
          <p>U kunt ook bellen: <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
        </section>
        <section aria-labelledby="related-title">
          <h2 id="related-title">Verder lezen en werkzaamheden combineren</h2>
          <ul>
            <li><a href="/kennis/binnendeuren-hang-en-sluitwerk">Hang- en sluitwerk in oudere woningen</a></li>
            <li><a href="/diensten/elektra-verlichting">Elektra en verlichting bij uw verbouwing</a></li>
            <li><a href="/diensten/badkamerrenovatie">Badkamer en toilet verbouwen</a></li>
          </ul>
        </section>
      </main>
      <footer className="service-page-footer"><a href="/">Domi Installatie</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></footer>
    </div>
  );
}
