import type { MetadataRoute } from "next";
import { knowledgeArticlesNl } from "./knowledge-data";
import { projectsNl } from "./project-data";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastmod until a verified date of significant content change is available.
  // A build timestamp incorrectly marks unchanged pages as freshly updated.
  const articles = knowledgeArticlesNl.flatMap(({ slug }) => [
    { url: `https://www.matrisbouw.nl/kennis/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `https://www.matrisbouw.nl/en/insights/${slug}`, changeFrequency: "monthly" as const, priority: 0.6 },
  ]);
  const projects = projectsNl.flatMap(({ slug }) => [
    { url: `https://www.matrisbouw.nl/projecten/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `https://www.matrisbouw.nl/en/projects/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 },
  ]);

  return [
    { url: "https://www.matrisbouw.nl/", changeFrequency: "monthly", priority: 1 },
    { url: "https://www.matrisbouw.nl/en", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.matrisbouw.nl/privacy", changeFrequency: "yearly", priority: 0.2 },
    { url: "https://www.matrisbouw.nl/voorwaarden", changeFrequency: "yearly", priority: 0.2 },
    { url: "https://www.matrisbouw.nl/diensten/badkamerrenovatie", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.matrisbouw.nl/diensten/elektra-verlichting", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.matrisbouw.nl/diensten/water-sanitair", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.matrisbouw.nl/diensten/vloerverwarming", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.matrisbouw.nl/diensten/timmerwerk-montage", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.matrisbouw.nl/diensten/tegel-stuc-schilderwerk", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.matrisbouw.nl/diensten/woningrenovatie", changeFrequency: "monthly", priority: 0.8 },
    ...projects,
    ...articles,
  ];
}
