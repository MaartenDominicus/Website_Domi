import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ContactForm } from "../site-client";
import { brochureProjects, getPageDefinition, projects, type PageKind } from "../site-data";
import { ClosingCta, PageHero, ProjectGrid, SectionHeading, SiteShell } from "../site-components";

type Props = { params: Promise<{ slug: string }> };

async function absoluteUrl(path: string) {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return new URL(path, `${protocol}://${host}`).toString();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageDefinition(slug);
  if (!page) return {};
  const title = `${page.title} | Troos Bouw`;
  const image = page.heroImage ? await absoluteUrl(page.heroImage) : undefined;
  return {
    title,
    description: page.description,
    openGraph: { title, description: page.description, images: image ? [image] : [] },
    twitter: { card: "summary_large_image", title, description: page.description, images: image ? [image] : [] },
  };
}

export default async function LegacyPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageDefinition(slug);
  if (!page) notFound();

  return (
    <SiteShell>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} image={page.heroImage} />
      <PageBody kind={page.kind} />
    </SiteShell>
  );
}

function PageBody({ kind }: { kind: PageKind }) {
  switch (kind) {
    case "about":
      return <AboutPage />;
    case "services":
      return <ServicesPage />;
    case "projects":
      return <ProjectsPage />;
    case "benefits":
      return <BenefitsPage />;
    case "quote":
      return <ContactPage quote />;
    case "team":
      return <TeamPage />;
    case "testimonials":
      return <TestimonialsPage />;
    case "blog":
      return <BlogPage />;
    case "contact":
      return <ContactPage />;
    case "installation":
      return <InstallationPage />;
    case "installation-blog":
      return <InstallationBlogPage />;
    case "electricity":
      return <ElectricityArticle />;
    case "doors":
      return <DoorsArticle />;
    case "tiles":
      return <TilesArticle />;
    case "brochure":
      return <BrochurePage />;
    case "thanks":
      return <ThanksPage />;
    case "legacy-404":
      return <Legacy404 />;
  }
}

function AboutPage() {
  return (
    <>
      <section className="editorial-intro section-pad">
        <p className="side-label">A / 01</p>
        <div>
          <p className="eyebrow dark">Onze overtuiging</p>
          <h2>Goed bouwen is aandacht verdelen over duizend kleine beslissingen.</h2>
        </div>
        <div className="body-copy">
          <p>Troos Bouw helpt particulieren en kleine opdrachtgevers bij nieuwbouw, verbouwingen, recreatiewoningen en installatietechniek. We houden het team compact, zodat de mensen die het werk bespreken ook betrokken blijven bij de uitvoering.</p>
          <p>Geen project is hetzelfde. Wel is onze aanpak steeds herkenbaar: eerst begrijpen, dan vereenvoudigen, daarna zorgvuldig maken. Zo ontstaat een resultaat dat niet alleen mooi oogt, maar logisch functioneert en prettig ouder wordt.</p>
        </div>
      </section>
      <section className="values section-pad">
        <SectionHeading eyebrow="Waarden" title="Waar u ons aan mag houden." />
        <div className="value-grid">
          <article><span>01</span><h3>Openheid</h3><p>We benoemen gevolgen van keuzes voordat ze een verrassing worden.</p></article>
          <article><span>02</span><h3>Eigenaarschap</h3><p>Wie iets signaleert, helpt het ook oplossen. Dat houdt lijnen kort.</p></article>
          <article><span>03</span><h3>Vakmanschap</h3><p>Strakke maatvoering, degelijke materialen en aandacht voor wat later niet meer zichtbaar is.</p></article>
          <article><span>04</span><h3>Gebruik</h3><p>We ontwerpen en bouwen vanuit het dagelijks leven in de ruimte.</p></article>
        </div>
      </section>
      <section className="story-split story-split-reverse">
        <img src="/images/hero.webp" alt="Interieur van Maja's Hideaway in Apeldoorn" />
        <div className="story-copy"><p className="eyebrow dark">Van binnen naar buiten</p><h2>De plek bepaalt het plan.</h2><p>Een boswoning vraagt iets anders dan een Amsterdamse benedenwoning. Daarom kijken we naar licht, bestaande constructie, logistiek, onderhoud en toekomstig gebruik voordat we oplossingen vastleggen.</p><a className="text-link" href="/project.html">Bekijk de projecten <span>↗</span></a></div>
      </section>
      <ClosingCta title="Samen iets maken dat lang goed blijft?" />
    </>
  );
}

