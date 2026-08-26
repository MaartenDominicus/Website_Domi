import type { ProjectLocale, ProjectStory } from "./project-data";

const copy = {
  nl: {
    back: "Terug naar onze projecten",
    label: "Projectverhaal",
    highlights: "Dit hebben we aangepakt",
    gallery: "Meer van dit project",
    galleryNote: "Tijdelijke fotoplaceholders — hier komen later de aanvullende projectfoto’s.",
    placeholder: "Foto volgt",
    ctaEyebrow: "Ook plannen?",
    ctaTitle: "Vertel ons wat u wilt maken.",
    ctaText: "We denken graag mee over een logische aanpak, planning en uitvoering.",
    cta: "Bespreek uw project",
    home: "Domi Installatie home",
  },
  en: {
    back: "Back to our projects",
    label: "Project story",
    highlights: "What we delivered",
    gallery: "More from this project",
    galleryNote: "Temporary photo placeholders — additional project photography will be added here.",
    placeholder: "Photo coming soon",
    ctaEyebrow: "Planning a project?",
    ctaTitle: "Tell us what you would like to create.",
    ctaText: "We would be happy to help shape a clear approach, schedule and build.",
    cta: "Discuss your project",
    home: "Domi Installatie home",
  },
} as const;

export default function ProjectDetail({ project, locale }: { project: ProjectStory; locale: ProjectLocale }) {
  const t = copy[locale];
  const home = locale === "nl" ? "/" : "/en";

  return (
    <div className="project-page" lang={locale}>
      <a className="skip-link" href="#project-content">{locale === "nl" ? "Direct naar de inhoud" : "Skip to content"}</a>
      <header className="project-detail-header">
        <a className="brand" href={home} aria-label={t.home}>
          <span className="brand-mark"><img src="/domi-logo-intro.gif" alt="" /></span>
          <span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span>
        </a>
        <a className="project-back" href={`${home}#projecten`}><span>←</span>{t.back}</a>
        <a className="header-cta" href={`${home}#contact`}>{t.cta}</a>
      </header>

      <main id="project-content">
        <section className="project-detail-hero">
          <figure>
            <img src={project.image} alt={project.alt} width="1600" height="1000" fetchPriority="high" />
            <div className="project-detail-shade" />
          </figure>
          <div className="project-detail-title">
            <p className="eyebrow"><span />{project.type} · {project.location}</p>
            <h1>{project.title}</h1>
            <p>{project.intro}</p>
          </div>
        </section>

        <section className="project-story section-pad">
          <aside>
            <p className="eyebrow dark"><span />{t.label}</p>
            <p className="project-location">{project.location}</p>
            <ul>{project.highlights.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
          </aside>
          <article>
            {project.story.map((paragraph, index) => (
              <div className="project-story-block" key={paragraph}>
                <span>0{index + 1}</span>
                <p>{paragraph}</p>
              </div>
            ))}
          </article>
        </section>

        <section className="project-gallery" aria-labelledby="project-gallery-title">
          <div className="project-gallery-heading">
            <div><p className="eyebrow dark"><span />{t.placeholder}</p><h2 id="project-gallery-title">{t.gallery}</h2></div>
            <p>{t.galleryNote}</p>
          </div>
          <div className="project-gallery-grid">
            {project.gallery.map((caption, index) => (
              <figure className={`project-photo-placeholder placeholder-${index + 1}`} key={caption}>
                <div aria-hidden="true"><span>+</span></div>
                <figcaption><span>0{index + 1}</span><strong>{caption}</strong><small>{t.placeholder}</small></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="project-detail-cta">
          <p className="eyebrow"><span />{t.ctaEyebrow}</p>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <a className="button button-light" href={`${home}#contact`}>{t.cta}<span>↗</span></a>
        </section>
      </main>

      <footer className="project-detail-footer">
        <span>© {new Date().getFullYear()} Domi Installatie</span>
        <a href={home}>{t.home} ↗</a>
      </footer>
    </div>
  );
}
