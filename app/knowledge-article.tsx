import Link from "next/link";
import ArticleLocaleSync from "./article-locale-sync";
import type { KnowledgeArticle } from "./knowledge-data";
import OriginalArticleBody from "./original-article-body";
import type { OriginalArticle } from "./original-articles";

type Props = {
  article: KnowledgeArticle;
  locale: "nl" | "en";
  original?: OriginalArticle;
};

export default function KnowledgeArticlePage({ article, locale, original }: Props) {
  const isDutch = locale === "nl";
  const home = isDutch ? "/" : "/en";
  const nlPath = `/kennis/${article.slug}`;
  const enPath = `/en/insights/${article.slug}`;
  const labels = isDutch
    ? {
        back: "Alle artikelen",
        contents: "In dit artikel",
        intro: "In het kort",
        practical: "Praktische gids",
        source: "Bron & redactie",
        sourceText: "Dit artikel is door Domi Installatie uitgewerkt op basis van praktijkkennis en het genoemde onderwerp uit het openbare TroosCom-archief.",
        original: "Volledige informatie uit de bestaande blogpost",
        originalNote: "Het oorspronkelijke bronmateriaal blijft hieronder volledig beschikbaar.",
        updated: article.updated ?? "Domi Installatie kennisbank",
        ctaEyebrow: "Van kennis naar uitvoering",
        ctaTitle: "Uw situatie professioneel laten beoordelen?",
        ctaText: "Vertel ons wat u wilt aanpassen. We bekijken techniek, planning en afwerking in samenhang.",
        ctaButton: "Bespreek uw project",
      }
    : {
        back: "All articles",
        contents: "In this article",
        intro: "At a glance",
        practical: "Practical guide",
        source: "Source & editorial",
        sourceText: "Domi Installation developed this article from practical experience and the referenced topic in the public TroosCom archive.",
        original: "Complete information from the existing blog post",
        originalNote: "The full original source material remains available below in its source language.",
        updated: article.updated ?? "Domi Installation knowledge base",
        ctaEyebrow: "From advice to execution",
        ctaTitle: "Would you like a professional assessment?",
        ctaText: "Tell us what you want to change. We review technical work, planning and finishing as one project.",
        ctaButton: "Discuss your project",
      };

  return (
    <main className="blog-page">
      <ArticleLocaleSync locale={locale} />
      <header className="blog-header">
        <Link className="brand" href={home} aria-label={isDutch ? "Domi Installatie homepage" : "Domi Installation home"}>
          <span className="brand-mark"><img src="/domi-logo.jpg" alt="" width="58" height="58" /></span>
          <span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span>
        </Link>
        <div className="blog-header-actions">
          <nav className="language-switch" aria-label={isDutch ? "Selecteer taal" : "Select language"}>
            <Link className={isDutch ? "active" : ""} aria-current={isDutch ? "page" : undefined} href={nlPath}>NL</Link>
            <span>/</span>
            <Link className={!isDutch ? "active" : ""} aria-current={!isDutch ? "page" : undefined} href={enPath}>EN</Link>
          </nav>
          <Link className="blog-back" href={`${home}#kennis`}>← {labels.back}</Link>
        </div>
      </header>

      <article>
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <p className="eyebrow"><span />{labels.practical}</p>
            <p className="blog-category">{article.category}</p>
            <h1>{article.title}</h1>
            <p className="blog-deck">{article.text}</p>
            <div className="blog-byline"><span>Domi Installatie</span><span>{labels.updated}</span></div>
          </div>
          <figure className="original-blog-cover"><img src={article.image} alt={article.alt} width="1600" height="980" /></figure>
        </section>

        <div className="blog-layout">
          <aside className="blog-aside">
            <p>{labels.contents}</p>
            <nav aria-label={labels.contents}>
              <ol>
                {article.headings.map((heading, index) => (
                  <li key={heading}><a href={`#stap-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{heading}</a></li>
                ))}
              </ol>
            </nav>
            <Link className="button button-primary" href={`${home}#contact`}>{labels.ctaButton}<span>↗</span></Link>
          </aside>

          <div className="blog-main-column">
            <section className="blog-intro" aria-labelledby="blog-intro-title">
              <p>{labels.intro}</p>
              <h2 id="blog-intro-title">{article.text}</h2>
            </section>

            <div className="blog-body">
              {article.body.map((paragraph, index) => (
                <section id={`stap-${index + 1}`} key={article.headings[index]}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h2>{article.headings[index]}</h2><p>{paragraph}</p></div>
                </section>
              ))}
            </div>

            <section className="blog-sources">
              <p>{labels.source}</p>
              <p>{labels.sourceText}</p>
              <a href={article.source} target="_blank" rel="noreferrer">{article.sourceLabel} ↗</a>
            </section>

            {original ? (
              <details className="legacy-article">
                <summary><span>{labels.original}</span><small>{labels.originalNote}</small></summary>
                <div className="legacy-article-content">
                  <h2>{original.title}</h2>
                  <OriginalArticleBody html={original.html} />
                </div>
              </details>
            ) : null}
          </div>
        </div>
      </article>

      <section className="blog-cta">
        <p className="eyebrow"><span />{labels.ctaEyebrow}</p>
        <h2>{labels.ctaTitle}</h2>
        <p>{labels.ctaText}</p>
        <Link className="button button-light" href={`${home}#contact`}>{labels.ctaButton}<span>↗</span></Link>
      </section>
    </main>
  );
}