function ServicesPage() {
  const items = [
    ["01", "Nieuwbouw", "Recreatiewoningen, tiny houses, tuinhuizen en compacte bijgebouwen — afgestemd op locatie en gebruik."],
    ["02", "Renovatie", "Complete verbouwingen, nieuwe indelingen, verduurzaming en herstel van bestaande bouw."],
    ["03", "Interieur & maatwerk", "Keukens, badkamers, kasten, deuren en slimme oplossingen voor lastige meters."],
    ["04", "Installatietechniek", "Elektra, leidingwerk, verwarming, sanitair en ventilatie als logisch onderdeel van het geheel."],
    ["05", "Buitenruimte", "Vlonders, terrassen, gevelwerk, boeiboorden en kleine constructieve uitbreidingen."],
    ["06", "Bouwbegeleiding", "Inventarisatie, werkvolgorde, materiaalkeuzes en afstemming met vertrouwde specialisten."],
  ];
  return (
    <>
      <section className="service-list section-pad">
        {items.map(([number, title, text]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{text}</p><a href="/quote.html" aria-label={`Vraag informatie aan over ${title}`}>↗</a></article>)}
      </section>
      <section className="dark-panel section-pad">
        <div><p className="eyebrow">Eén geheel</p><h2>Bouw en techniek worden tegelijk uitgedacht.</h2></div>
        <div className="body-copy light"><p>Leidingen, sparingen, aansluitpunten en afwerking beïnvloeden elkaar. Door daar vroeg naar te kijken, voorkomen we geïmproviseerde oplossingen aan het einde.</p><a className="button button-primary" href="/installatie.html">Installatietechniek <span>↗</span></a></div>
      </section>
      <ClosingCta title="Welke ruimte wilt u verbeteren?" />
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <section className="projects section-pad"><SectionHeading eyebrow="Selectie" title="Nieuwbouw, renovatie en maatwerk." /><ProjectGrid items={projects} /></section>
      <section className="project-note section-pad"><p className="eyebrow dark">Meer werk</p><h2>In het projectarchief vindt u ook uitbreidingen, installaties en buitenwerk.</h2><a className="button button-dark" href="/digiBrochure.html">Open het projectarchief <span>↗</span></a></section>
      <ClosingCta />
    </>
  );
}

function BenefitsPage() {
  return (
    <>
      <section className="editorial-intro section-pad"><p className="side-label">B / 01</p><div><p className="eyebrow dark">Samenwerken</p><h2>U hoeft geen bouwexpert te zijn om grip te houden.</h2></div><div className="body-copy"><p>We vertalen technische keuzes naar begrijpelijke gevolgen voor prijs, planning, uitstraling en onderhoud. Daardoor kunt u op het juiste moment beslissen.</p><p>We plannen realistisch, houden het werk overzichtelijk en zorgen dat iedere specialist weet wat er van hem of haar wordt verwacht.</p></div></section>
      <section className="benefit-grid section-pad">
        <article><b>01</b><h3>Eén aanspreekpunt</h3><p>Geen zoektocht tussen partijen; vragen en besluiten komen op één plek samen.</p></article>
        <article><b>02</b><h3>Heldere werkvolgorde</h3><p>We brengen afhankelijkheden vroeg in beeld en beperken stilstand op de bouw.</p></article>
        <article><b>03</b><h3>Zicht op keuzes</h3><p>U weet welke beslissingen urgent zijn en welke nog kunnen wachten.</p></article>
        <article><b>04</b><h3>Nette uitvoering</h3><p>We werken zorgvuldig, beschermen de omgeving en sluiten iedere fase ordelijk af.</p></article>
      </section>
      <ClosingCta title="Op zoek naar overzicht in uw verbouwing?" />
    </>
  );
}

function ContactPage({ quote = false }: { quote?: boolean }) {
  return (
    <section className="contact-layout section-pad">
      <aside>
        <p className="eyebrow dark">{quote ? "Wat helpt om mee te sturen" : "Direct contact"}</p>
        {quote ? (
          <ul className="check-list"><li>Locatie en type woning</li><li>Foto’s of een bestaande tekening</li><li>Globale maten</li><li>Gewenste planning</li><li>Budgetbandbreedte, indien bekend</li></ul>
        ) : (
          <><a className="contact-line" href="tel:+31610334563"><span>Telefoon</span><strong>06 10 33 45 63</strong></a><a className="contact-line" href="mailto:troosbouw@gmail.com"><span>E-mail</span><strong>troosbouw@gmail.com</strong></a><div className="contact-line"><span>Werkgebied</span><strong>Amsterdam en omstreken</strong></div></>
        )}
        <p className="contact-note">Na uw bericht plannen we zo nodig een korte telefonische kennismaking. Voor een passende begroting kan daarna een opname op locatie volgen.</p>
      </aside>
      <ContactForm />
    </section>
  );
}

function TeamPage() {
  const roles = [
    ["Bouwbegeleiding", "Intake, werkvoorbereiding, planning en dagelijks aanspreekpunt."],
    ["Timmerwerk & maatwerk", "Constructie, gevels, interieurbouw en nauwkeurige afwerking."],
    ["Installatietechniek", "Elektra, water, verwarming, sanitair en ventilatie."],
    ["Vaste specialisten", "Stukadoors, tegelzetters, schilders en andere vertrouwde partners."],
  ];
  return (
    <>
      <section className="editorial-intro section-pad"><p className="side-label">T / 01</p><div><p className="eyebrow dark">De mensen achter het werk</p><h2>De juiste vakman op het juiste moment.</h2></div><div className="body-copy"><p>Troos werkt met een compacte kern en een netwerk van specialisten die elkaar kennen. Dat maakt de samenwerking direct en houdt de verantwoordelijkheid duidelijk.</p><p>U krijgt geen wisselend loket, maar contact met mensen die de context van uw project begrijpen.</p></div></section>
      <section className="role-grid section-pad">{roles.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div className="role-avatar" aria-hidden="true">{title.charAt(0)}</div><h3>{title}</h3><p>{text}</p></article>)}</section>
      <ClosingCta title="Kennismaken met het team voor uw project?" />
    </>
  );
}

