export type ProjectLocale = "nl" | "en";

export type ProjectStory = {
  slug: string;
  title: string;
  type: string;
  location: string;
  intro: string;
  story: string[];
  highlights: string[];
  image: string;
  alt: string;
  gallery: string[];
};

const projects: Record<ProjectLocale, ProjectStory[]> = {
  nl: [
    {
      slug: "badkamer-toilet-amsterdam",
      title: "Badkamer en toilet vernieuwd",
      type: "Badkamerrenovatie",
      location: "Amsterdam",
      intro: "Een compacte badkamer en toiletruimte opnieuw opgebouwd en afgewerkt met contrasterend tegelwerk, sanitair en maatwerkmeubilair.",
      story: [
        "In deze Amsterdamse woning mochten we twee kleine, intensief gebruikte ruimtes opnieuw vormgeven. De wens was helder: meer rust, meer opbergruimte en een interieur dat karakter heeft zonder druk te worden. Daarom kozen we voor een uitgesproken combinatie van blauw en wit, met slimme maatwerkdetails die iedere centimeter benutten.",
        "Achter het zichtwerk is de technische basis volledig nagelopen. Leidingwerk, afvoeren en aansluitingen zijn afgestemd op de nieuwe indeling, waarna de wanden zorgvuldig zijn voorbereid voor het tegelwerk. Door techniek en afwerking in één planning uit te voeren, konden alle lijnen, voegen en aansluitingen netjes op elkaar aansluiten.",
        "Het resultaat is compact maar voelt royaal. Sanitair, meubels en verlichting vormen één geheel en beide ruimtes zijn gemakkelijk schoon te houden. Een dagelijkse plek die nu praktisch werkt én prettig aanvoelt.",
      ],
      highlights: ["Nieuw leidingwerk en sanitair", "Contrasterend tegelplan", "Maatwerk opbergruimte"],
      image: "/projects/badkamer-amsterdam.webp",
      alt: "Gerealiseerde badkamer met blauw en wit tegelwerk in Amsterdam",
      gallery: ["Detail tegelwerk", "Maatwerk wastafelmeubel", "Toiletruimte na oplevering", "Techniek achter de afwerking"],
    },
    {
      slug: "complete-renovatie-amsterdam",
      title: "Wonen met meer licht en ruimte",
      type: "Complete renovatie",
      location: "Amsterdam",
      intro: "Een volledige woningrenovatie waarin indeling, glas, afwerking en technische werkzaamheden als één geheel zijn aangepakt.",
      story: [
        "Deze woning had goede vierkante meters, maar de bestaande indeling liet weinig daglicht door en maakte de leefruimtes kleiner dan nodig. Samen met de bewoners brachten we eerst de dagelijkse routes in kaart: koken, werken, thuiskomen en ontspannen. Van daaruit ontstond een opener plan met lange zichtlijnen en een sterkere verbinding met buiten.",
        "Tijdens de uitvoering kwamen bouwkundige aanpassingen, beglazing en installatiewerk samen. Aansluitpunten werden verplaatst naar de nieuwe indeling en wanden, plafonds en vloeren zijn opnieuw opgebouwd. Iedere fase werd pas gesloten nadat de volgende discipline haar werk had gecontroleerd.",
        "De vernieuwde woning voelt lichter en overzichtelijker, zonder kil te worden. Materialen en kleuren houden de basis rustig, terwijl maatwerk en bestaande details het huis persoonlijk maken. Zo ontstond een thuis dat weer jaren mee kan groeien.",
      ],
      highlights: ["Nieuwe, open indeling", "Meer daglicht en zichtlijnen", "Complete technische afstemming"],
      image: "/projects/renovatie-amsterdam.webp",
      alt: "Lichte uitbouw na een complete renovatie in Amsterdam",
      gallery: ["Nieuwe leefkeuken", "Doorbraak tussen woonruimtes", "Detail van de afwerking", "Situatie tijdens de verbouwing"],
    },
    {
      slug: "complete-renovatie-rotterdam",
      title: "Van woning naar compleet thuis",
      type: "Complete renovatie",
      location: "Rotterdam",
      intro: "Een complete renovatie met een strak afgewerkte trap, maatwerkdetails en vernieuwde woonruimtes.",
      story: [
        "Bij deze Rotterdamse renovatie draaide het niet om één opvallende ingreep, maar om het kloppend maken van het hele huis. De basis was gedateerd en verschillende eerdere aanpassingen sloten niet goed op elkaar aan. We maakten daarom één plan voor de woonruimtes, verkeerszones en afwerking.",
        "De trap kreeg een centrale rol in het interieur en is laag voor laag hersteld en strak afgewerkt. Daaromheen zijn timmerwerk, schilderwerk en technische punten vernieuwd. Kleine overgangen — van plint tot kozijn en van wand tot trede — kregen net zoveel aandacht als de grote vlakken.",
        "Na oplevering oogt de woning rustig en samenhangend. De vernieuwde ruimtes hebben ieder een eigen functie, maar spreken duidelijk dezelfde taal. Het is weer een compleet thuis, met een degelijke basis voor het dagelijks leven.",
      ],
      highlights: ["Traprenovatie", "Maatwerk timmerdetails", "Schilder- en afbouwwerk"],
      image: "/projects/renovatie-rotterdam.webp",
      alt: "Afgewerkte trap na een complete woningrenovatie in Rotterdam",
      gallery: ["Trapdetail na afwerking", "Vernieuwde woonruimte", "Maatwerk bij de entree", "Werk in uitvoering"],
    },
    {
      slug: "tuinhuis-amsterdam",
      title: "Een extra woonkamer in de tuin",
      type: "Tuinhuis",
      location: "Amsterdam",
      intro: "Een tuinhuis met beschutte lounge, elektra en praktische bergruimte, ontworpen voor gebruik in meerdere seizoenen.",
      story: [
        "De bewoners wilden de tuin vaker gebruiken, ook wanneer het weer minder voorspelbaar is. Hun idee was geen standaard berging, maar een echte tweede woonkamer: beschut, warm van uitstraling en tegelijk praktisch genoeg voor fietsen, kussens en tuingereedschap.",
        "We ontwierpen en bouwden een maatwerk tuinhuis met een open lounge en een afgesloten berggedeelte. De constructie, dakopbouw en gevelbekleding zijn afgestemd op langdurig buitengebruik. Elektra en verlichting zijn direct meegenomen, zodat er geen zichtbare noodoplossingen achteraf nodig waren.",
        "Nu vormt het tuinhuis het natuurlijke eindpunt van de tuin. Overdag is het een rustige werk- of leesplek; ’s avonds wordt het een beschutte plek om samen te zitten. De bergruimte houdt de rest van de tuin ondertussen overzichtelijk.",
      ],
      highlights: ["Maatwerk houtbouw", "Geïntegreerde elektra", "Lounge en bergruimte"],
      image: "/projects/tuinhuis-amsterdam.webp",
      alt: "Gerealiseerd tuinhuis met overdekte lounge in Amsterdam",
      gallery: ["Lounge bij avondlicht", "Gevel- en houtdetail", "Afgesloten bergruimte", "Fundering en opbouw"],
    },
    {
      slug: "riolering-apeldoorn",
      title: "Nieuwe aansluiting door bosgrond",
      type: "Riolering",
      location: "Apeldoorn",
      intro: "Een nieuwe rioolaansluiting aangelegd door bosrijke grond, inclusief graafwerk en leidingtracé.",
      story: [
        "Op deze bosrijke locatie moest een betrouwbare rioolaansluiting komen zonder het terrein onnodig te beschadigen. Wortels, hoogteverschillen en bereikbaarheid maakten een standaard recht tracé onmogelijk. Een goede voorbereiding was hier minstens zo belangrijk als het graafwerk zelf.",
        "We bepaalden het leidingverloop op basis van afschot, bestaande begroeiing en toekomstige bereikbaarheid. Daarna is de sleuf gecontroleerd uitgegraven, de leiding aangelegd en iedere verbinding nagekeken. Kwetsbare delen van het terrein bleven zoveel mogelijk buiten de werkzone.",
        "Na controle is de sleuf in lagen aangevuld en het terrein weer verzorgd achtergelaten. De aansluiting ligt uit het zicht, maar is logisch bereikbaar voor onderhoud. Precies het soort project waarbij degelijk werk vooral merkbaar is doordat alles probleemloos functioneert.",
      ],
      highlights: ["Tracé door bosgrond", "Correct afschot en aansluiting", "Zorgvuldig terreinherstel"],
      image: "/projects/riolering-apeldoorn.webp",
      alt: "Aanleg van een rioolaansluiting in Apeldoorn",
      gallery: ["Uitgezet leidingtracé", "Aansluiting en koppelingen", "Sleuf tijdens aanleg", "Terrein na herstel"],
    },
    {
      slug: "vloerverwarming-kampen",
      title: "Comfort vanaf de vloer",
      type: "Vloerverwarming",
      location: "Kampen",
      intro: "Een vloerverwarmingsverdeler en leidingnet aangelegd als basis voor gelijkmatige verwarming van de ruimte.",
      story: [
        "Voor deze ruimte in Kampen zochten de bewoners naar gelijkmatige warmte zonder radiatoren die de indeling beperken. Vloerverwarming bood die vrijheid, maar vroeg om een leidingplan dat goed past bij de ruimte, vloeropbouw en bestaande installatie.",
        "We verdeelden de vloer in logische groepen en legden de leidingen met een gelijkmatige hartafstand. De verdeler kreeg een goed bereikbare positie voor inregeling en toekomstig onderhoud. Voor het dichtzetten zijn de groepen afzonderlijk gevuld, ontlucht en op druk gecontroleerd.",
        "De installatie vormt nu een onzichtbare basis onder de nieuwe vloer. De warmte wordt rustig verdeeld en de wanden blijven vrij voor meubels en gebruik. Techniek die je nauwelijks ziet, maar iedere dag voelt.",
      ],
      highlights: ["Doordacht leidingplan", "Bereikbare verdeler", "Getest vóór vloerafwerking"],
      image: "/projects/vloerverwarming-kampen.webp",
      alt: "Vloerverwarmingsverdeler en leidingwerk in Kampen",
      gallery: ["Leidingpatroon in de ruimte", "Detail van de verdeler", "Druktest voor afwerking", "Vloer gereed voor afwerking"],
    },
  ],
  en: [],
};

