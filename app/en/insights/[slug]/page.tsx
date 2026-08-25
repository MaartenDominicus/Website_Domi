import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgeArticlePage from "../../../knowledge-article";
import { findKnowledgeArticle, knowledgeArticlesEn } from "../../../knowledge-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return knowledgeArticlesEn.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findKnowledgeArticle("en", slug);
  if (!article) return {};

  return {
    title: `${article.title} | Domi Installation`,
    description: article.text,
    alternates: { canonical: `/en/insights/${article.slug}`, languages: { nl: `/kennis/${article.slug}`, en: `/en/insights/${article.slug}` } },
    openGraph: { title: article.title, description: article.text, type: "article", locale: "en_GB", images: [{ url: article.image, alt: article.alt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.text, images: [article.image] },
  };
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const article = findKnowledgeArticle("en", slug);
  if (!article) notFound();
  return <KnowledgeArticlePage article={article} locale="en" />;
}
