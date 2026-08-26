import type { Metadata } from "next";
import "./globals.css";

const title = "Domi Installatie | Complete woningverbouwingen";
const description = "Complete verbouwingen voor particuliere woningen, binnen en buiten. Bouw, installatie en afwerking door heel Nederland, met één aanspreekpunt.";

export const metadata: Metadata = {
  metadataBase: new URL("https://troosbouw.com"),
  title,
  description,
  icons: { icon: "/domi-logo.jpg", shortcut: "/domi-logo.jpg" },
  keywords: ["Domi Installatie", "woningverbouwing", "renovatie", "elektra", "sanitair", "timmerwerk", "afbouw", "Nederland"],
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
  telephone: "+31610983085",
  areaServed: { "@type": "Country", name: "Nederland" },
  openingHours: "Mo-Fr 09:00-18:00",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} /></body></html>;
}
