import type { Metadata } from "next";
import DomiSite from "../domi-site";

const title = "Domi Installatie | Construction, installation & renovation";
const description = "Domi Installatie delivers renovation, installation work, maintenance and complete finishing throughout the Netherlands through one skilled team.";

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