const englishCopy: Record<string, Pick<ProjectStory, "title" | "type" | "intro" | "story" | "highlights" | "alt" | "gallery">> = {
  "badkamer-toilet-amsterdam": {
    title: "Bathroom and toilet renewed", type: "Bathroom renovation",
    intro: "A compact bathroom and toilet rebuilt and finished with contrasting tiles, sanitary fittings and bespoke furniture.",
    story: [
      "In this Amsterdam home, two compact rooms used every day needed a fresh start. The brief was clear: create calm, add storage and give the interior character without making it feel busy. A confident blue-and-white palette and carefully fitted details make full use of every centimetre.",
      "Behind the finishes, the complete technical base was reviewed. Pipework, drains and connections were adjusted to the new layout before the walls were prepared for tiling. Keeping installation and finishing within one schedule ensured that lines, joints and fittings all meet cleanly.",
      "The finished rooms are compact yet feel generous. Sanitary ware, furniture and lighting read as one considered whole, while every surface remains easy to maintain. It is now a practical and pleasant part of the daily routine.",
    ],
    highlights: ["New pipework and sanitary ware", "Contrasting tile design", "Bespoke storage"],
    alt: "Completed blue and white tiled bathroom in Amsterdam",
    gallery: ["Tiling detail", "Bespoke vanity unit", "Completed toilet room", "Services behind the finish"],
  },
  "complete-renovatie-amsterdam": {
    title: "More light and living space", type: "Full renovation",
    intro: "A complete home renovation bringing layout, glazing, finishes and technical work together as one project.",
    story: [
      "This home had enough floor space, but its old layout blocked daylight and made the living areas feel smaller than they were. We first mapped how the residents cook, work, arrive home and relax. That became the basis for a more open plan with longer sightlines and a stronger connection to the garden.",
      "Structural changes, glazing and technical installation were coordinated throughout the build. Connections moved with the new layout, while walls, ceilings and floors were rebuilt. Each stage was checked before it was closed, keeping the different trades aligned.",
      "The renewed home feels brighter and easier to navigate without becoming stark. Calm materials form the base, while bespoke and existing details retain its personality. The result is a home ready to adapt for many years.",
    ],
    highlights: ["New open layout", "More daylight and longer views", "Fully coordinated services"],
    alt: "Bright extension after a complete renovation in Amsterdam",
    gallery: ["New kitchen and living space", "Opening between rooms", "Finishing detail", "Work in progress"],
  },
  "complete-renovatie-rotterdam": {
    title: "A complete home transformation", type: "Full renovation",
    intro: "A full renovation with a carefully finished staircase, bespoke details and renewed living spaces.",
    story: [
      "This Rotterdam renovation was less about one statement intervention and more about making the whole home work together. The base was dated and several earlier alterations no longer connected well. We developed one plan for its living spaces, circulation and finishes.",
      "The staircase became a central feature and was restored and refinished layer by layer. Around it, carpentry, paintwork and technical points were renewed. Small transitions—from skirting to frame and wall to tread—received the same attention as the large surfaces.",
      "The completed home feels calm and coherent. Each renewed room has its own role, yet all share the same visual language. It is a complete home again, with a reliable base for everyday life.",
    ],
    highlights: ["Staircase renovation", "Bespoke carpentry details", "Painting and finishing"],
    alt: "Finished staircase after a complete home renovation in Rotterdam",
    gallery: ["Finished staircase detail", "Renewed living space", "Bespoke entrance detail", "Work in progress"],
  },
  "tuinhuis-amsterdam": {
    title: "A second living room in the garden", type: "Garden room",
    intro: "A garden room with a sheltered lounge, electrics and practical storage, designed for use across several seasons.",
    story: [
      "The residents wanted to enjoy their garden more often, even when the weather was unpredictable. Their idea was not a standard shed but a genuine second living room: sheltered and warm in character, with practical space for bicycles, cushions and tools.",
      "We designed and built a bespoke structure with an open lounge and enclosed storage. Its frame, roof build-up and cladding were selected for long-term outdoor use. Electrics and lighting were integrated from the outset, avoiding visible last-minute additions.",
      "The garden room is now the natural destination at the end of the garden. By day it is a quiet place to read or work; in the evening it becomes a sheltered place to sit together. The storage keeps the rest of the garden clear.",
    ],
    highlights: ["Bespoke timber construction", "Integrated electrics", "Lounge and storage"],
    alt: "Completed garden room with covered lounge in Amsterdam",
    gallery: ["Lounge in evening light", "Timber and cladding detail", "Enclosed storage", "Foundation and construction"],
  },
  "riolering-apeldoorn": {
    title: "A new drainage connection", type: "Drainage",
    intro: "A new sewer connection installed through woodland, including excavation and the complete pipe route.",
    story: [
      "This wooded site needed a reliable sewer connection without unnecessary disturbance to the grounds. Roots, level changes and limited access meant a standard straight route was not possible. Careful preparation mattered just as much as the excavation itself.",
      "We set the route around the required fall, existing planting and future access. The trench was excavated in a controlled sequence, the pipe installed and every joint checked. Sensitive parts of the site remained outside the working zone wherever possible.",
      "After inspection, the trench was backfilled in layers and the grounds left tidy. The connection is out of sight but remains logically accessible for maintenance—solid work that is noticed mainly because it functions without fuss.",
    ],
    highlights: ["Route through woodland", "Correct fall and connection", "Careful reinstatement"],
    alt: "Installation of a sewer connection in Apeldoorn",
    gallery: ["Marked pipe route", "Connection and joints", "Trench during installation", "Grounds after reinstatement"],
  },
  "vloerverwarming-kampen": {
    title: "Comfort from the floor up", type: "Underfloor heating",
    intro: "An underfloor-heating manifold and pipe network installed as the basis for evenly distributed warmth.",
    story: [
      "For this space in Kampen, the residents wanted even warmth without radiators restricting the layout. Underfloor heating offered that freedom, but required a pipe plan matched carefully to the room, floor build-up and existing system.",
      "We divided the floor into logical zones and installed the pipe at consistent centres. The manifold sits in an accessible position for balancing and future maintenance. Before the floor was closed, every loop was filled, vented and pressure-tested separately.",
      "The system now forms an invisible base beneath the new floor. Heat is distributed gently and the walls remain free for furniture and daily use: technology that is barely seen, but felt every day.",
    ],
    highlights: ["Considered pipe layout", "Accessible manifold", "Tested before floor finishing"],
    alt: "Underfloor heating manifold and pipework in Kampen",
    gallery: ["Pipe layout across the room", "Manifold detail", "Pressure test before finishing", "Floor ready for its finish"],
  },
};

projects.en = projects.nl.map((project) => ({ ...project, ...englishCopy[project.slug] }));

export const projectsNl = projects.nl;
export const projectsEn = projects.en;

export function findProject(locale: ProjectLocale, slug: string) {
  return projects[locale].find((project) => project.slug === slug);
}
