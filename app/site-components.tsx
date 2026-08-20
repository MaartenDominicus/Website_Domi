import { SiteHeader } from "./site-client";
import type { Project } from "./site-data";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <a className="whatsapp" href="https://wa.me/31610334563" aria-label="Neem contact op via WhatsApp">
        <span>WhatsApp</span>
        <b>↗</b>
      </a>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/images/troos-logo.png" alt="" />
          <div>
            <p className="footer-kicker">Troos Bouw</p>
            <h2>Ruimte om goed te leven.</h2>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-kicker">Navigatie</p>
            <a href="/service.html">Diensten</a>
            <a href="/project.html">Projecten</a>
            <a href="/about.html">Over ons</a>
            <a href="/blog.html">Kennisbank</a>
          </div>
          <div>
            <p className="footer-kicker">Contact</p>
            <a href="tel:+31610334563">06 10 33 45 63</a>
            <a href="mailto:troosbouw@gmail.com">troosbouw@gmail.com</a>
            <span>Amsterdam en omstreken</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Troos Bouw</span>
        <span>Nieuwbouw · Renovatie · Installatie</span>
      </div>
    </footer>
  );
}

export function SectionHeading({ eyebrow, title, link }: { eyebrow: string; title: string; link?: { label: string; href: string } }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow dark">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {link && <a className="text-link" href={link.href}>{link.label} <span>↗</span></a>}
    </div>
  );
}

export function ProjectGrid({ items, archive = false }: { items: Project[]; archive?: boolean }) {
  return (
    <div className={`project-grid${archive ? " project-grid-archive" : ""}`}>
      {items.map((project, index) => (
        <article className="project-card" id={project.id} key={`${project.id}-${index}`}>
          <div className="project-image-wrap">
            <img src={project.image} alt={`${project.title} in ${project.location}`} />
            <span>0{(index % 9) + 1}</span>
          </div>
          <div className="project-meta">
            <p>{project.type} · {project.location}</p>
            <h3>{project.title}</h3>
            <p className="project-summary">{project.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function PageHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image?: string }) {
  return (
    <section className={`page-hero${image ? " page-hero-image" : ""}`}>
      {image && <img src={image} alt="" />}
      {image && <div className="page-hero-shade" />}
      <div className="page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function ClosingCta({ title = "Heeft u een plek in gedachten?" }: { title?: string }) {
  return (
    <section className="closing-cta">
      <p className="eyebrow">Klaar voor de volgende stap?</p>
      <h2>{title}</h2>
      <div>
        <a className="button button-primary" href="/contact.html">Bespreek uw project <span>↗</span></a>
        <a className="button button-ghost" href="tel:+31610334563">06 10 33 45 63</a>
      </div>
    </section>
  );
}
