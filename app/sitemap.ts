import type { MetadataRoute } from "next";
import { knowledgeArticlesNl } from "./knowledge-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const articles = knowledgeArticlesNl.flatMap(({ slug }) => [
    { url: `https://troosbouw.com/kennis/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `https://troosbouw.com/en/insights/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 },
  ]);

  return [
    { url: "https://troosbouw.com/", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://troosbouw.com/en", lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://troosbouw.com/privacy", lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: "https://troosbouw.com/voorwaarden", lastModified, changeFrequency: "yearly", priority: 0.2 },
    ...articles,
  ];
}
