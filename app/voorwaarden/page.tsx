import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Voorwaarden | Domi Installatie",
  description: "Algemene informatie over aanvragen, offertes en werkzaamheden van Domi Installatie.",
  alternates: { canonical: "/voorwaarden" },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Link className="brand" href="/"><span className="brand-mark"><img src="/domi-logo.jpg" alt="" /></span><span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span></Link>
      <p className="eyebrow dark"><span />Voorwaarden</p>
      <h1>Aanvragen en offertes</h1>
      <p>Een aanvraag via deze website is vrijblijvend. Een opdracht ontstaat pas nadat de werkzaamheden, prijs, planning en overige afspraken schriftelijk zijn bevestigd.</p>
      <h2>Projectinformatie</h2>
      <p>Foto’s en beschrijvingen tonen eerder uitgevoerd werk en dienen als indruk van de mogelijkheden. Iedere locatie en installatie is anders; de uiteindelijke aanpak volgt uit een opname en een passend voorstel.</p>
      <h2>Planning en wijzigingen</h2>
      <p>De planning wordt per opdracht afgestemd. Wijzigingen of aanvullend werk worden besproken voordat ze worden uitgevoerd en kunnen gevolgen hebben voor prijs en doorlooptijd.</p>
      <h2>Contact</h2>
      <p>Vragen over een aanvraag of offerte kunt u sturen naar <a href="mailto:troosbouw@gmail.com">troosbouw@gmail.com</a> of bespreken via <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
      <p><Link href="/">Terug naar de website</Link></p>
    </main>
  );
}
