import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Domi Installatie | Bouw, installatie & renovatie";
  const description = "Domi Installatie helpt met renovatie, installatiewerk, onderhoud en complete afwerking — helder geregeld door één vakkundig team.";
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title,
    description,
    icons: { icon: "/domi-logo.jpg", shortcut: "/domi-logo.jpg" },
    keywords: ["Domi Installatie", "bouwbedrijf", "installatie", "renovatie", "elektra", "sanitair", "verbouwing"],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "nl_NL",
      siteName: "Domi Installatie",
      url: origin,
      images: [{ url: socialImage, width: 1730, height: 909, alt: "Domi Installatie — één vakteam voor uw hele project" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl"><body>{children}</body></html>;
}
