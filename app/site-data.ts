export type Project = {
  id: string;
  title: string;
  location: string;
  type: string;
  image: string;
  summary: string;
};

export const projects: Project[] = [
  {
    id: "R1_1",
    title: "Maja’s Hideaway",
    location: "Apeldoorn",
    type: "Recreatiewoning",
    image: "/images/hero.webp",
    summary: "Een lichte houten boswoning waarin interieur, uitzicht en buitenleven als één geheel zijn ontworpen.",
  },
  {
    id: "R4_1",
    title: "Waterside House",
    location: "IJsselmuiden",
    type: "Nieuwbouw",
    image: "/images/project-ijsselmuiden.webp",
    summary: "Compact wonen aan het water, met een robuuste houtgevel en veel daglicht.",
  },
  {
    id: "R3_1",
    title: "Tuinhuis Hanne",
    location: "Amsterdam",
    type: "Maatwerk",
    image: "/images/project-hanne.webp",
    summary: "Een volwaardige extra kamer in het groen, passend bij de schaal van de stadstuin.",
  },
  {
    id: "V4_1",
    title: "Boswoning Epe",
    location: "Epe",
    type: "Renovatie",
    image: "/images/project-epe.webp",
    summary: "Een bestaande recreatiewoning technisch vernieuwd en ruimtelijk teruggebracht tot de essentie.",
  },
  {
    id: "R5_1",
    title: "Tuinkamer Christiaan",
    location: "Amsterdam",
    type: "Tuinhuis",
    image: "/images/project-christiaan.webp",
    summary: "Een beschutte tweede woonkamer die drie seizoenen per jaar wordt gebruikt.",
  },
  {
    id: "V3_1",
    title: "Keukenrenovatie",
    location: "Amsterdam",
    type: "Interieur",
    image: "/images/project-keuken.webp",
    summary: "Slim maatwerk, rustige materialen en installaties die achter de afwerking verdwijnen.",
  },
];

export const brochureProjects: Project[] = [
  ...projects,
  { id: "R2_1", title: "Lukas Hut I", location: "IJsselmuiden", type: "Recreatiewoning", image: "/images/project-ijsselmuiden.webp", summary: "Een compacte woning met een duidelijke relatie tussen water, terras en leefruimte." },
  { id: "R6_1", title: "Recreatiewoning Maarn", location: "Maarn", type: "Renovatie", image: "/images/project-epe.webp", summary: "Een grondige vernieuwing van schil, indeling en afwerking." },
  { id: "V1_1", title: "Dakopbouw", location: "Amsterdam", type: "Uitbreiding", image: "/images/project-hanne.webp", summary: "Extra woonoppervlak met een lichte constructie en zorgvuldige aansluiting op het bestaande huis." },
  { id: "V2_1", title: "Woningrenovatie Mona", location: "Amsterdam", type: "Renovatie", image: "/images/project-keuken.webp", summary: "Een complete begane grond opnieuw georganiseerd rond licht, zicht en gebruiksgemak." },
  { id: "V5_1", title: "Badkamer Galilei", location: "Amsterdam", type: "Badkamer", image: "/images/project-badkamer.webp", summary: "Een compacte badkamer met maatvaste detaillering en een rustige materiaalkeuze." },
  { id: "V6_1", title: "Vloerverwarming", location: "Amsterdam", type: "Installatie", image: "/images/installatie.webp", summary: "Comfortabele lage-temperatuurverwarming zorgvuldig ingepast in een bestaande woning." },
  { id: "V7_1", title: "Stella Maris", location: "Nijmegen", type: "Bootrenovatie", image: "/images/project-christiaan.webp", summary: "Schilderwerk en herstel met aandacht voor ondergrond, duurzaamheid en afwerking." },
  { id: "V8_1", title: "Riolering", location: "Apeldoorn", type: "Installatie", image: "/images/installatie.webp", summary: "Vernieuwde afvoer en aansluitingen, bereikbaar en voorbereid op toekomstig onderhoud." },
  { id: "V9_1", title: "Vlonder", location: "Amsterdam", type: "Buitenruimte", image: "/images/project-hanne.webp", summary: "Een duurzame houten buitenvloer die woning en tuin logisch met elkaar verbindt." },
  { id: "V10_1", title: "Woningrenovatie", location: "Rotterdam", type: "Renovatie", image: "/images/project-keuken.webp", summary: "Techniek, indeling en afwerking in één samenhangende verbouwing vernieuwd." },
  { id: "V11_1", title: "Dakuitbouw", location: "Amstelveen", type: "Uitbreiding", image: "/images/project-epe.webp", summary: "Meer ruimte op de verdieping, met een bouwkundige aansluiting die vanzelfsprekend oogt." },
  { id: "V12_1", title: "Hek & boeiboord", location: "Amsterdam", type: "Gevelwerk", image: "/images/deuren.webp", summary: "Buitenwerk vernieuwd met onderhoudsarme materialen en strakke maatvoering." },
];

export type PageKind =
  | "about"
  | "services"
  | "projects"
  | "benefits"
  | "quote"
  | "team"
  | "testimonials"
  | "blog"
  | "contact"
  | "installation"
  | "installation-blog"
  | "electricity"
  | "doors"
  | "tiles"
  | "brochure"
  | "thanks"
  | "legacy-404";

export type PageDefinition = {
  kind: PageKind;
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
};

