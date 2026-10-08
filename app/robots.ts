import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "ClaudeBot", "CCBot", "Bytespider"], disallow: "/" },
    ],
    sitemap: "https://www.matrisbouw.nl/sitemap.xml",
  };
}