function TestimonialsPage() {
  return (
    <>
      <section className="testimonial-feature section-pad"><div><p className="eyebrow dark">Tuinkamer · Amsterdam</p><blockquote>“De samenwerking voelde echt gezamenlijk: ons idee, aangevuld met praktische oplossingen. Nu hebben we een beschutte tweede woonkamer die we van voorjaar tot najaar gebruiken.”</blockquote><p>— Christiaan</p></div><img src="/images/project-christiaan.webp" alt="Tuinkamer van Christiaan in Amsterdam" /></section>
      <section className="testimonial-cards section-pad"><article><span>01</span><h3>Keuzes werden tastbaar</h3><p>Door materialen, gebruik en uitvoering vroeg samen te bespreken, bleef het ontwerp dichtbij de bedoeling.</p></article><article><span>02</span><h3>De bouw bleef overzichtelijk</h3><p>Heldere afstemming en een vaste contactpersoon maakten het traject rustig en voorspelbaar.</p></article><article><span>03</span><h3>Het resultaat wordt echt gebruikt</h3><p>Niet alleen een mooi object, maar extra leefruimte die onderdeel is geworden van het dagelijks leven.</p></article></section>
      <ClosingCta title="Ook een ruimte maken die echt gebruikt wordt?" />
    </>
  );
}

const articles = [
  { href: "/electriciteit.html", label: "Elektra", title: "Wanneer is een groepenkast aan vernieuwing toe?", text: "Signalen, aandachtspunten en een veilige volgorde voor onderzoek.", image: "/images/electriciteit.webp" },
  { href: "/Binnendeuren_hang_en_sluitwerk.html", label: "Binnendeuren", title: "Klemmen, zakken of rammelen: zo kijkt een vakman naar een deur.", text: "Niet meteen vervangen; eerst oorzaak, beslag en maatvoering controleren.", image: "/images/deuren.webp" },
  { href: "/tilesandgrout.html", label: "Badkamer", title: "Tegelformaat en voegkleur kiezen zonder spijt.", text: "Een rustige methode om vorm, onderhoud en ruimtewerking af te wegen.", image: "/images/project-badkamer.webp" },
];