const definitions: Record<PageKind, PageDefinition> = {
  about: { kind: "about", title: "Bouwen begint met goed luisteren.", eyebrow: "Over Troos", description: "Een compact bouwteam voor doordachte nieuwbouw, renovatie en maatwerk.", heroImage: "/images/project-christiaan.webp" },
  services: { kind: "services", title: "Van ruwbouw tot de laatste schakelaar.", eyebrow: "Diensten", description: "Eén aanspreekpunt voor bouwkundige werkzaamheden, maatwerk en installatietechniek.", heroImage: "/images/project-keuken.webp" },
  projects: { kind: "projects", title: "Werk dat voor zichzelf spreekt.", eyebrow: "Projecten", description: "Een selectie van recreatiewoningen, renovaties en compacte uitbreidingen.", heroImage: "/images/project-ijsselmuiden.webp" },
  benefits: { kind: "benefits", title: "Rust in een complex bouwproces.", eyebrow: "Waarom Troos", description: "Heldere keuzes, korte lijnen en vakmensen die verantwoordelijkheid nemen.", heroImage: "/images/hero.webp" },
  quote: { kind: "quote", title: "Vertel ons wat u wilt maken.", eyebrow: "Projectaanvraag", description: "Deel uw plannen. We nemen contact op om mogelijkheden, aanpak en een logische volgende stap te bespreken." },
  team: { kind: "team", title: "Klein team. Groot verantwoordelijkheidsgevoel.", eyebrow: "Ons team", description: "Een vaste kern met vertrouwde specialisten voor iedere fase van het werk.", heroImage: "/images/deuren.webp" },
  testimonials: { kind: "testimonials", title: "Gebouwd voor het dagelijks leven.", eyebrow: "Ervaringen", description: "Opdrachtgevers over samenwerken, keuzes maken en het uiteindelijke resultaat.", heroImage: "/images/project-christiaan.webp" },
  blog: { kind: "blog", title: "Praktische kennis voor betere keuzes.", eyebrow: "Kennisbank", description: "Heldere uitleg over renovatie, elektra, deuren, badkamers en materialen.", heroImage: "/images/project-badkamer.webp" },
  contact: { kind: "contact", title: "Zullen we uw plan bespreken?", eyebrow: "Contact", description: "Een goed project begint met een open gesprek over wensen, ruimte, planning en budget." },
  installation: { kind: "installation", title: "Techniek die gewoon goed werkt.", eyebrow: "Installatietechniek", description: "Loodgieterswerk, elektra, klimaat en sanitair zorgvuldig ingepast in uw woning.", heroImage: "/images/installatie.webp" },
  "installation-blog": { kind: "installation-blog", title: "Techniek begrijpelijk uitgelegd.", eyebrow: "Installatieblog", description: "Praktische artikelen voor veilige, comfortabele en toekomstbestendige woningen.", heroImage: "/images/electriciteit.webp" },
  electricity: { kind: "electricity", title: "Veilige elektra begint bij overzicht.", eyebrow: "Gids · Elektra", description: "Waar u op let bij oude bedrading, een groepenkast of een elektrische renovatie.", heroImage: "/images/electriciteit.webp" },
  doors: { kind: "doors", title: "Een deur hoort stil en precies te sluiten.", eyebrow: "Gids · Binnendeuren", description: "Over afhangen, scharnieren, sloten en hang- en sluitwerk zonder onnodige ingrepen.", heroImage: "/images/deuren.webp" },
  tiles: { kind: "tiles", title: "Tegels en voegen: de details bepalen het geheel.", eyebrow: "Gids · Badkamer", description: "Een compacte keuzehulp voor formaat, voegkleur, indeling en onderhoud.", heroImage: "/images/project-badkamer.webp" },
  brochure: { kind: "brochure", title: "Projectarchief.", eyebrow: "Digitale brochure", description: "Nieuwbouw, renovatie, installaties en maatwerk uit het Troos-archief.", heroImage: "/images/hero.webp" },
  thanks: { kind: "thanks", title: "Bedankt voor uw bericht.", eyebrow: "Ontvangen", description: "We nemen zo snel mogelijk contact met u op." },
  "legacy-404": { kind: "legacy-404", title: "Deze pagina is verplaatst.", eyebrow: "404", description: "De nieuwe website staat klaar; via onderstaande links vindt u snel wat u zoekt." },
};

const aliases: Record<string, PageKind> = {
  "about.html": "about", about: "about", "over-ons": "about",
  "service.html": "services", service: "services", diensten: "services",
  "project.html": "projects", project: "projects", projecten: "projects",
  "feature.html": "benefits", feature: "benefits",
  "quote.html": "quote", quote: "quote", offerte: "quote",
  "team.html": "team", team: "team",
  "testimonial.html": "testimonials", "testimonials.html": "testimonials", testimonial: "testimonials", testimonials: "testimonials",
  "blog.html": "blog", blog: "blog",
  "contact.html": "contact", contact: "contact",
  "installatie.html": "installation", installatie: "installation",
  "installatieblog.html": "installation-blog", installatieblog: "installation-blog",
  "electriciteit.html": "electricity", electriciteit: "electricity",
  "binnendeuren_hang_en_sluitwerk.html": "doors", "binnendeuren-hang-en-sluitwerk": "doors",
  "tilesandgrout.html": "tiles", tilesandgrout: "tiles",
  "digibrochure.html": "brochure", digibrochure: "brochure",
  "thankyou.html": "thanks", thankyou: "thanks",
  "404.html": "legacy-404", "404": "legacy-404",
};

export function getPageDefinition(slug: string): PageDefinition | undefined {
  const kind = aliases[decodeURIComponent(slug).toLowerCase()];
  return kind ? definitions[kind] : undefined;
}
