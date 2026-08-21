import { notFound, permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

const legacyTargets: Record<string, string> = {
  "about.html": "#over",
  about: "#over",
  "over-ons": "#over",
  "service.html": "#diensten",
  service: "#diensten",
  diensten: "#diensten",
  "installatie.html": "#diensten",
  installatie: "#diensten",
  "project.html": "#projecten",
  project: "#projecten",
  projecten: "#projecten",
  "testimonial.html": "#reviews",
  "testimonials.html": "#reviews",
  testimonials: "#reviews",
  reviews: "#reviews",
  "blog.html": "#kennis",
  blog: "#kennis",
  kennis: "#kennis",
  "contact.html": "#contact",
  contact: "#contact",
  "quote.html": "#contact",
  quote: "#contact",
  offerte: "#contact",
};

export default async function LegacyRoute({ params }: Props) {
  const { slug } = await params;
  const target = legacyTargets[decodeURIComponent(slug).toLowerCase()];
  if (!target) notFound();
  permanentRedirect(`/${target}`);
}