function ArticleCards() {
  return <div className="article-grid">{articles.map((article) => <a className="article-card" href={article.href} key={article.href}><img src={article.image} alt="" /><div><p>{article.label}</p><h3>{article.title}</h3><span>{article.text}</span><b>Lees verder ↗</b></div></a>)}</div>;
}

function BlogPage() {
  return <><section className="knowledge section-pad"><SectionHeading eyebrow="Uitgelicht" title="Kennis die helpt vóór u beslist." /><ArticleCards /></section><section className="newsletter-strip"><p>Heeft u een praktische bouwvraag?</p><a href="/contact.html">Leg hem aan ons voor ↗</a></section></>;
}

function InstallationBlogPage() {
  return <><section className="knowledge section-pad"><SectionHeading eyebrow="Technische kennis" title="Veiligheid, comfort en onderhoud." /><ArticleCards /></section><ClosingCta title="Techniek in uw woning laten beoordelen?" /></>;
}

function InstallationPage() {
  const services = [["Elektra", "Groepenkasten, aansluitpunten, bekabeling, verlichting en voorbereiding op elektrisch koken of laden."], ["Loodgieterswerk", "Waterleidingen, afvoer, sanitair, kranen en praktische aanpassingen bij renovatie."], ["Klimaat", "Verwarming, vloerverwarming, ventilatie en oplossingen die passen bij het gebruik van de ruimte."], ["Badkamer & keuken", "Techniek, maatvoering en afwerking in één werkvolgorde afgestemd."], ["Dak & afvoer", "Regenwater, dakdetails en aansluitingen die bereikbaar en onderhoudbaar blijven."], ["Storing & herstel", "Gerichte diagnose en duurzaam herstel van een aantoonbare oorzaak."]];
  return <><section className="installation-grid section-pad">{services.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</section><section className="safety-note section-pad"><p className="eyebrow dark">Veilig werken</p><h2>Installaties zijn geen los onderdeel van de verbouwing.</h2><p>We kijken naar belasting, bereikbaarheid, ventilatie, vocht en toekomstige wijzigingen. Zo blijft de techniek niet alleen netjes weggewerkt, maar ook veilig en onderhoudbaar.</p><a className="text-link" href="/installatieblog.html">Lees de technische artikelen <span>↗</span></a></section><ClosingCta title="Een technische vraag of concrete klus?" /></>;
}

function ArticleLayout({ children, updated = "Keuzehulp" }: { children: React.ReactNode; updated?: string }) {
  return <article className="article-layout"><aside><span>{updated}</span><a href="/blog.html">← Terug naar kennisbank</a></aside><div className="article-content">{children}</div></article>;
}

function ElectricityArticle() {
  return <><ArticleLayout><p className="article-lead">Een elektrische installatie hoeft niet zichtbaar oud te zijn om aandacht nodig te hebben. De combinatie van gebruik, uitbreiding en beveiliging bepaalt of het systeem nog bij de woning past.</p><h2>Begin bij de actuele belasting</h2><p>Inductiekoken, warmtepompen, laadpunten en thuiswerken vragen meer en andere groepen dan vroeger. Een goede inventarisatie kijkt daarom niet alleen naar de kast, maar ook naar verbruikers, kabelroutes en beschikbare capaciteit.</p><h2>Signalen om serieus te nemen</h2><ul><li>Regelmatig uitvallende groepen zonder duidelijke oorzaak.</li><li>Warme stopcontacten, verkleuring of een brandlucht.</li><li>Losse contacten, beschadigde isolatie of geïmproviseerde verbindingen.</li><li>Te weinig groepen, waardoor meerdere zware apparaten samen zijn aangesloten.</li></ul><div className="article-callout"><strong>Veiligheid eerst</strong><p>Open een groepenkast niet zelf. Laat twijfel, schade of warmteontwikkeling beoordelen door een vakbekwaam installateur.</p></div><h2>Een logische aanpak</h2><ol><li>Gebruik en toekomstplannen inventariseren.</li><li>Bestaande installatie en beveiligingen controleren.</li><li>Verdeling en kabelroutes ontwerpen.</li><li>Werk uitvoeren, testen en duidelijk documenteren.</li></ol></ArticleLayout><ClosingCta title="Uw elektra laten beoordelen?" /></>;
}

function DoorsArticle() {
  return <><ArticleLayout><p className="article-lead">Een binnendeur die klemt of scheef hangt, vertelt iets over scharnieren, kozijn, beslag of de deur zelf. Goed herstel begint daarom met kijken, meten en pas daarna bijstellen.</p><h2>De oorzaak bepaalt de oplossing</h2><p>Losse schroeven, versleten scharnieren, werking van hout en een verzakt kozijn kunnen hetzelfde symptoom geven. Alleen de deur bijschaven kan dan tijdelijk helpen, maar ook het echte probleem verbergen.</p><h2>Hang- en sluitwerk als systeem</h2><p>Scharnier, loopslot, kruk en sluitplaat moeten samen in één lijn werken. Bij vervanging letten we op draairichting, doornmaat, hartmaat en bestaande uitsparingen. Zo blijft de ingreep beperkt en de afwerking strak.</p><h2>Wanneer vervangen?</h2><ul><li>Als de deur krom of structureel beschadigd is.</li><li>Als meerdere reparaties de constructie hebben verzwakt.</li><li>Als brand-, geluid- of gebruikseisen een ander deurtype vragen.</li></ul><div className="article-callout"><strong>Praktische tip</strong><p>Maak een korte video van het openen en sluiten en fotografeer scharnieren en sluitplaat. Dat helpt om vooraf gerichter mee te denken.</p></div></ArticleLayout><ClosingCta title="Een deur die weer precies moet sluiten?" /></>;
}

function TilesArticle() {
  return <><ArticleLayout><p className="article-lead">Tegels bepalen veel van de sfeer, maar voegen, snijverdeling en aansluitdetails bepalen of het geheel rustig oogt en goed te onderhouden is.</p><h2>Kies vanuit de ruimte</h2><p>Grote tegels kunnen een kleine ruimte rustig maken, mits de maatvoering gunstig uitkomt. Veel smalle passtukken of onlogische voegen doen dat voordeel weer teniet. Laat daarom eerst een tegelplan maken.</p><h2>Voegkleur verandert het ritme</h2><p>Een voeg dicht bij de tegelkleur geeft een gelijkmatig vlak. Contrast benadrukt ieder formaat en iedere afwijking. In intensief gebruikte zones telt daarnaast onderhoud mee: extreem lichte voegen vragen meer aandacht.</p><h2>Techniek onder de afwerking</h2><ul><li>Vlakke, stabiele ondergrond.</li><li>Correcte waterdichting in natte zones.</li><li>Voldoende afschot naar de afvoer.</li><li>Bewegingsvoegen op de juiste plaatsen.</li><li>Kitnaden die bereikbaar blijven voor onderhoud.</li></ul><div className="article-callout"><strong>Bestel niet op exact oppervlak</strong><p>Snijverlies en een kleine reserve horen bij een goed tegelplan. Het benodigde percentage hangt af van formaat, patroon en ruimte.</p></div></ArticleLayout><ClosingCta title="Een badkamerplan technisch laten kloppen?" /></>;
}

function BrochurePage() {
  return <><section className="brochure-intro section-pad"><p>Dit archief behoudt de projectindeling van de eerdere Troos-website. Via oude projectlinks komt u nog steeds bij het juiste onderdeel terecht.</p><a className="button button-dark" href="/contact.html">Vraag naar een vergelijkbaar project <span>↗</span></a></section><section className="projects section-pad"><ProjectGrid items={brochureProjects} archive /></section><ClosingCta /></>;
}

function ThanksPage() {
  return <section className="simple-message section-pad"><span>✓</span><h2>Uw bericht staat klaar.</h2><p>Als uw e-mailprogramma is geopend, hoeft u het bericht alleen nog te verzenden. Liever direct contact? Bel ons gerust.</p><div><a className="button button-dark" href="tel:+31610334563">Bel 06 10 33 45 63</a><a className="text-link" href="/">Terug naar home ↗</a></div></section>;
}

function Legacy404() {
  return <section className="simple-message section-pad"><span>404</span><h2>Waarschijnlijk zoekt u één van deze pagina’s.</h2><p>De website is vernieuwd, maar de belangrijkste informatie en oude paginanamen zijn behouden.</p><div><a className="button button-dark" href="/project.html">Projecten</a><a className="button button-outline" href="/contact.html">Contact</a></div></section>;
}
