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
  const displayedOriginal = original && (original.language === locale || locale === "nl") ? original : undefined;
  const sourceLanguageDiffers = displayedOriginal?.language !== undefined && displayedOriginal.language !== locale;
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
        sourceText: "Dit artikel is door Domi Installatie uitgewerkt op basis van praktijkkennis en het genoemde onderwerp uit het openbare projectarchief.",
        sourceLanguageTitle: "Volledige technische bron",
        sourceLanguageText: "De complete broninformatie staat hieronder in de oorspronkelijke Engelse taal. Zo blijven alle maten, tabellen en technische keuzemogelijkheden behouden.",
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
        sourceText: "Domi Installatie developed this article from practical experience and the referenced topic in the public project archive.",
        sourceLanguageTitle: "Complete technical source",
        sourceLanguageText: "The complete source information appears below in its original language, preserving every measurement, table and technical option.",
        updated: article.updated ?? "Domi Installation knowledge base",
        ctaEyebrow: "From advice to execution",
        ctaTitle: "Would you like a professional assessment?",
        ctaText: "Tell us what you want to change. We review technical work, planning and finishing as one project.",
        ctaButton: "Discuss your project",
      };
  const contents = displayedOriginal
    ? displayedOriginal.toc
    : article.headings.map((label, index) => ({ id: `stap-${index + 1}`, label }));

  return (
    <main className="blog-page">
      <ArticleLocaleSync locale={locale} />
      <header className="blog-header">
        <div className="scroll-progress" aria-hidden="true" />
        <a className="brand" href={home} aria-label={isDutch ? "Domi Installatie homepage" : "Domi Installation home"}>
          <span className="brand-mark"><img src="/domi-logo.jpg" alt="" width="58" height="58" /></span>
          <span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span>
        </a>
        <div className="blog-header-actions">
          <nav className="language-switch" aria-label={isDutch ? "Selecteer taal" : "Select language"}>
            <a className={isDutch ? "active" : ""} aria-current={isDutch ? "page" : undefined} href={nlPath}>NL</a>
            <span>/</span>
            <a className={!isDutch ? "active" : ""} aria-current={!isDutch ? "page" : undefined} href={enPath}>EN</a>
          </nav>
          <a className="blog-back" href={`${home}#kennis`}>← {labels.back}</a>
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
                {contents.map(({ id, label }, index) => (
                  <li key={id}><a href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a></li>
                ))}
              </ol>
            </nav>
            <a className="button button-primary" href={`${home}#contact`}>{labels.ctaButton}<span>↗</span></a>
          </aside>

          <div className="blog-main-column">
            {displayedOriginal ? (
              <>
                {sourceLanguageDiffers ? (
                  <aside className="source-language-note">
                    <p>{labels.sourceLanguageTitle}</p>
                    <span>{labels.sourceLanguageText}</span>
                  </aside>
                ) : null}
                <OriginalArticleBody html={displayedOriginal.html} />
              </>
            ) : (
              <>
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
              </>
            )}

            <section className="blog-sources">
              <p>{labels.source}</p>
              <p>{labels.sourceText}</p>
              <a href={article.source} target="_blank" rel="noreferrer">{article.sourceLabel} ↗</a>
            </section>

          </div>
        </div>
      </article>

      <section className="blog-cta">
        <p className="eyebrow"><span />{labels.ctaEyebrow}</p>
        <h2>{labels.ctaTitle}</h2>
        <p>{labels.ctaText}</p>
        <a className="button button-light" href={`${home}#contact`}>{labels.ctaButton}<span>↗</span></a>
      </section>
    </main>
  );
}
