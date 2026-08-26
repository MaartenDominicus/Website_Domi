import type { Metadata } from "next";
import DomiSite from "../domi-site";

const title = "Domi Installatie | Complete home renovations";
const description = "Complete renovations for private homes, inside and out. Construction, installation and finishing throughout the Netherlands, with one point of contact.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en", languages: { nl: "/", en: "/en" } },
  openGraph: { title, description, locale: "en_GB", url: "/en" },
  twitter: { title, description },
};

export default function EnglishHome() {
  return <DomiSite initialLanguage="en" />;
}
