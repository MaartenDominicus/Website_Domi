/* eslint-disable @next/next/no-html-link-for-pages -- GitHub Pages uses full document navigation for statically exported routes. */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring | Domi Installatie",
  description: "Lees hoe Domi Installatie omgaat met persoonsgegevens die via de website worden verstrekt.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <a className="brand" href="/"><span className="brand-mark"><img src="/domi-logo.jpg" alt="" /></span><span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span></a>
      <p className="eyebrow dark"><span />Privacy</p>
      <h1>Privacyverklaring</h1>
      <p>Wanneer u het contactformulier gebruikt, verwerken we de gegevens die u zelf invult om uw aanvraag te beantwoorden en eventueel een offerte of afspraak voor te bereiden.</p>
      <h2>Welke gegevens</h2>
      <p>Het formulier kan uw naam, e-mailadres, telefoonnummer, postcode en plaats, projecttype, gewenste startperiode en bericht bevatten.</p>
      <h2>Doel en bewaartermijn</h2>
      <p>We gebruiken deze gegevens uitsluitend voor contact over uw aanvraag. We bewaren ze niet langer dan nodig voor de behandeling en eventuele opvolging daarvan, tenzij een wettelijke bewaarplicht geldt.</p>
      <h2>Verzending van het formulier</h2>
      <p>De website gebruikt FormSubmit om formulierberichten veilig aan Domi Installatie door te sturen. Verstuur geen gevoelige persoonsgegevens via het vrije tekstveld.</p>
      <h2>Uw rechten</h2>
      <p>U kunt vragen om inzage, correctie of verwijdering van uw persoonsgegevens. Neem hiervoor contact op via het formulier op de homepage of bel <a href="tel:+31610983085">06 10 98 30 85</a>.</p>
      <p><a href="/">Terug naar de website</a></p>
    </main>
  );
}
