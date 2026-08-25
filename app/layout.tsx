import type { Metadata } from "next";
import "./globals.css";

const title = "Domi Installatie | Bouw, installatie & renovatie";
const description = "Domi Installatie verzorgt renovatie, installatiewerk, onderhoud en complete afwerking door heel Nederland — met één vakkundig team.";

export const metadata: Metadata = {
  metadataBase: new URL("https://troosbouw.com"),
  title,
  description,
  icons: { icon: "/domi-logo.jpg", shortcut: "/domi-logo.jpg" },
  keywords: ["Domi Installatie", "bouwbedrijf", "installatie", "renovatie", "elektra", "sanitair", "verbouwing", "Nederland"],
  alternates: { canonical: "/", languages: { nl: "/", en: "/en" } },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "nl_NL",
    siteName: "Domi Installatie",
    url: "/",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Domi Installatie — één vakteam voor uw hele project" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Domi Installatie",
  url: "https://troosbouw.com",
  image: "https://troosbouw.com/og.png",
  email: "troosbouw@gmail.com",
  telephone: "+31610983085",
  areaServed: { "@type": "Country", name: "Nederland" },
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: [
    "https://instagram.com/troosbouw",
    "https://www.facebook.com/people/Troos-Bouw/pfbid02mzgVYbe8DtqCVUW8Gu2NAk5bhdB7QAfE8g1fA43yLXcMGoFjUs2U2zWom1eVh2DUl/",
    "https://nl.pinterest.com/troosbouw/",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} /></body></html>;
}
