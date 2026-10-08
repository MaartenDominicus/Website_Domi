/* eslint-disable @next/next/no-html-link-for-pages -- Static routes use full document navigation. */
import type { Metadata } from "next";
import { projectsNl } from "../../project-data";

const path = "/diensten/badkamerrenovatie";
const title = "Badkamer en toilet verbouwen | Domi Installatie";
const description = "Badkamerrenovatie met leidingwerk, elektra, tegelwerk, sanitair en afwerking in ??n plan. Bekijk ons badkamerproject in Amsterdam en bespreek uw woning.";
const project = projectsNl.find(({ slug }) => slug === "badkamer-toilet-amsterdam")!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { nl: path } },
  openGraph: { title, description, url: path, type: "website", locale: "nl_NL", images: [{ url: project.image, alt: project.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

export default function BathroomServicePage() {
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
        <nav aria-label="Broodkruimel"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/#diensten">Diensten</a><span aria-hidden="true"> / </span><span aria-current="page">Badkamerrenovatie</span></nav>
        <p className="eyebrow dark"><span />Badkamers &amp; toiletten</p>
        <h1>Badkamer en toilet verbouwen</h1>
        <p className="service-page-lead">E?n plan voor leidingwerk, elektra, tegelwerk, sanitair, montage en kitwerk voorkomt losse schakels tijdens de verbouwing.</p>
        <a className="button button-primary" href="/#contact">Bespreek uw badkamer</a>
        <section aria-labelledby="scope-title">
          <h2 id="scope-title">Techniek en afwerking op elkaar afstemmen</h2>
          <p>Domi Installatie verbouwt en renoveert particuliere woningen. Voor een badkamer of toilet komen verschillende vakgebieden samen:</p>
          <ul>
            <li>Waterleidingen, afvoeren en aansluitingen voor kranen, toilet en sanitair.</li>
            <li>Elektra en verlichting, afgestemd op de indeling en het gebruik.</li>
            <li>Ondergronden, tegelwerk en afwerking van wanden en vloeren.</li>
            <li>Montage van sanitair en meubels, gevolgd door kitwerk en afwerking.</li>
          </ul>
          <p>We beginnen met een opname van de situatie en bespreken uw wensen. Daarna stemmen we werkzaamheden en planning af in een voorstel. De aanpak hangt af van de bestaande ruimte en installatie.</p>
        </section>
        <section className="service-page-project" aria-labelledby="example-title">
          <div>
            <p className="eyebrow dark"><span />Eigen project ? Amsterdam</p>
            <h2 id="example-title">Een vernieuwde badkamer en toiletruimte</h2>
            <p>{project.intro}</p>
            <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
            <a href={`/projecten/${project.slug}`}>Bekijk de badkamerrenovatie in Amsterdam</a>
          </div>
          <figure><img src={project.image} alt={project.alt} width="640" height="530" loading="lazy" decoding="async" /><figcaption>Badkamerproject uit het eigen projectarchief in Amsterdam.</figcaption></figure>
        </section>
        <section aria-labelledby="prepare-title">
          <h2 id="prepare-title">Uw aanvraag voorbereiden</h2>
          <p>Vermeld bij uw aanvraag de plaats van de woning, welke ruimte u wilt verbouwen en welke onderdelen u wilt vernieuwen. Geef aan of de indeling verandert en welke keuzes voor sanitair en afwerking al vaststaan. Zo kunnen we uw situatie gericht bespreken.</p>
          <p>Domi werkt aan particuliere woningen door heel Nederland. Het project hierboven laat een badkamerrenovatie in Amsterdam zien.</p>
          <a className="button button-primary" href="/#contact">Bespreek uw project</a>
          <p>U kunt ook bellen: <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
        </section>
        <section aria-labelledby="reading-title">
          <h2 id="reading-title">Meer lezen voor u kiest</h2>
          <ul>
            <li><a href="/kennis/tegels-en-voegen-kiezen">Tegels en voegen kiezen voor de badkamer</a></li>
            <li><a href="/kennis/badkamerventilator-kiezen">Een badkamerventilator kiezen</a></li>
          </ul>
        </section>
      </main>
      <footer className="service-page-footer"><a href="/">Domi Installatie</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></footer>
    </div>
  );
}
