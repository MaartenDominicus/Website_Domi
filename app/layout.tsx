import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const image = new URL("/og.png", `${protocol}://${host}`).toString();
  const title = "Troos Bouw | Bouwen met aandacht";
  const description = "Nieuwbouw, renovatie en installatietechniek in Amsterdam, Utrecht en op de Veluwe.";
  return {
    title,
    description,
    icons: { icon: "/images/troos-logo.png", shortcut: "/images/troos-logo.png" },
    openGraph: { title, description, locale: "nl_NL", type: "website", images: [{ url: image, width: 1731, height: 909, alt: "Troos Bouw — Ruimte om goed te leven." }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
