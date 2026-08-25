import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://troosbouw.com/", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://troosbouw.com/en", lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://troosbouw.com/privacy", lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: "https://troosbouw.com/voorwaarden", lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
