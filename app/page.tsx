import { ClosingCta, ProjectGrid, SectionHeading, SiteShell } from "./site-components";
import { projects } from "./site-data";

const services = [
  {
    number: "01",
    title: "Nieuwbouw & recreatiewoningen",
    text: "Compacte woningen en bijgebouwen die precies passen bij de plek, het gebruik en uw manier van leven.",
    href: "/project.html",
  },
  {
    number: "02",
    title: "Renovatie & maatwerk",
    text: "Van nieuwe indeling tot keuken, badkamer of tuinkamer: doordacht uitgevoerd met één aanspreekpunt.",
    href: "/service.html",
  },
  {
    number: "03",
    title: "Installatietechniek",
    text: "Elektra, leidingwerk, verwarming en sanitair logisch geïntegreerd in de bouwkundige oplossing.",
    href: "/installatie.html",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="hero">
        <img className="hero-image" src="/images/hero.webp" alt="Houten recreatiewoning in Apeldoorn, gerealiseerd door Troos Bouw" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Amsterdam · Utrecht · Veluwe</p>
          <h1>Ruimte om goed<br />te leven.</h1>
          <p className="hero-copy">
            Van eerste schets tot laatste afwerking. Wij bouwen en vernieuwen woningen met
            heldere afspraken, duurzame materialen en zichtbaar vakmanschap.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projecten">Bekijk ons werk <span>↗</span></a>
            <a className="button button-ghost" href="tel:+31610334563">Bel 06 10 33 45 63</a>
          </div>
        </div>
        <div className="hero-note" aria-label="Troos Bouw kernbelofte">
          <span>01</span>
          <p><strong>Eén team.</strong><br />Ontwerp, bouw en installatie onder één dak.</p>
        </div>
      </section>

      <section className="promise-bar" aria-label="Troos Bouw werkwijze">
        <span>Doordacht ontwerp</span><i>●</i>
        <span>Vaste aanspreekpunten</span><i>●</i>
        <span>Netjes opgeleverd</span><i>●</i>
        <span>Gemaakt voor dagelijks gebruik</span>
      </section>

      <section className="manifesto section-pad">
        <div className="manifesto-number">A / 01</div>
        <div>
          <p className="eyebrow dark">Wat wij belangrijk vinden</p>
          <h2>Een gebouw is pas geslaagd als het vanzelfsprekend voelt.</h2>
        </div>
        <p className="manifesto-copy">
          Daarom beginnen we niet met een standaardoplossing, maar met vragen. Hoe gebruikt u de ruimte?
          Wat moet er beter? Welke keuzes blijven over tien jaar nog goed? Vanuit dat gesprek maken we een
          helder plan en voeren we het zorgvuldig uit.
        </p>
      </section>

      <section className="services section-pad" id="vakgebieden">
        <SectionHeading eyebrow="Vakgebieden" title="Van idee naar een plek die klopt." link={{ label: "Alle diensten", href: "/service.html" }} />
        <div className="service-grid">
          {services.map((service) => (
            <a className="service-card" href={service.href} key={service.number}>
              <span className="service-number">{service.number}</span>
              <div className="service-icon" aria-hidden="true"><i /><i /><i /></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <b>Ontdek meer ↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="projects section-pad" id="projecten">
        <SectionHeading eyebrow="Geselecteerd werk" title="Gebouwd met aandacht. Bewoond met plezier." link={{ label: "Bekijk alle projecten", href: "/digiBrochure.html" }} />
        <ProjectGrid items={projects} />
      </section>

      <section className="approach section-pad" id="werkwijze">
        <SectionHeading eyebrow="Werkwijze" title="Vier heldere stappen. Eén verantwoordelijk team." />
        <ol className="process-list">
          <li><span>01</span><div><h3>Kennismaken</h3><p>We bespreken uw wensen, locatie, planning en budget. U krijgt direct een eerlijk beeld van de mogelijkheden.</p></div></li>
          <li><span>02</span><div><h3>Plan & keuzes</h3><p>We brengen werk, materialen en afhankelijkheden in kaart. Zo weet iedereen wat wanneer gebeurt.</p></div></li>
          <li><span>03</span><div><h3>Bouwen</h3><p>Een vaste contactpersoon bewaakt kwaliteit, voortgang en afstemming met specialisten.</p></div></li>
          <li><span>04</span><div><h3>Opleveren</h3><p>We lopen alles samen na, leggen techniek helder uit en zorgen dat de ruimte direct goed gebruikt kan worden.</p></div></li>
        </ol>
      </section>

      <section className="story-split">
        <img src="/images/project-christiaan.webp" alt="Tuinkamer in Amsterdam" />
        <blockquote>
          <p className="eyebrow dark">Opdrachtgever aan het woord</p>
          <p>“Ons eigen idee en de praktische invulling van Troos kwamen mooi samen. De tuinkamer is echt een tweede woonkamer geworden.”</p>
          <footer>Christiaan · Tuinkamer Amsterdam</footer>
          <a className="text-link" href="/testimonial.html">Lees de ervaring <span>↗</span></a>
        </blockquote>
      </section>

      <section className="faq section-pad">
        <SectionHeading eyebrow="Veelgestelde vragen" title="Duidelijkheid voor we beginnen." />
        <div className="faq-list">
          <details><summary>In welk gebied werkt Troos Bouw?<span>+</span></summary><p>We werken vanuit Amsterdam en nemen projecten aan in de regio, Utrecht en op de Veluwe. Voor een passend project kijken we graag samen wat praktisch haalbaar is.</p></details>
          <details><summary>Doen jullie ook alleen installatiewerk?<span>+</span></summary><p>Ja. Elektra, leidingwerk, verwarming en sanitair kunnen onderdeel zijn van een verbouwing, maar ook als afzonderlijke opdracht worden uitgevoerd.</p></details>
          <details><summary>Kunnen jullie meedenken vóór er een ontwerp ligt?<span>+</span></summary><p>Graag zelfs. Vroege afstemming voorkomt onnodige keuzes en helpt om ambities, techniek en budget op elkaar aan te laten sluiten.</p></details>
          <details><summary>Hoe vraag ik een prijsindicatie aan?<span>+</span></summary><p>Stuur locatie, foto’s, globale maten en uw wensen mee. Na een korte kennismaking bepalen we welke opname of uitwerking nodig is voor een passende begroting.</p></details>
        </div>
      </section>

      <ClosingCta />
    </SiteShell>
  );
}
