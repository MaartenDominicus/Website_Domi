/* eslint-disable @next/next/no-html-link-for-pages -- Static routes use full document navigation. */
import type { Metadata } from "next";
import { projectsNl } from "../../project-data";

const path = "/diensten/tegel-stuc-schilderwerk";
const title = "Tegel-, stuc- en schilderwerk bij verbouwing | Domi Installatie";
const description = "Tegelwerk, stucwerk en schilderwerk voor uw woningverbouwing. Bekijk tegelwerk in Amsterdam en schilder- en afbouwwerk in Rotterdam en bespreek uw afwerking.";
const bathroom = projectsNl.find(({ slug }) => slug === "badkamer-toilet-amsterdam")!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { nl: path } },
  openGraph: { title, description, url: path, type: "website", locale: "nl_NL", images: [{ url: bathroom.image, alt: bathroom.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [bathroom.image] },
};

export default function FinishingServicePage() {
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
        <nav aria-label="Broodkruimel"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/#diensten">Diensten</a><span aria-hidden="true"> / </span><span aria-current="page">Tegel-, stuc- en schilderwerk</span></nav>
        <p className="eyebrow dark"><span />Tegel-, stuc- &amp; schilderwerk</p>
        <h1>Tegelwerk, stucwerk en schilderwerk voor uw woningverbouwing</h1>
        <p className="service-page-lead">De afwerking begint bij de bestaande ondergrond. Domi Installatie beoordeelt die ondergrond, herstelt waar nodig en werkt wanden, vloeren en plafonds af passend bij het gebruik van de ruimte.</p>
        <a className="button button-primary" href="/#contact">Bespreek uw afwerking</a>
        <section aria-labelledby="scope-title">
          <h2 id="scope-title">Welke afwerking heeft uw ruimte nodig?</h2>
          <ul>
            <li>Tegelwerk voor wanden en vloeren, bijvoorbeeld bij een badkamer- of toiletverbouwing.</li>
            <li>Stucwerk en herstel van ondergronden als onderdeel van de afwerking.</li>
            <li>Schilderwerk om de vernieuwde ruimte en de omliggende details samen af te werken.</li>
          </ul>
          <p>Geef bij uw aanvraag aan welke oppervlakken u wilt veranderen en welke afwerking er nu aanwezig is. Wilt u aansluitpunten verplaatsen of leidingwerk aanpassen? Bespreek dat samen met de afwerking, zodat techniek en zichtwerk op elkaar aansluiten.</p>
        </section>
        <section className="service-page-project" aria-labelledby="example-title">
          <div>
            <p className="eyebrow dark"><span />Eigen project - Amsterdam</p>
            <h2 id="example-title">Tegelwerk in een vernieuwde badkamer en toilet</h2>
            <p>In dit Amsterdamse project zijn de wanden voorbereid voor het tegelwerk nadat leidingwerk, afvoeren en aansluitingen op de nieuwe indeling waren afgestemd. Blauw en wit tegelwerk vormt de zichtbare afwerking van de compacte ruimtes.</p>
            <a href={`/projecten/${bathroom.slug}`}>Bekijk de badkamer en het toilet in Amsterdam</a>
          </div>
          <figure><img src={bathroom.image} alt={bathroom.alt} width="640" height="530" loading="lazy" decoding="async" /><figcaption>Tegelwerk uit het eigen badkamerproject in Amsterdam.</figcaption></figure>
        </section>
        <section aria-labelledby="painting-title">
          <h2 id="painting-title">Schilder- en afbouwwerk bij een renovatie in Rotterdam</h2>
          <p>Bij de complete woningrenovatie in Rotterdam is de trap hersteld en afgewerkt. Ook het omliggende timmerwerk en schilderwerk zijn vernieuwd, met aandacht voor de overgangen tussen plinten, kozijnen, wanden en treden.</p>
          <a href="/projecten/complete-renovatie-rotterdam">Bekijk de afwerking van de woning in Rotterdam</a>
        </section>
        <section aria-labelledby="prepare-title">
          <h2 id="prepare-title">Wat vermeldt u bij uw aanvraag?</h2>
          <p>Vermeld de plaats van de woning, de ruimte en of het om wanden, vloeren of plafonds gaat. Beschrijf de huidige afwerking, eventuele beschadigingen en het gewenste resultaat. Globale afmetingen helpen om de omvang van het werk te bespreken.</p>
          <p>Geef ook aan of u alleen de afwerking wilt vernieuwen of deze wilt combineren met een verbouwing. Vermeld geen gevoelige persoonsgegevens in het formulier.</p>
          <a className="button button-primary" href="/#contact">Bespreek uw project</a>
          <p>U kunt ook bellen: <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
        </section>
        <section aria-labelledby="related-title">
          <h2 id="related-title">Verder lezen en werkzaamheden combineren</h2>
          <ul>
            <li><a href="/kennis/tegels-en-voegen-kiezen">Tegels en voegen kiezen voor de badkamer</a></li>
            <li><a href="/diensten/badkamerrenovatie">Badkamer en toilet verbouwen</a></li>
            <li><a href="/diensten/timmerwerk-montage">Timmerwerk en montage bij uw verbouwing</a></li>
            <li><a href="/diensten/elektra-verlichting">Elektra en verlichting bij uw verbouwing</a></li>
          </ul>
        </section>
      </main>
      <footer className="service-page-footer"><a href="/">Domi Installatie</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></footer>
    </div>
  );
}
