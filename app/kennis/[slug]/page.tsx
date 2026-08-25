import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgeArticlePage from "../../knowledge-article";
import { findKnowledgeArticle, knowledgeArticlesNl } from "../../knowledge-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return knowledgeArticlesNl.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findKnowledgeArticle("nl", slug);
  if (!article) return {};

  return {
    title: `${article.title} | Domi Installatie`,
    description: article.text,
    alternates: { canonical: `/kennis/${article.slug}`, languages: { nl: `/kennis/${article.slug}`, en: `/en/insights/${article.slug}` } },
    openGraph: { title: article.title, description: article.text, type: "article", locale: "nl_NL", images: [{ url: article.image, alt: article.alt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.text, images: [article.image] },
  };
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const article = findKnowledgeArticle("nl", slug);
  if (!article) notFound();
  return <KnowledgeArticlePage article={article} locale="nl" />;
}
