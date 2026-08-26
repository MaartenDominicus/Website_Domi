import Link from "next/link";
import OriginalArticleBody from "./original-article-body";
import type { OriginalArticle } from "./original-articles";

export default function KnowledgeArticlePage({ article, locale }: { article: OriginalArticle; locale: "nl" | "en" }) {
  const home = locale === "nl" ? "/" : "/en";
  const labels = locale === "nl"
    ? {
        back: "Alle artikelen",
        archive: "Origineel kennisarchief",
        complete: "Volledige oorspronkelijke blogpost",
        sourceTitle: "Over deze publicatie",
        sourceText: "De tekst, tabellen, maatvoeringen, voorbeelden en beeldselectie hieronder zijn letterlijk en volledig overgenomen uit het oorspronkelijke openbare Troos Bouw-blog. Alleen de vormgeving en navigatie zijn vernieuwd.",
        caution: "Technische normen en productinformatie kunnen veranderen. Laat actuele eisen altijd voor uw eigen situatie controleren.",
        sourceLink: "Bekijk het originele bronbestand",
        ctaEyebrow: "Van kennis naar uitvoering",
        ctaTitle: "Een vraag over uw eigen woning?",
        ctaText: "Vertel ons wat u wilt aanpassen. We bekijken techniek, planning en afwerking in samenhang.",
        ctaButton: "Neem contact op",
      }
    : {
        back: "All articles",
        archive: "Original knowledge archive",
        complete: "Complete original blog post",
        sourceTitle: "About this publication",
        sourceText: "The text, tables, dimensions, examples and image selection below have been reproduced literally and in full from the original public Troos Bouw blog. Only the presentation and navigation have been redesigned.",
        caution: "Technical standards and product information may change. Always have the current requirements checked for your own situation.",
        sourceLink: "View the original source file",
        ctaEyebrow: "From advice to execution",
        ctaTitle: "A question about your own home?",
        ctaText: "Tell us what you want to change. We review technical work, planning and finishing as one project.",
        ctaButton: "Get in touch",
      };

  return (
    <main className="blog-page original-blog-page">
      <header className="blog-header">
        <Link className="brand" href={home} aria-label={locale === "nl" ? "Domi Installatie homepage" : "Domi Installation home"}>
          <span className="brand-mark"><img src="/domi-logo.jpg" alt="" width="58" height="58" /></span>
          <span className="brand-name"><strong>Domi</strong><small>Installatie</small></span>
        </Link>
        <Link className="blog-back" href={`${home}#kennis`}>← {labels.back}</Link>
      </header>

      <article>
        <header className="original-blog-masthead">
          <p className="eyebrow"><span />{labels.archive}</p>
          <h1>{article.title}</h1>
          <div>
            <p>{article.category}</p>
            <span>{labels.complete} · {article.language.toUpperCase()}</span>
          </div>
        </header>

        <div className="original-blog-layout">
          <aside className="original-blog-note">
            <p>{labels.sourceTitle}</p>
            <p>{labels.sourceText}</p>
            <small>{labels.caution}</small>
            <a href={article.source} target="_blank" rel="noreferrer">{labels.sourceLink} ↗</a>
          </aside>
          <OriginalArticleBody html={article.html} />
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
