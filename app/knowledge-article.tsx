import Link from "next/link";
import type { KnowledgeArticle } from "./knowledge-data";

const nenSource = "https://www.nen.nl/en/elektrotechniek/installatievoorschriften/nen-1010-laagspanningsinstallaties";

export default function KnowledgeArticlePage({ article, locale }: { article: KnowledgeArticle; locale: "nl" | "en" }) {
  const home = locale === "nl" ? "/" : "/en";
  const isElectrical = article.slug === "veilige-elektrische-installatie";

  return (
    <main className="blog-page">
      <header className="blog-header">
        <Link className="brand" href={home} aria-label={locale === "nl" ? "Domi Installatie homepage" : "Domi Installation home"}>
          <span className="brand-mark"><img src="/domi-logo.jpg" alt="" width="58" height="58" /></span>
          <span className="brand-name"><strong>Domi</strong><small>Installatie</small></span>
        </Link>
        <Link className="blog-back" href={`${home}#kennis`}>← {locale === "nl" ? "Alle artikelen" : "All articles"}</Link>
      </header>

      <article>
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <p className="eyebrow"><span />{article.category}</p>
            <h1>{article.title}</h1>
            <p>{article.text}</p>
          </div>
          <figure>
            <img src={article.image} alt={article.alt} width="1200" height="900" />
          </figure>
        </section>

        <div className="blog-layout">
          <aside className="blog-aside">
            <p>{locale === "nl" ? "In dit artikel" : "In this article"}</p>
            <ol>{article.body.map((_, index) => <li key={index}>{String(index + 1).padStart(2, "0")}</li>)}</ol>
            <Link className="button button-primary" href={`${home}#contact`}>
              {locale === "nl" ? "Bespreek uw project" : "Discuss your project"}<span>↗</span>
            </Link>
          </aside>

          <div className="blog-body">
            {article.body.map((paragraph, index) => (
              <section key={paragraph}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{paragraph}</p>
              </section>
            ))}

            <div className="blog-sources">
              <p>{locale === "nl" ? "Herkomst & actualiteit" : "Source & currency"}</p>
              <p>
                {locale === "nl"
                  ? "Dit artikel is geredigeerd uit het bestaande openbare kennisarchief van Troos Bouw. De inhoud is compacter gemaakt voor de nieuwe website; de praktijkinformatie en fotografie komen uit de oorspronkelijke bron."
                  : "This article was edited from Troos Bouw’s existing public knowledge archive. It was condensed for the new website; the practical information and photography come from the original source."}
              </p>
              <div>
                <a href={article.source} target="_blank" rel="noreferrer">{article.sourceLabel} ↗</a>
                {isElectrical && <a href={nenSource} target="_blank" rel="noreferrer">NEN 1010 — officiële norminformatie ↗</a>}
              </div>
              {article.updated && <small>{article.updated}</small>}
            </div>
          </div>
        </div>
      </article>

      <section className="blog-cta">
        <p className="eyebrow"><span />{locale === "nl" ? "Van kennis naar uitvoering" : "From advice to execution"}</p>
        <h2>{locale === "nl" ? "Een vraag over uw eigen woning?" : "A question about your own home?"}</h2>
        <p>{locale === "nl" ? "Vertel ons wat u wilt aanpassen. We bekijken techniek, planning en afwerking in samenhang." : "Tell us what you want to change. We review technical work, planning and finishing as one project."}</p>
        <Link className="button button-light" href={`${home}#contact`}>{locale === "nl" ? "Neem contact op" : "Get in touch"}<span>↗</span></Link>
      </section>
    </main>
  );
}
