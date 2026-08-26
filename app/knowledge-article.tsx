import OriginalArticleBody from "./original-article-body";
import type { OriginalArticle } from "./original-articles";

export default function KnowledgeArticlePage({ article, locale }: { article: OriginalArticle; locale: "nl" | "en" }) {
  const home = locale === "nl" ? "/" : "/en";
  const labels = locale === "nl"
    ? {
        back: "Alle artikelen",
        archive: "Origineel kennisarchief",
        complete: "Volledige oorspronkelijke blogpost",
        ctaEyebrow: "Van kennis naar uitvoering",
        ctaTitle: "Een vraag over uw eigen woning?",
        ctaText: "Vertel ons wat u wilt aanpassen. We bekijken techniek, planning en afwerking in samenhang.",
        ctaButton: "Neem contact op",
      }
    : {
        back: "All articles",
        archive: "Original knowledge archive",
        complete: "Complete original blog post",
        ctaEyebrow: "From advice to execution",
        ctaTitle: "A question about your own home?",
        ctaText: "Tell us what you want to change. We review technical work, planning and finishing as one project.",
        ctaButton: "Get in touch",
      };

  return (
    <main className="blog-page original-blog-page">
      <header className="blog-header">
        <a className="brand" href={home} aria-label={locale === "nl" ? "Domi Installatie homepage" : "Domi Installation home"}>
          <span className="brand-mark"><img src="/domi-logo.jpg" alt="" width="58" height="58" /></span>
          <span className="brand-name"><strong>Domi</strong><small>Installatie</small></span>
        </a>
        <a className="blog-back" href={`${home}#kennis`}>← {labels.back}</a>
      </header>

      <article>
        <figure className="original-blog-cover">
          <img src={article.image} alt={article.imageAlt} width="1600" height="980" />
        </figure>

        <header className="original-blog-masthead">
          <p className="eyebrow"><span />{labels.archive}</p>
          <h1>{article.title}</h1>
          <div>
            <p>{article.category}</p>
            <span>{labels.complete} · {article.language.toUpperCase()}</span>
          </div>
        </header>

        <div className="original-blog-layout">
          <OriginalArticleBody html={article.html} />
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
