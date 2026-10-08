import { notFound, permanentRedirect } from "next/navigation";
import redirects from "../legacy-redirects.json";

type Props = { params: Promise<{ slug: string }> };

const legacyTargets: Record<string, string> = redirects;

export default async function LegacyRoute({ params }: Props) {
  const { slug } = await params;
  const key = decodeURIComponent(slug).toLowerCase();
  if (!Object.hasOwn(legacyTargets, key)) notFound();
  const target = legacyTargets[key];
  permanentRedirect(`/${target}`);
}
