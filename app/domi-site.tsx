"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { knowledgeArticlesEn, knowledgeArticlesNl } from "./knowledge-data";

type Language = "nl" | "en";

const socials = [
  ["Instagram", "https://instagram.com/troosbouw"],
  ["Facebook", "https://www.facebook.com/people/Troos-Bouw/pfbid02mzgVYbe8DtqCVUW8Gu2NAk5bhdB7QAfE8g1fA43yLXcMGoFjUs2U2zWom1eVh2DUl/"],
  ["Pinterest", "https://nl.pinterest.com/troosbouw/"],
] as const;

const images = {
  hero: "/projects/apeldoorn-hideaway.webp",
  craft: "/projects/tuinhuis-amsterdam.webp",
  bathroom: "/projects/badkamer-amsterdam.webp",
  kitchen: "/projects/renovatie-amsterdam.webp",
  electric: "/projects/renovatie-rotterdam.webp",
  plumbing: "/projects/riolering-apeldoorn.webp",
  tiling: "/projects/vloerverwarming-kampen.webp",
} as const;

const serviceImages = [
  images.electric,
  images.plumbing,
  images.plumbing,
  images.bathroom,
  images.kitchen,
  images.electric,
  images.craft,
  images.tiling,
] as const;

const cabinVideos = [
  { id: "VQybpgshfIs", title: "Gingerbread Huis", start: 0, end: 18 },
  { id: "Z7VTo5eOYlU", title: "Luka's Hut", start: 8, end: 28 },
  { id: "xUzktAPs1ho", title: "Maja's Hideaway", start: 10, end: 30 },
] as const;

const reviewHighlights = {
  nl: [
    ["2e living room", "het is gelukt"],
    ["hard gewerkt", "meegedacht", "blij en tevreden"],
    ["goede materialen", "praktischer en onderhoudsarm", "Precies wat we wensten"],
    ["mooi resultaat", "binnen de afgesproken tijd", "creatieve oplossingen"],
    ["vakkundig werk", "allround"],
    ["denken mee", "flexibel", "vakwerk"],
  ],
  en: [
    ["fantastic work ethic", "straightforward in communication"],
    ["honest and trustworthy"],
    ["great work", "respectful and tidy", "well organised"],
    ["work hard", "useful ideas", "happy and satisfied"],
    ["good materials", "practical, low-maintenance solutions", "Exactly what we wanted"],
    ["flexible", "think along with you", "skilled work"],
  ],
} as const;

const reviewPhotos = {
  nl: [
    { src: images.craft, alt: "Gerealiseerd tuinhuis met overdekte lounge in Amsterdam", label: "Tuinhuis · Amsterdam" },
    { src: images.craft, alt: "Gerealiseerd tiny house met houten buitenruimte", label: "Tiny House · Amsterdam" },
    { src: images.craft, alt: "Onderhoudsarm uitgevoerd tuinhuis", label: "Tuinhuis · Amsterdam" },
    { src: images.hero, alt: "Afgewerkte recreatiewoning tussen de bomen", label: "Recreatiewoning · IJsselmuiden" },
    { src: images.electric, alt: "Afgewerkte woning na een complete renovatie", label: "Complete verbouwing" },
    { src: images.kitchen, alt: "Maatwerk en afwerking in een gerenoveerde woning", label: "Maatwerk bed & kast" },
  ],
  en: [
    { src: images.hero, alt: "Completed recreational home among the trees", label: "Recreational home" },
    { src: images.hero, alt: "Completed recreational home in woodland", label: "Recreational home · Maarn" },
    { src: images.craft, alt: "Completed timber decking and garden room", label: "Decking · Amsterdam" },
    { src: images.craft, alt: "Completed tiny house with timber exterior", label: "Tiny House · Amsterdam" },
    { src: images.craft, alt: "Low-maintenance completed garden room", label: "Garden room · Amsterdam" },
    { src: images.kitchen, alt: "Bespoke joinery in a renovated home", label: "Bespoke bed & wardrobe" },
  ],
} as const;

const reviewProjectSlugs = [
  "tuinhuis-amsterdam",
  "tuinhuis-amsterdam",
  "tuinhuis-amsterdam",
  "tuinhuis-amsterdam",
  "complete-renovatie-rotterdam",
  "complete-renovatie-amsterdam",
] as const;

const projectArchive = "https://github.com/MaartenDominicus/TroosCom";
const imageSources = {
  hero: projectArchive,
  craft: projectArchive,
  bathroom: projectArchive,
  kitchen: projectArchive,
  electric: projectArchive,
  plumbing: projectArchive,
  tiling: projectArchive,
} as const;

const content = {
  nl: {
    skip: "Direct naar de inhoud",
    navLabel: "Hoofdnavigatie",
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
    language: "Selecteer taal",
    nav: [
      ["Over ons", "#over"], ["Diensten", "#diensten"], ["Projecten", "#projecten"],
      ["Reviews", "#reviews"], ["Kennis", "#kennis"], ["Contact", "#contact"],
    ],
    quote: "Offerte aanvragen",
    hero: {
      eyebrow: "Heel Nederland · Bouwen · Installeren · Afwerken",
      titleTop: "Eén vakteam.", titleAccent: "Uw hele project.",
      text: "Van elektra, water en verwarming tot badkamers, verbouwingen en de laatste afwerking. Domi Installatie brengt alle werkzaamheden samen in één helder plan.",
      primary: "Bespreek uw project", secondary: "Bekijk ons werk",
      proofTitle: "Alles in één lijn.", proofText: "Eigen projecten, heldere afspraken en één aanspreekpunt.",
      alt: "Door het team gerealiseerde recreatiewoning in de Veluwe",
    },
    ticker: ["Breed inzetbaar", "Korte lijnen", "Heldere afspraken", "Netjes opgeleverd"],
    about: {
      eyebrow: "Over Domi", title: "Alles komt samen bij Domi.",
      lead: "Bouwkundige kennis, installatietechniek en een scherp oog voor afwerking — bij Domi vindt u het onder één dak.",
      body: "Daardoor hoeft u niet voor iedere stap een andere partij te regelen. We denken praktisch mee, stemmen werkzaamheden goed op elkaar af en houden u tijdens het project op de hoogte. Van Amsterdam en Rotterdam tot Apeldoorn, Kampen en de Veluwe: het projectarchief laat uiteenlopende verbouwingen, installaties en maatwerk zien.",
      detail: "Eén aanspreekpunt. Minder losse schakels. Meer grip op het resultaat.",
      imageAlt: "Gerealiseerd tuinhuis met overdekte lounge in Amsterdam",
    },
    services: {
      eyebrow: "Onze vakgebieden", title: "Vakwerk voor iedere fase.",
      intro: "Van de eerste aansluiting tot de laatste afwerking: één aanspreekpunt en werkzaamheden die logisch op elkaar aansluiten.",
      more: "Meer info", close: "Vakgebied sluiten", overlayLabel: "Vakgebied",
      approachTitle: "Zo pakken we het aan",
      approach: "We beginnen met een heldere opname van de situatie, stemmen techniek en afwerking op elkaar af en spreken vooraf af wat er gebeurt. Zo blijft de uitvoering overzichtelijk en voorkomt u verrassingen tussen verschillende werkzaamheden.",
      contactTitle: "Uw situatie bespreken",
      contact: "Geen woning, ruimte of installatie is hetzelfde. Vertel ons wat u wilt verbeteren; dan bekijken we welke aanpak logisch is en welke werkzaamheden slim gecombineerd kunnen worden.",
      items: [
        ["Elektra & verlichting", "Veilige, praktische aansluitingen en verlichting.", "Van extra groepen en stopcontacten tot binnen- en buitenverlichting. We bekijken belasting, kabelroutes en toekomstig gebruik als één geheel."],
        ["Water & sanitair", "Leidingwerk en sanitair, zorgvuldig aangesloten.", "We plaatsen en verleggen leidingen, kranen, toiletten en aansluitingen en zoeken lekkages gericht op voordat herstelwerk begint."],
        ["Verwarming", "Comfortabele warmte met logisch leidingwerk.", "Radiatoren, leidingaanpassingen en het verbeteren van de warmteverdeling worden afgestemd op de ruimte en de bestaande installatie."],
        ["Badkamers & toiletten", "Complete ruimtes, technisch én strak afgewerkt.", "Eén plan voor leidingwerk, elektra, tegelwerk, sanitair, montage en kitwerk voorkomt losse schakels tijdens de verbouwing."],
        ["Renovatie & verbouwing", "Van nieuwe indeling tot gebruiksklare oplevering.", "We combineren bouwkundige aanpassingen met installatiewerk en afwerking, zodat de verschillende fases goed op elkaar aansluiten."],
        ["Tegel-, stuc- & schilderwerk", "Strakke ondergronden en een verzorgde finish.", "We beoordelen de ondergrond, herstellen waar nodig en werken wanden, vloeren en plafonds netjes en passend bij het gebruik af."],
        ["Timmerwerk & montage", "Maatwerk en montage tot in het detail.", "Van aftimmering en ombouwen tot deuren, plinten en praktische interieuroplossingen die precies op de beschikbare ruimte aansluiten."],
        ["Onderhoud & reparaties", "Gericht herstel voor woning en bedrijfspand.", "We pakken kleine én grotere gebreken aan, combineren werkzaamheden waar dat slim is en laten de plek veilig en verzorgd achter."],
      ],
    },
    process: {
      eyebrow: "Onze werkwijze", title: "Helder van eerste gesprek tot oplevering.",
      items: [
        ["Kennismaken", "We bespreken uw wensen en bekijken wat er nodig is."],
        ["Helder voorstel", "U krijgt inzicht in aanpak, werkzaamheden en planning."],
        ["Vakkundige uitvoering", "We stemmen de verschillende vakgebieden zorgvuldig op elkaar af."],
        ["Nette oplevering", "We lopen het resultaat samen na en laten de werkplek verzorgd achter."],
      ],
    },
    projects: {
      eyebrow: "Projecten", title: "Verschillende vragen. Eén hoge standaard.",
      intro: "Een selectie uit het eigen projectarchief: van complete renovaties en badkamers tot vloerverwarming, riolering en maatwerk buitenruimtes.",
      placeholder: "Eigen project",
      open: "Bekijk project", close: "Project sluiten", overlayLabel: "Project",
      coordinationTitle: "Werkzaamheden in samenhang",
      coordination: "Bij deze projecten zijn bouwkundige werkzaamheden, installatie en afwerking in samenhang uitgevoerd. De projectfoto’s en locaties komen uit het eigen openbare projectarchief.",
      resultTitle: "Zorgvuldig opgeleverd",
      result: "Details, aansluitingen en afwerking zijn gezamenlijk nagelopen. Het resultaat is gebruiksklaar, praktisch in dagelijks gebruik en voorbereid op de toekomst.",
      items: [
        { slug: "badkamer-toilet-amsterdam", title: "Badkamer en toilet vernieuwd", type: "Badkamerrenovatie · Amsterdam", text: "Een compacte badkamer en toiletruimte opnieuw opgebouwd en afgewerkt met contrasterend tegelwerk, sanitair en maatwerkmeubilair.", tags: ["Sanitair", "Tegelwerk", "Afwerking"], image: images.bathroom, source: projectArchive, alt: "Gerealiseerde badkamer met blauw en wit tegelwerk in Amsterdam" },
        { slug: "complete-renovatie-amsterdam", title: "Wonen met meer licht en ruimte", type: "Complete renovatie · Amsterdam", text: "Een volledige woningrenovatie waarin indeling, glas, afwerking en technische werkzaamheden als één geheel zijn aangepakt.", tags: ["Renovatie", "Glas", "Afwerking"], image: images.kitchen, source: projectArchive, alt: "Lichte uitbouw na een complete renovatie in Amsterdam" },
        { slug: "complete-renovatie-rotterdam", title: "Van woning naar compleet thuis", type: "Complete renovatie · Rotterdam", text: "Een complete renovatie met een strak afgewerkte trap, maatwerkdetails en vernieuwde woonruimtes.", tags: ["Renovatie", "Timmerwerk", "Schilderwerk"], image: images.electric, source: projectArchive, alt: "Afgewerkte trap na een complete woningrenovatie in Rotterdam" },
        { slug: "tuinhuis-amsterdam", title: "Een extra woonkamer in de tuin", type: "Tuinhuis · Amsterdam", text: "Een tuinhuis met beschutte lounge, elektra en praktische bergruimte, ontworpen voor gebruik in meerdere seizoenen.", tags: ["Tuinhuis", "Elektra", "Maatwerk"], image: images.craft, source: projectArchive, alt: "Gerealiseerd tuinhuis met overdekte lounge in Amsterdam" },
        { slug: "riolering-apeldoorn", title: "Nieuwe aansluiting door bosgrond", type: "Riolering · Apeldoorn", text: "Een nieuwe rioolaansluiting aangelegd door bosrijke grond, inclusief graafwerk en leidingtracé.", tags: ["Riolering", "Grondwerk", "Installatie"], image: images.plumbing, source: projectArchive, alt: "Aanleg van een rioolaansluiting in Apeldoorn" },
        { slug: "vloerverwarming-kampen", title: "Comfort vanaf de vloer", type: "Vloerverwarming · Kampen", text: "Een vloerverwarmingsverdeler en leidingnet aangelegd als basis voor gelijkmatige verwarming van de ruimte.", tags: ["Verwarming", "Leidingwerk", "Installatie"], image: images.tiling, source: projectArchive, alt: "Vloerverwarmingsverdeler en leidingwerk in Kampen" },
      ],
    },
    reviews: {
      eyebrow: "Reviews", title: "Goed werk merkt u aan het resultaat én aan de samenwerking.",
      note: "Klantreacties uit het openbare Troos Bouw-projectarchief.",
      label: "Klantreactie", pause: "Pauzeer", play: "Afspelen", previous: "Vorige review", next: "Volgende review",
      items: [
        ["“Eindelijk een 2e living room. De plaatjes spreken voor zich; heel leuk om gezamenlijk tijdens een bouwproject alles zo te krijgen hoe je het wilt. En ja, nadat het klaar is kan ik volmondig zeggen: het is gelukt!”", "Christiaan · Tuinhuis Amsterdam"],
        ["“Er wordt hard gewerkt en heel fijn dat er inhoudelijk wordt meegedacht over het bouwproject. We zijn ontzettend blij en tevreden met het tuinhuisje!”", "Robin · Tiny House Amsterdam"],
        ["“Ze gebruiken goede materialen en komen met prima oplossingen om de constructie praktischer en onderhoudsarm te maken. Precies wat we wensten. Dank!”", "Hans · Tuinhuis"],
        ["“De bouw van onze prachtige cabin heeft onder leiding van Troos tot een mooi resultaat geleid, binnen de afgesproken tijd. Troos dacht goed mee en kwam met creatieve oplossingen.”", "Mirjam · Recreatiewoning IJsselmuiden"],
        ["“Troos levert goed en vakkundig werk voor een goede prijs. Ik vond het erg fijn dat ze allround zijn: elektra, stucwerk, tegelzetten, schilderen, timmer- en loodgieterswerk.”", "Mona · Volledige verbouwing"],
        ["“Troos heeft van een inimini washok een prachtige kinderkamer ontworpen en gebouwd. Ze denken mee, zijn flexibel en leveren vakwerk in een snelle tijd.”", "Maria · Maatwerk bed en kast"],
      ],
    },
    featured: {
      eyebrow: "Werkgebied", title: "Actief door heel Nederland",
      note: "Projecten in onder meer Amsterdam, Apeldoorn, de Veluwe, Kampen, Rotterdam en IJsselmuiden.",
      items: ["Amsterdam", "Apeldoorn", "Veluwe", "Kampen", "Rotterdam", "IJsselmuiden"],
      placeholder: "Projectlocatie",
    },
    knowledge: {
      eyebrow: "Blog & kennis", title: "Praktische kennis vóór u beslist.",
      intro: "Heldere uitleg uit de praktijk over planning, techniek en keuzes die later het verschil maken.",
      read: "Lees artikel", close: "Artikel sluiten", scrollClose: "Scroll verder om artikel te sluiten",
      items: [
        { category: "Badkamer · 5 min", title: "Badkamer verbouwen: zo voorkomt u verrassingen", text: "Een goede volgorde van keuzes en werkzaamheden bespaart tijd, herstelwerk en onnodige kosten.", body: ["Een badkamerrenovatie begint niet bij de tegel of kraan, maar bij een nauwkeurige opname. Leg eerst de maatvoering, bestaande leidingroutes, ventilatie en elektrische aansluitingen vast. Daarmee wordt snel duidelijk welke wensen direct uitvoerbaar zijn en waar een technische aanpassing nodig is.", "Bepaal daarna de positie en afmetingen van douche, toilet, wastafel en eventuele meubels. Pas wanneer die indeling vaststaat, kunnen water, afvoer, elektra en verlichting als één plan worden uitgewerkt. Zo voorkomt u dat een aansluiting later achter een meubel uitkomt of dat tegelwerk opnieuw moet worden geopend.", "Ook de ondergrond verdient aandacht. Controleer vloeren en wanden op vocht, vlakheid en draagkracht en reserveer voldoende tijd voor herstel, afdichting en droging. Een strakke planning bevat daarom niet alleen werkdagen, maar ook bewuste momenten waarop materialen moeten uitharden.", "Maak tot slot vóór de start afspraken over materiaalkeuzes, details, bereikbaarheid en oplevering. Loop het werk samen na voordat de laatste kitnaden worden aangebracht. Met die volgorde sluiten techniek en afwerking beter op elkaar aan en blijft het resultaat ook op langere termijn betrouwbaar."], image: images.tiling, source: imageSources.tiling, alt: "Sfeerbeeld van tegelwerk tijdens een renovatie" },
        { category: "Elektra · 4 min", title: "Extra stopcontacten of een nieuwe groep: wat is verstandig?", text: "Waar u op let wanneer uw woning meer apparatuur en aansluitpunten krijgt.", body: ["Een extra stopcontact lijkt een kleine ingreep, maar de juiste oplossing begint bij de volledige installatie. Kijk naar de belasting van de bestaande groep, de staat van de groepenkast en de apparaten die nu én later op dezelfde stroomkring worden gebruikt.", "Zware apparaten zoals een oven, kookplaat, wasdroger of laadvoorziening vragen vaak een eigen groep. Ook de kabelroute is belangrijk: een korte zichtbare oplossing is niet altijd de veiligste of meest toekomstbestendige route. Door dit vooraf uit te tekenen blijven hak- en herstelwerk beperkt.", "Denk daarnaast aan dagelijks gebruik. Plaats aansluitpunten niet alleen waar meubels nu staan, maar houd rekening met een andere indeling, thuiswerken en aanvullende verlichting. In keuken, badkamer en buiten gelden extra eisen voor positie, bescherming en materiaalkeuze.", "Laat uitbreidingen altijd beoordelen, aansluiten en testen door iemand met de juiste vakkennis. Na de werkzaamheden horen de beveiliging, aarding en werking gecontroleerd te worden. Zo krijgt u niet alleen meer aansluitpunten, maar vooral een installatie die logisch en veilig blijft functioneren."], image: images.electric, source: imageSources.electric, alt: "Sfeerbeeld van veilig werk aan een elektrische installatie" },
        { category: "Verbouwen · 6 min", title: "Verbouwen terwijl u thuis blijft wonen", text: "Zeven praktische afspraken die stof, hinder en misverstanden tijdens het werk beperken.", body: ["Thuis blijven wonen tijdens een verbouwing kan goed, zolang de planning ook rekening houdt met het dagelijks leven. Bespreek vooraf welke ruimtes wanneer beschikbaar moeten zijn en maak één duidelijke looproute voor bewoners, materialen en afval.", "Leg werktijden, sleutelbeheer en momenten waarop water of stroom wordt afgesloten vast. Een korte melding vooraf voorkomt dat een online vergadering, maaltijd of schooldag onverwacht wordt onderbroken. Deel de planning per week en benoem direct wanneer werkzaamheden van elkaar afhankelijk zijn.", "Stofbeheersing vraagt meer dan een afdekfolie. Sluit werkzones af, bescherm vloeren, spreek dagelijkse schoonmaak af en houd minimaal één ruimte volledig stofvrij. Bepaal ook waar gereedschap en materialen veilig kunnen blijven staan zonder de woning onnodig vol te zetten.", "Wijzigingen ontstaan bijna altijd. Spreek daarom af wie beslissingen neemt, hoe meerwerk wordt bevestigd en wat een wijziging voor de planning betekent. Met één aanspreekpunt en een kort dagelijks overleg blijven bewoners en vakmensen op de hoogte en kan de woning tijdens het werk zo prettig mogelijk gebruikt worden."], image: images.plumbing, source: imageSources.plumbing, alt: "Sfeerbeeld van installatiewerk in een woning" },
      ],
    },
    contact: {
      eyebrow: "Contact", title: "Een plan, klus of verbouwing in gedachten?",
      text: "Vertel ons kort wat u wilt laten uitvoeren. We bekijken de mogelijkheden en nemen contact met u op over een passende vervolgstap.",
      benefits: ["Actief door heel Nederland", "Maandag–vrijdag van 9:00–18:00", "Eén aanspreekpunt voor meerdere vakgebieden"],
      formTitle: "Vertel ons over uw project",
      name: "Naam", email: "E-mailadres", phone: "Telefoonnummer (optioneel)", location: "Postcode en plaats",
      type: "Type project", typePrompt: "Maak een keuze", typeOptions: ["Renovatie of verbouwing", "Elektra", "Water of sanitair", "Badkamer of toilet", "Timmer- of afbouwwerk", "Onderhoud of reparatie", "Anders"],
      timing: "Gewenste startperiode", message: "Uw vraag of plan", messagePlaceholder: "Vertel kort wat er moet gebeuren, waar en wanneer.",
      consent: "Ik ga akkoord met het verwerken van mijn gegevens voor deze aanvraag.", submit: "Verstuur aanvraag",
      demo: "Uw aanvraag wordt veilig doorgestuurd naar troosbouw@gmail.com.",
      success: "Bedankt voor uw aanvraag.",
    },
    footer: {
      line: "Bouw, techniek en afwerking onder één dak.", navigation: "Navigatie", contact: "Contact",
      contactLine: "troosbouw@gmail.com · 06 10 98 30 85 · ma–vr 9:00–18:00", closing: "Met aandacht gemaakt. Netjes opgeleverd.",
      imageCredit: "Eigen projectarchief", social: "Volg ons", socialNote: "Bekijk actuele projecten en werk in uitvoering.",
    },
  },
  en: {
    skip: "Skip to content",
    navLabel: "Main navigation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Select language",
    nav: [
      ["About", "#over"], ["Services", "#diensten"], ["Projects", "#projecten"],
      ["Reviews", "#reviews"], ["Insights", "#kennis"], ["Contact", "#contact"],
    ],
    quote: "Request a quote",
    hero: {
      eyebrow: "Throughout the Netherlands · Build · Install · Finish",
      titleTop: "One skilled team.", titleAccent: "Your entire project.",
      text: "From electrical, plumbing and heating work to bathrooms, renovations and the finishing touches. Domi Installatie brings every part of the job together in one clear plan.",
      primary: "Discuss your project", secondary: "View our work",
      proofTitle: "Everything aligned.", proofText: "Real projects, clear agreements and one point of contact.",
      alt: "Recreational home completed by the team in the Veluwe",
    },
    ticker: ["Versatile expertise", "Direct communication", "Clear agreements", "Careful completion"],
    about: {
      eyebrow: "About Domi", title: "Everything comes together at Domi.",
      lead: "Construction expertise, technical installations and a sharp eye for finishing — all available from one team.",
      body: "You do not need to coordinate a different contractor for every stage. We think practically, align the work carefully and keep you informed. The project archive covers renovation, installation and bespoke work in Amsterdam, Rotterdam, Apeldoorn, Kampen and the Veluwe.",
      detail: "One point of contact. Fewer loose ends. More control over the result.",
      imageAlt: "Completed garden room with covered lounge in Amsterdam",
    },
    services: {
      eyebrow: "Our expertise", title: "Skilled work at every stage.",
      intro: "From the first connection to the final finish: one point of contact and work that fits together seamlessly.",
      more: "More information", close: "Close expertise", overlayLabel: "Expertise",
      approachTitle: "How we approach it",
      approach: "We begin with a clear assessment of the situation, coordinate technical work and finishing, and agree on the scope before work starts. This keeps the project manageable and prevents surprises between different stages.",
      contactTitle: "Discuss your situation",
      contact: "No home, room or installation is identical. Tell us what you would like to improve and we will assess the most logical approach and which activities can be combined efficiently.",
      items: [
        ["Electrical & lighting", "Safe, practical connections and lighting.", "From additional circuits and outlets to indoor and outdoor lighting. We consider load, cable routes and future use as one complete system."],
        ["Plumbing & sanitary systems", "Pipework and fittings, carefully connected.", "We install and relocate pipework, taps, toilets and connections, and trace leaks accurately before repair work begins."],
        ["Heating", "Comfortable heat with logical pipework.", "Radiators, pipe alterations and improvements to heat distribution are coordinated with the room and the existing installation."],
        ["Bathrooms & toilets", "Complete rooms, technically sound and neatly finished.", "One plan for plumbing, electrics, tiling, fittings, installation and sealing avoids disconnected stages during the renovation."],
        ["Renovation & remodelling", "From a new layout to ready-to-use completion.", "We combine construction changes with installation work and finishing so every phase connects properly to the next."],
        ["Tiling, plastering & painting", "Clean substrates and a polished finish.", "We assess and repair the substrate where necessary, then finish walls, floors and ceilings to suit how the space will be used."],
        ["Carpentry & installation", "Bespoke work and installation down to the detail.", "From boxing and finish carpentry to doors, skirting and practical interior solutions made to fit the available space."],
        ["Maintenance & repairs", "Focused repairs for homes and commercial property.", "We handle both small and larger defects, combine tasks where practical and leave the area safe, tidy and ready to use."],
      ],
    },
    process: {
      eyebrow: "Our process", title: "Clear from first conversation to handover.",
      items: [
        ["Introduction", "We discuss your plans and assess what is needed."],
        ["Clear proposal", "You receive a clear overview of the approach, work and schedule."],
        ["Skilled execution", "We coordinate the different trades with care."],
        ["Careful handover", "We review the result together and leave the workspace tidy."],
      ],
    },
    projects: {
      eyebrow: "Projects", title: "Different needs. One high standard.",
      intro: "A selection from the company project archive, ranging from full renovations and bathrooms to underfloor heating, drainage and bespoke outdoor spaces.",
      placeholder: "Completed project",
      open: "View project", close: "Close project", overlayLabel: "Project",
      coordinationTitle: "Work carried out as one plan",
      coordination: "Construction alterations, technical installations and finishing were delivered through one coordinated schedule. Each phase connected directly to the next, with one clear point of contact throughout the work.",
      resultTitle: "Carefully completed",
      result: "Details, connections and finishes were reviewed together. The result is ready to use, practical in everyday life and prepared for future needs.",
      items: [
        { slug: "badkamer-toilet-amsterdam", title: "Bathroom and toilet renewed", type: "Bathroom renovation · Amsterdam", text: "A compact bathroom and toilet rebuilt and finished with contrasting tiles, sanitary fittings and bespoke furniture.", tags: ["Plumbing", "Tiling", "Finishing"], image: images.bathroom, source: projectArchive, alt: "Completed blue and white tiled bathroom in Amsterdam" },
        { slug: "complete-renovatie-amsterdam", title: "More light and living space", type: "Full renovation · Amsterdam", text: "A complete home renovation bringing layout, glazing, finishing and technical work together.", tags: ["Renovation", "Glazing", "Finishing"], image: images.kitchen, source: projectArchive, alt: "Bright extension after a complete renovation in Amsterdam" },
        { slug: "complete-renovatie-rotterdam", title: "A complete home transformation", type: "Full renovation · Rotterdam", text: "A full renovation with a carefully finished staircase, bespoke details and renewed living spaces.", tags: ["Renovation", "Carpentry", "Painting"], image: images.electric, source: projectArchive, alt: "Finished staircase after a complete home renovation in Rotterdam" },
        { slug: "tuinhuis-amsterdam", title: "A second living room in the garden", type: "Garden room · Amsterdam", text: "A garden room with a sheltered lounge, electrics and practical storage, designed for use across several seasons.", tags: ["Garden room", "Electrical", "Bespoke"], image: images.craft, source: projectArchive, alt: "Completed garden room with covered lounge in Amsterdam" },
        { slug: "riolering-apeldoorn", title: "A new drainage connection", type: "Drainage · Apeldoorn", text: "A new sewer connection installed through woodland, including excavation and the full pipe route.", tags: ["Drainage", "Groundwork", "Installation"], image: images.plumbing, source: projectArchive, alt: "Installation of a sewer connection in Apeldoorn" },
        { slug: "vloerverwarming-kampen", title: "Comfort from the floor up", type: "Underfloor heating · Kampen", text: "An underfloor heating manifold and pipe network installed as the basis for evenly distributed heat.", tags: ["Heating", "Pipework", "Installation"], image: images.tiling, source: projectArchive, alt: "Underfloor heating manifold and pipework in Kampen" },
      ],
    },
    reviews: {
      eyebrow: "Reviews", title: "Good work shows in both the result and the experience.",
      note: "Customer feedback from the public Troos Bouw project archive.",
      label: "Customer review", pause: "Pause", play: "Play", previous: "Previous review", next: "Next review",
      items: [
        ["“Troos has worked with me on multiple projects over the last decade. They have a fantastic work ethic and are straightforward in communication.”", "Lucinda · Recreational home"],
        ["“We felt really lucky to have found Troos. Someone honest and trustworthy is so rare.”", "Tijmen · Recreational home Maarn"],
        ["“I wanted to thank you for the great work. The ladies said you were very respectful and tidy. I really appreciate that you were so well organised and made it all happen.”", "Lizette · Decking Amsterdam"],
        ["“They work hard and offer very useful ideas about the project. We are incredibly happy and satisfied with the garden room.”", "Robin · Tiny House Amsterdam · translated"],
        ["“They use good materials and offer practical, low-maintenance solutions. Exactly what we wanted.”", "Hans · Garden room · translated"],
        ["“They are flexible, think along with you and deliver skilled work quickly.”", "Maria · Bespoke bed and wardrobe · translated"],
      ],
    },
    featured: {
      eyebrow: "Service area", title: "Working throughout the Netherlands",
      note: "Projects in Amsterdam, Apeldoorn, the Veluwe, Kampen, Rotterdam and IJsselmuiden, among other locations.",
      items: ["Amsterdam", "Apeldoorn", "Veluwe", "Kampen", "Rotterdam", "IJsselmuiden"],
      placeholder: "Project location",
    },
    knowledge: {
      eyebrow: "Blog & insights", title: "Practical knowledge before you decide.",
      intro: "Clear advice from the field about planning, technical work and choices that make a difference later.",
      read: "Read article", close: "Close article", scrollClose: "Scroll further to close the article",
      items: [
        { category: "Bathroom · 5 min", title: "Renovating a bathroom: how to avoid surprises", text: "Making decisions and scheduling work in the right order prevents delays, rework and unnecessary costs.", body: ["A bathroom renovation does not start with a tile or tap, but with an accurate survey. First record dimensions, existing pipe routes, ventilation and electrical connections. This quickly shows which ideas are immediately practical and where technical alterations are needed.", "Next, determine the position and dimensions of the shower, toilet, basin and furniture. Only once the layout is fixed can plumbing, drainage, electrics and lighting be developed as one plan. This prevents an outlet ending up behind furniture or finished tiling having to be opened again.", "The substrate also deserves attention. Check floors and walls for moisture, level and load-bearing strength, and allow enough time for repair, waterproofing and drying. A realistic schedule includes not only working days but deliberate curing time for materials.", "Finally, agree on materials, details, access and handover before work starts. Review the installation together before the final sealant is applied. Following this sequence helps technical work and finishing align and keeps the result dependable over time."], image: images.tiling, source: imageSources.tiling, alt: "Atmospheric image of tiling work during a renovation" },
        { category: "Electrical · 4 min", title: "Extra outlets or a new circuit: what makes sense?", text: "What to consider when your home needs more electrical equipment and connection points.", body: ["An extra outlet may seem like a small alteration, but the right solution starts with the entire installation. Consider the load on the existing circuit, the condition of the distribution board and the appliances that will use that circuit now and in the future.", "Heavy appliances such as an oven, hob, tumble dryer or charging point often require a dedicated circuit. The cable route matters too: the shortest visible route is not always the safest or most future-proof option. Planning it first can limit cutting and repair work.", "Also think about daily use. Position outlets not only around the current furniture but allow for another layout, home working and additional lighting. Kitchens, bathrooms and outdoor areas have extra requirements for location, protection and material selection.", "Have extensions assessed, connected and tested by someone with the right expertise. Protection, earthing and operation should be checked after the work. This gives you more connection points while keeping the installation logical and safe."], image: images.electric, source: imageSources.electric, alt: "Atmospheric image of safe work on an electrical installation" },
        { category: "Renovation · 6 min", title: "Renovating while continuing to live at home", text: "Seven practical agreements that help reduce dust, disruption and misunderstandings during the work.", body: ["Living at home during a renovation can work well when the schedule also accounts for daily life. Agree in advance which rooms need to remain available and establish one clear route for residents, materials and waste.", "Record working hours, key management and moments when water or power will be shut off. A brief warning prevents an online meeting, meal or school day from being interrupted unexpectedly. Share the schedule by week and identify dependencies between trades.", "Dust control requires more than protective film. Seal work zones, protect floors, agree on daily cleaning and keep at least one room completely dust-free. Also decide where tools and materials can be stored safely without filling the home unnecessarily.", "Changes are almost inevitable. Agree who makes decisions, how additional work is approved and what a change means for the schedule. With one point of contact and a short daily update, residents and tradespeople stay informed and the home remains as usable as possible."], image: images.plumbing, source: imageSources.plumbing, alt: "Atmospheric image of installation work in a home" },
      ],
    },
    contact: {
      eyebrow: "Contact", title: "Have a project, repair or renovation in mind?",
      text: "Tell us briefly what you would like to have done. We will review the possibilities and contact you to discuss a suitable next step.",
      benefits: ["Working throughout the Netherlands", "Monday–Friday, 9:00–18:00", "One point of contact across multiple trades"],
      formTitle: "Tell us about your project",
      name: "Name", email: "Email address", phone: "Phone number (optional)", location: "Postcode and city",
      type: "Project type", typePrompt: "Select an option", typeOptions: ["Renovation or remodelling", "Electrical", "Plumbing or sanitary", "Bathroom or toilet", "Carpentry or finishing", "Maintenance or repair", "Other"],
      timing: "Preferred start period", message: "Your question or plan", messagePlaceholder: "Briefly describe what needs doing, where and when.",
      consent: "I agree to my details being processed for this enquiry.", submit: "Submit enquiry",
      demo: "Your enquiry is securely forwarded to troosbouw@gmail.com.",
      success: "Thank you for your enquiry.",
    },
    footer: {
      line: "Construction, technical work and finishing under one roof.", navigation: "Navigation", contact: "Contact",
      contactLine: "troosbouw@gmail.com · +31 6 10 98 30 85 · Mon–Fri 9:00–18:00", closing: "Built with care. Finished properly.",
      imageCredit: "Company project archive", social: "Follow us", socialNote: "See current projects and work in progress.",
    },
  },
} as const;

export default function DomiSite({ initialLanguage = "nl" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewCursor, setReviewCursor] = useState(content.nl.reviews.items.length);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [reviewsHovered, setReviewsHovered] = useState(false);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const [typedServiceDetail, setTypedServiceDetail] = useState("");
  const [closingServiceIndex, setClosingServiceIndex] = useState<number | null>(null);
  const [activeServiceDetailIndex, setActiveServiceDetailIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const [activeArticleIndex, setActiveArticleIndex] = useState<number | null>(null);
  const [articleExitVisible, setArticleExitVisible] = useState(false);
  const [activeCabinVideoIndex, setActiveCabinVideoIndex] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const reviewShowcaseRef = useRef<HTMLDivElement>(null);
  const reviewNavigationRef = useRef<HTMLDivElement>(null);
  const reviewViewportRef = useRef<HTMLDivElement>(null);
  const reviewCarouselReady = useRef(false);
  const articleReaderRef = useRef<HTMLDivElement>(null);
  const articleExitRef = useRef<HTMLDivElement>(null);
  const articleCloseRef = useRef<HTMLButtonElement>(null);
  const articleTriggerRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const lastArticleScrollTop = useRef(0);
  const articleOriginScrollY = useRef(0);
  const articleClosing = useRef(false);
  const serviceReaderRef = useRef<HTMLDivElement>(null);
  const serviceCloseRef = useRef<HTMLButtonElement>(null);
  const serviceTriggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const serviceOriginScrollY = useRef(0);
  const serviceClosing = useRef(false);
  const serviceTileCloseTimer = useRef<number | null>(null);
  const t = content[language];
  const knowledgeItems = language === "nl" ? knowledgeArticlesNl : knowledgeArticlesEn;
  const reviewCount = t.reviews.items.length;
  const reviewIndex = ((reviewCursor % reviewCount) + reviewCount) % reviewCount;
  const activeArticle = activeArticleIndex === null ? null : knowledgeItems[activeArticleIndex];
  const activeServiceDetail = activeServiceDetailIndex === null ? null : t.services.items[activeServiceDetailIndex];
  const activeCabinVideo = cabinVideos[activeCabinVideoIndex];
  const selectedReviewPhoto = selectedReviewIndex === null ? null : reviewPhotos[language][selectedReviewIndex];
  const reviewSelectionPaused = selectedReviewIndex !== null;

  useEffect(() => {
    document.documentElement.lang = language;
    const title = language === "nl"
      ? "Domi Installatie | Bouw, installatie & renovatie"
      : "Domi Installatie | Construction, installation & renovation";
    const description = language === "nl"
      ? "Domi Installatie helpt met renovatie, installatiewerk, onderhoud en complete afwerking — helder geregeld door één vakkundig team."
      : "Domi Installatie handles renovation, technical installations, maintenance and complete finishing through one skilled team.";
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [language]);

  useEffect(() => () => {
    if (serviceTileCloseTimer.current !== null) window.clearTimeout(serviceTileCloseTimer.current);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActiveCabinVideoIndex((current) => (current + 1) % cabinVideos.length);
    }, 10000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeServiceIndex === null) return;

    const detail = t.services.items[activeServiceIndex][2];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let interval = 0;
    const delay = window.setTimeout(() => {
      if (reduceMotion) {
        setTypedServiceDetail(detail);
        return;
      }
      let cursor = 0;
      interval = window.setInterval(() => {
        cursor = Math.min(detail.length, cursor + 2);
        setTypedServiceDetail(detail.slice(0, cursor));
        if (cursor >= detail.length) window.clearInterval(interval);
      }, 18);
    }, reduceMotion ? 0 : 420);

    return () => {
      window.clearTimeout(delay);
      if (interval) window.clearInterval(interval);
    };
  }, [activeServiceIndex, language, t.services.items]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.classList.remove("menu-is-open");
      return;
    }

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : menuButtonRef.current;
    const firstMenuLink = mobileMenuRef.current?.querySelector<HTMLElement>("a");
    const focusable = Array.from(document.querySelectorAll<HTMLElement>(".language-switch button, .menu-toggle, #mobile-menu a"));

    document.body.classList.add("menu-is-open");
    window.requestAnimationFrame(() => firstMenuLink?.focus());

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.classList.remove("menu-is-open");
      document.removeEventListener("keydown", handleKeydown);
      previouslyFocused?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(
      ".section-intro, .about-copy, .about-image, .service-card, .process-list li, .scroll-depth-story-copy, .project-card, .featured-title, .featured-marquee, .placeholder-note, .review-card, .knowledge-card, .contact-intro, .contact-form, .footer-top",
    ));

    document.documentElement.classList.add("animations-ready");
    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });

    revealTargets.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("animations-ready");
      revealTargets.forEach((element) => {
        element.classList.remove("reveal-item", "is-visible");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  useEffect(() => {
    if (selectedReviewIndex !== null || reviewsPaused || reviewsHovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setReviewCursor((cursor) => cursor + 1);
    }, 5200);
    return () => window.clearTimeout(timer);
  }, [reviewCursor, reviewsHovered, reviewsPaused, selectedReviewIndex]);

  useEffect(() => {
    if (selectedReviewIndex === null) return;

    function closeReviewOnOutsidePointer(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (reviewShowcaseRef.current?.contains(target) || reviewNavigationRef.current?.contains(target)) return;
      setSelectedReviewIndex(null);
    }

    document.addEventListener("pointerdown", closeReviewOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeReviewOnOutsidePointer);
  }, [selectedReviewIndex]);

  useEffect(() => {
    const viewport = reviewViewportRef.current;
    const cards = viewport?.querySelectorAll<HTMLElement>(".review-card");
    const card = cards?.[reviewCursor];
    if (!viewport || !card) return;

    function alignCard(target: HTMLElement, behavior: ScrollBehavior) {
      const targetLeft = target.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
      viewport.scrollTo({ left: targetLeft, behavior });
    }

    alignCard(card, reviewCarouselReady.current ? "smooth" : "auto");
    reviewCarouselReady.current = true;
    const viewportResizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
      const activeCard = cards[reviewCursor];
      if (activeCard) alignCard(activeCard, "auto");
    });
    viewportResizeObserver?.observe(viewport);
    const realignTimer = selectedReviewIndex === null ? null : window.setTimeout(() => {
      const selectedCard = cards[reviewCursor];
      if (selectedCard) alignCard(selectedCard, "smooth");
    }, 500);

    let resetTimer: number | null = null;
    if (reviewCursor >= reviewCount * 2 || reviewCursor < reviewCount) {
      const resetCursor = reviewCount + reviewIndex;
      resetTimer = window.setTimeout(() => {
        const resetCard = cards[resetCursor];
        if (!resetCard) return;
        alignCard(resetCard, "auto");
        setReviewCursor(resetCursor);
      }, 720);
    }

    return () => {
      viewportResizeObserver?.disconnect();
      if (realignTimer !== null) window.clearTimeout(realignTimer);
      if (resetTimer !== null) window.clearTimeout(resetTimer);
    };
  }, [language, reviewCount, reviewCursor, reviewIndex, selectedReviewIndex]);

  useEffect(() => {
    if (activeArticleIndex === null) return;

    const trigger = articleTriggerRefs.current[activeArticleIndex];
    const reader = articleReaderRef.current;
    document.body.classList.add("article-is-open");
    articleClosing.current = false;
    lastArticleScrollTop.current = 0;
    reader?.scrollTo({ top: 0 });
    const focusFrame = window.requestAnimationFrame(() => articleCloseRef.current?.focus());

    function handleArticleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        articleCloseRef.current?.click();
        return;
      }
      if (event.key !== "Tab" || !reader) return;

      const focusable = Array.from(reader.querySelectorAll<HTMLElement>("button, a[href]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleArticleKeydown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove("article-is-open");
      document.removeEventListener("keydown", handleArticleKeydown);
      window.requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
    };
  }, [activeArticleIndex]);

  useEffect(() => {
    if (activeServiceDetailIndex === null) return;

    const trigger = serviceTriggerRefs.current[activeServiceDetailIndex];
    const reader = serviceReaderRef.current;
    document.body.classList.add("article-is-open");
    serviceClosing.current = false;
    reader?.scrollTo({ top: 0 });
    const focusFrame = window.requestAnimationFrame(() => serviceCloseRef.current?.focus());

    function handleServiceKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        serviceCloseRef.current?.click();
        return;
      }
      if (event.key !== "Tab" || !reader) return;

      const focusable = Array.from(reader.querySelectorAll<HTMLElement>("button, a[href]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleServiceKeydown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove("article-is-open");
      document.removeEventListener("keydown", handleServiceKeydown);
      window.requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
    };
  }, [activeServiceDetailIndex]);

  useEffect(() => {
    const heroMedia = document.querySelector<HTMLElement>(".hero-media");
    const processList = document.querySelector<HTMLElement>(".process-list");
    const scrollDepthStory = document.querySelector<HTMLElement>(".scroll-depth-story");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    function updateScrollEffects() {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? Math.min(1, window.scrollY / scrollRange) : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);

      if (heroMedia && !reduceMotion.matches && window.scrollY < window.innerHeight * 1.35) {
        heroMedia.style.transform = `translate3d(0, ${window.scrollY * 0.075}px, 0) scale(1.055)`;
      }
      if (processList) {
        const rect = processList.getBoundingClientRect();
        const travelled = window.innerHeight * .58 - rect.top;
        const distance = rect.height + window.innerHeight * .18;
        const processProgress = Math.max(0, Math.min(1, (travelled / distance) * 1.45));
        processList.style.setProperty("--process-progress", `${processProgress * 100}%`);
      }
      if (scrollDepthStory && !reduceMotion.matches) {
        const rect = scrollDepthStory.getBoundingClientRect();
        const storyProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        const centered = storyProgress - .5;
        scrollDepthStory.style.setProperty("--depth-bg-y", `${centered * -150}px`);
        scrollDepthStory.style.setProperty("--depth-fg-y", `${centered * 220}px`);
        scrollDepthStory.style.setProperty("--depth-glow-x", `${centered * 180}px`);
      }
      ticking = false;
    }

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollEffects);
    }

    updateScrollEffects();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.removeProperty("--scroll-progress");
      heroMedia?.style.removeProperty("transform");
      processList?.style.removeProperty("--process-progress");
      scrollDepthStory?.style.removeProperty("--depth-bg-y");
      scrollDepthStory?.style.removeProperty("--depth-fg-y");
      scrollDepthStory?.style.removeProperty("--depth-glow-x");
    };
  }, []);

  useEffect(() => {
    const sectionIds = new Set(["over", "diensten", "projecten", "reviews", "kennis", "contact"]);
    let frame = 0;

    function updateActiveSection() {
      const marker = window.scrollY + window.innerHeight * .34;
      let nextSection = "";
      document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => {
        if (sectionIds.has(section.id) && section.offsetTop <= marker) nextSection = `#${section.id}`;
      });
      setActiveSection((current) => current === nextSection ? current : nextSection);
      frame = 0;
    }

    function handleSectionScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    }

    frame = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener("scroll", handleSectionScroll, { passive: true });
    window.addEventListener("resize", handleSectionScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleSectionScroll);
      window.removeEventListener("resize", handleSectionScroll);
    };
  }, []);

  function changeLanguage(next: Language) {
    setReviewCursor(content[next].reviews.items.length);
    setSelectedReviewIndex(null);
    setTypedServiceDetail("");
    setLanguage(next);
    setMenuOpen(false);
    window.history.replaceState(null, "", next === "en" ? "/en" : "/");
  }

  function toggleServiceTile(index: number) {
    setTypedServiceDetail("");
    if (activeServiceIndex === index) {
      if (serviceTileCloseTimer.current !== null) window.clearTimeout(serviceTileCloseTimer.current);
      setClosingServiceIndex(index);
      setActiveServiceIndex(null);
      serviceTileCloseTimer.current = window.setTimeout(() => {
        setClosingServiceIndex(null);
        serviceTileCloseTimer.current = null;
      }, 820);
      return;
    }

    if (activeServiceIndex !== null) {
      if (serviceTileCloseTimer.current !== null) window.clearTimeout(serviceTileCloseTimer.current);
      setClosingServiceIndex(activeServiceIndex);
      serviceTileCloseTimer.current = window.setTimeout(() => {
        setClosingServiceIndex(null);
        serviceTileCloseTimer.current = null;
      }, 820);
    }
    setActiveServiceIndex(index);
  }

  function openServiceDetails(index: number) {
    serviceOriginScrollY.current = window.scrollY;
    serviceClosing.current = false;
    setActiveServiceDetailIndex(index);
  }

  function closeServiceDetails() {
    if (serviceClosing.current) return;
    serviceClosing.current = true;

    const reader = serviceReaderRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function finishClose() {
      flushSync(() => setActiveServiceDetailIndex(null));
      window.requestAnimationFrame(() => window.scrollTo({ top: serviceOriginScrollY.current, behavior: "auto" }));
    }

    if (!reader || reduceMotion) {
      finishClose();
      return;
    }

    const fade = reader.animate(
      [
        { opacity: 1, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" },
        { opacity: 0, backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" },
      ],
      { duration: 520, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" },
    );
    fade.finished.then(finishClose, finishClose);
  }

  function closeArticle() {
    if (articleClosing.current) return;
    articleClosing.current = true;
    setArticleExitVisible(false);

    const reader = articleReaderRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function finishClose() {
      flushSync(() => setActiveArticleIndex(null));
      window.requestAnimationFrame(() => window.scrollTo({ top: articleOriginScrollY.current, behavior: "auto" }));
    }

    if (!reader || reduceMotion) {
      finishClose();
      return;
    }

    const fade = reader.animate(
      [
        { opacity: 1, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" },
        { opacity: 0, backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" },
      ],
      { duration: 520, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" },
    );
    fade.finished.then(finishClose, finishClose);
  }

  function handleArticleScroll() {
    const reader = articleReaderRef.current;
    const exitZone = articleExitRef.current;
    if (!reader || !exitZone || articleClosing.current) return;

    const currentTop = reader.scrollTop;
    const movingDown = currentTop > lastArticleScrollTop.current;
    const promptAt = Math.max(0, exitZone.offsetTop - reader.clientHeight * .55);
    const closeAt = Math.max(promptAt + 120, exitZone.offsetTop - 24);
    const promptVisible = currentTop >= promptAt;

    setArticleExitVisible(promptVisible);
    if (movingDown && promptVisible && currentTop >= closeAt) closeArticle();
    lastArticleScrollTop.current = currentTop;
  }

  function stepReview(direction: -1 | 1) {
    setReviewCursor((cursor) => cursor + direction);
    setSelectedReviewIndex((index) => index === null ? null : (index + direction + reviewCount) % reviewCount);
  }

  return (
    <div lang={language}>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <div className="scroll-progress" aria-hidden="true" />
        <a className="brand" href="#home" aria-label="Domi Installatie home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><img src="/domi-logo-intro.gif" alt="" /></span>
          <span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span>
        </a>

        <nav className="desktop-nav" aria-label={t.navLabel}>
          {t.nav.map(([label, href]) => <a className={activeSection === href ? "active" : ""} aria-current={activeSection === href ? "location" : undefined} href={href} key={href} onClick={() => setActiveSection(href)}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label={t.language} role="group">
            <button type="button" className={language === "nl" ? "active" : ""} aria-pressed={language === "nl"} onClick={() => changeLanguage("nl")}>NL</button>
            <span>/</span>
            <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>EN</button>
          </div>
          <a className="header-cta" href="#contact">{t.quote}</a>
          <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={menuOpen ? t.menuClose : t.menuOpen} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
            <span /><span />
          </button>
        </div>

        <nav ref={mobileMenuRef} className={`mobile-nav${menuOpen ? " open" : ""}`} id="mobile-menu" aria-label={t.navLabel} aria-hidden={!menuOpen}>
          {t.nav.map(([label, href], index) => (
            <a className={activeSection === href ? "active" : ""} aria-current={activeSection === href ? "location" : undefined} href={href} key={href} onClick={() => { setActiveSection(href); setMenuOpen(false); }}><span>0{index + 1}</span>{label}</a>
          ))}
          <a className="mobile-quote" href="#contact" onClick={() => setMenuOpen(false)}>{t.quote}<b>↗</b></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-media" aria-hidden="true">
            <img className="hero-image" src={images.hero} alt="" width="640" height="530" fetchPriority="high" />
            <iframe
              key={`hero-${activeCabinVideo.id}`}
              className="hero-video-background"
              src={`https://www.youtube-nocookie.com/embed/${activeCabinVideo.id}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&modestbranding=1&loop=1&playlist=${activeCabinVideo.id}&playsinline=1&rel=0&start=${activeCabinVideo.start}&end=${activeCabinVideo.end}`}
              title={`${activeCabinVideo.title} — Fairytale Cabins`}
              allow="autoplay; encrypted-media"
              tabIndex={-1}
            />
          </div>
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow"><span />{t.hero.eyebrow}</p>
            <h1>{t.hero.titleTop}<br /><em>{t.hero.titleAccent}</em></h1>
            <p className="hero-copy">{t.hero.text}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">{t.hero.primary}<span>↗</span></a>
              <a className="button button-ghost" href="#projecten">{t.hero.secondary}</a>
            </div>
          </div>
          <aside className="hero-proof">
            <strong>01</strong>
            <p><b>{t.hero.proofTitle}</b><br />{t.hero.proofText}</p>
          </aside>
        </section>

        <div className="promise-bar" aria-label={t.ticker.join(", ")}>
          {t.ticker.map((item) => <span key={item}>{item}<i /></span>)}
        </div>

        <section className="about section-pad" id="over">
          <div className="about-copy">
            <p className="eyebrow dark"><span />{t.about.eyebrow}</p>
            <h2>{t.about.title}</h2>
            <p className="lead-copy">{t.about.lead}</p>
            <p className="body-copy">{t.about.body}</p>
            <p className="about-detail"><span>01</span>{t.about.detail}</p>
          </div>
          <figure className="about-image">
            <img src={images.craft} alt={t.about.imageAlt} width="640" height="530" loading="lazy" decoding="async" />
            <figcaption><span>{language === "nl" ? "Eigen project" : "Completed project"}</span><span>Amsterdam</span></figcaption>
          </figure>
        </section>

        <section className="services section-pad" id="diensten">
          <SectionIntro eyebrow={t.services.eyebrow} title={t.services.title} text={t.services.intro} light />
          <div className="service-grid">
            {t.services.items.map(([title, text, detail], index) => {
              const isActive = activeServiceIndex === index;
              const isClosing = closingServiceIndex === index;
              return (
                <div className={`service-card-shell${isActive ? " active" : ""}${isClosing ? " closing" : ""}`} key={title}>
                  <div
                    className={`service-card${isActive ? " active" : ""}`}
                  >
                    <button className="service-expand-trigger" type="button" aria-expanded={isActive} aria-label={`${title}: ${text} ${detail}`} onClick={() => toggleServiceTile(index)} />
                    <span className="service-image" aria-hidden="true"><img src={serviceImages[index]} alt="" loading="lazy" decoding="async" /></span>
                    <div className="service-top"><span>0{index + 1}</span><i aria-hidden="true" /></div>
                    <h3>{title}</h3>
                    <p className="service-summary">{text}</p>
                    <span className="service-detail"><span className={`service-detail-visible${isActive && typedServiceDetail.length < detail.length ? " typing" : ""}`} aria-hidden="true">{isActive ? typedServiceDetail : detail}</span></span>
                    <button
                      className="service-more-button"
                      type="button"
                      ref={(element) => { serviceTriggerRefs.current[index] = element; }}
                      aria-haspopup="dialog"
                      onClick={() => openServiceDetails(index)}
                    >{t.services.more}<span>↗</span></button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="process section-pad" id="werkwijze">
          <SectionIntro eyebrow={t.process.eyebrow} title={t.process.title} />
          <ol className="process-list">
            {t.process.items.map(([title, text], index) => (
              <li
                key={title}
                onPointerMove={(event) => {
                  event.currentTarget.querySelectorAll<HTMLElement>("[data-process-text]").forEach((element) => {
                    const bounds = element.getBoundingClientRect();
                    element.style.setProperty("--process-spot-x", `${event.clientX - bounds.left}px`);
                    element.style.setProperty("--process-spot-y", `${event.clientY - bounds.top}px`);
                  });
                }}
              >
                <span data-process-text={`0${index + 1}`}>0{index + 1}</span>
                <h3 data-process-text={title}>{title}</h3>
                <p data-process-text={text}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="scroll-depth-story"
          aria-label={language === "nl" ? "Cabinbouw van ruwbouw tot eindresultaat" : "Cabin construction from first fix to final finish"}
        >
          <span className="scroll-depth-glow" aria-hidden="true" />
          <div className="scroll-depth-video-stage" id="cabin-video-stage">
            <div className="cabin-video-frame" aria-hidden="true">
              <iframe
                key={activeCabinVideo.id}
                src={`https://www.youtube-nocookie.com/embed/${activeCabinVideo.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${activeCabinVideo.id}&playsinline=1&rel=0&start=${activeCabinVideo.start}&end=${activeCabinVideo.end}`}
                title={`${activeCabinVideo.title} — Fairytale Cabins`}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                tabIndex={-1}
              />
            </div>
            <div className="cabin-video-caption" aria-live="polite">
              <span>0{activeCabinVideoIndex + 1} / 03</span>
              <strong>{activeCabinVideo.title}</strong>
              <a href={`https://www.youtube.com/watch?v=${activeCabinVideo.id}`} target="_blank" rel="noreferrer">
                {language === "nl" ? "Bekijk video" : "Watch video"}<i>↗</i>
              </a>
            </div>
          </div>
          <div className="scroll-depth-story-copy">
            <p className="eyebrow"><span />{language === "nl" ? "Van ruwbouw tot eindresultaat" : "From first fix to final finish"}</p>
            <h2>{language === "nl" ? <>Cabins die stap voor stap<br /><em>tot leven komen.</em></> : <>Cabins brought to life,<br /><em>step by step.</em></>}</h2>
            <p>{language === "nl" ? "Van houten casco en maatwerkdetails tot een volledig afgewerkt verblijf. Bekijk drie korte bouwverhalen uit het Fairytale Cabins-projectarchief." : "From timber shell and bespoke details to a fully finished retreat. Watch three short build stories from the Fairytale Cabins project archive."}</p>
            <div className="cabin-video-tabs" role="group" aria-label={language === "nl" ? "Kies een cabinvideo" : "Choose a cabin video"}>
              {cabinVideos.map((video, index) => (
                <button
                  type="button"
                  key={video.id}
                  className={activeCabinVideoIndex === index ? "active" : ""}
                  aria-pressed={activeCabinVideoIndex === index}
                  aria-controls="cabin-video-stage"
                  onClick={() => setActiveCabinVideoIndex(index)}
                ><span>0{index + 1}</span>{video.title}</button>
              ))}
            </div>
            <div className="scroll-depth-actions">
              <a className="button button-light" href="#projecten">{language === "nl" ? "Bekijk onze projecten" : "View our projects"}<span>↓</span></a>
              <a className="cabin-channel-link" href="https://www.youtube.com/@FairytaleCabins/videos" target="_blank" rel="noreferrer">{language === "nl" ? "Alle video’s op YouTube" : "All videos on YouTube"}<span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="projects section-pad" id="projecten">
          <h2 className="visually-hidden">{t.projects.eyebrow}</h2>
          <div className="project-grid">
            {t.projects.items.map((project, index) => (
              <article className="project-card" key={project.title}>
                <a
                  className="project-card-trigger"
                  href={language === "nl" ? `/projecten/${project.slug}` : `/en/projects/${project.slug}`}
                  aria-label={`${t.projects.open}: ${project.title}`}
                />
                <figure>
                  <img src={project.image} alt={project.alt} width="640" height="530" loading="lazy" decoding="async" />
                  <span className="placeholder-badge">{t.projects.placeholder}</span>
                </figure>
                <div className="project-number">0{index + 1}</div>
                <div className="project-copy">
                  <p className="project-type">{project.type}</p><h3>{project.title}</h3><p>{project.text}</p>
                  <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <span className="project-open-button" aria-hidden="true"><span>{t.projects.open}</span><i>↗</i></span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="featured" aria-labelledby="featured-title">
          <div className="featured-title">
            <h2 id="featured-title">{t.featured.title}</h2>
          </div>
          <p className="featured-note">{t.featured.note}</p>
          <div className="featured-marquee" role="list" aria-label={t.featured.title}>
            <div className="featured-track">
              {[0, 1].map((group) => (
                <div className="featured-logo-group" aria-hidden={group === 1} key={group}>
                  {t.featured.items.map((item, index) => (
                    <span className="featured-logo featured-location" key={item} role={group === 0 ? "listitem" : undefined}>
                      <strong>{item}</strong>
                      <small className="visually-hidden">{t.featured.placeholder} · 0{index + 1}</small>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews section-pad" id="reviews">
          <SectionIntro eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
          <div className="review-heading-row">
            <p className="placeholder-note">{t.reviews.note} <span>{language === "nl" ? "Klik op een review voor de projectfoto." : "Select a review to see the project photo."}</span></p>
          </div>
          <div ref={reviewShowcaseRef} className={`review-showcase${selectedReviewPhoto ? " has-selection" : ""}`}>
            {reviewSelectionPaused && (
              <button type="button" className="review-side-previous" aria-label={t.reviews.previous} onClick={() => stepReview(-1)}>←</button>
            )}
            <div
              className="review-viewport"
              ref={reviewViewportRef}
              onMouseEnter={() => setReviewsHovered(true)}
              onMouseLeave={() => setReviewsHovered(false)}
              onFocusCapture={() => setReviewsHovered(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setReviewsHovered(false);
              }}
            >
              <div className="review-grid">
                {[0, 1, 2].map((group) => t.reviews.items.map(([quote, attribution], index) => (
                  <article className={`review-card${selectedReviewIndex === index ? " selected" : ""}`} aria-hidden={group !== 1} key={`${group}-${attribution}`}>
                    <button
                      className="review-card-trigger"
                      type="button"
                      tabIndex={group === 1 ? 0 : -1}
                      aria-expanded={selectedReviewIndex === index}
                      aria-controls="selected-review-photo"
                      aria-label={language === "nl" ? `Bekijk projectfoto bij review van ${attribution}` : `View project photo for review by ${attribution}`}
                      onClick={() => {
                        setSelectedReviewIndex(index);
                        setReviewCursor(group * reviewCount + index);
                      }}
                    />
                    <div className="review-meta"><span>0{index + 1}</span><span>{t.reviews.label}</span></div>
                    <span className="review-photo-hint" aria-hidden="true">{language === "nl" ? "Klik voor projectfoto" : "Click for project photo"}<i>↗</i></span>
                    <blockquote><HighlightedReview quote={quote} terms={reviewHighlights[language][index]} /></blockquote><p>{attribution}</p><small>{t.reviews.label}</small>
                    <a className="review-project-link" href={language === "nl" ? `/projecten/${reviewProjectSlugs[index]}` : `/en/projects/${reviewProjectSlugs[index]}`}>{language === "nl" ? "Bekijk project" : "View project"}<span>↗</span></a>
                  </article>
                )))}
              </div>
            </div>
            {selectedReviewPhoto && selectedReviewIndex !== null && (
              <aside className="review-photo-panel" id="selected-review-photo" aria-live="polite">
                <img src={selectedReviewPhoto.src} alt={selectedReviewPhoto.alt} width="640" height="530" />
                <button type="button" className="review-photo-close" aria-label={language === "nl" ? "Projectfoto sluiten" : "Close project photo"} onClick={() => setSelectedReviewIndex(null)}>×</button>
                <div className="review-photo-caption"><span>{language === "nl" ? "Bij deze review" : "Featured review"}</span><strong>{selectedReviewPhoto.label}</strong><small>{t.reviews.items[selectedReviewIndex][1]}</small></div>
              </aside>
            )}
          </div>
          <div ref={reviewNavigationRef} className="review-navigation">
            <div className="review-controls">
              <button type="button" aria-label={t.reviews.previous} onClick={() => stepReview(-1)}>←</button>
              <button type="button" className="review-pause" aria-label={reviewSelectionPaused ? (language === "nl" ? "Automatische carrousel gepauzeerd zolang een review is geselecteerd" : "Automatic carousel paused while a review is selected") : reviewsPaused ? t.reviews.play : t.reviews.pause} aria-pressed={reviewsPaused || reviewSelectionPaused} disabled={reviewSelectionPaused} onClick={() => setReviewsPaused((paused) => !paused)}>{reviewsPaused ? "▶" : "Ⅱ"}</button>
              <button type="button" aria-label={t.reviews.next} onClick={() => stepReview(1)}>→</button>
            </div>
            <div className="review-position" aria-hidden="true">{t.reviews.items.map((_, index) => <i className={index === reviewIndex ? "active" : ""} key={index} />)}</div>
          </div>
        </section>

        <section className="knowledge section-pad" id="kennis">
          <SectionIntro eyebrow={t.knowledge.eyebrow} title={t.knowledge.title} text={t.knowledge.intro} />
          <div className="knowledge-grid">
            {knowledgeItems.map((article, index) => (
              <article className="knowledge-card" key={article.title}>
                <a
                  className="knowledge-card-trigger"
                  ref={(element) => { articleTriggerRefs.current[index] = element; }}
                  href={language === "nl" ? `/kennis/${article.slug}` : `/en/insights/${article.slug}`}
                  aria-label={`${t.knowledge.read}: ${article.title}`}
                />
                <figure><img src={article.image} alt={article.alt} width="640" height="530" loading="lazy" decoding="async" /></figure>
                <div className="knowledge-copy">
                  <p className="article-meta">{article.category}</p><h3>{article.title}</h3><p>{article.text}</p>
                  <span className="article-open-button" aria-hidden="true">
                    <span>{t.knowledge.read}</span><i>↗</i>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-intro">
            <p className="eyebrow"><span />{t.contact.eyebrow}</p><h2>{t.contact.title}</h2><p>{t.contact.text}</p>
            <ul>{t.contact.benefits.map((benefit) => <li key={benefit}><span>✓</span>{benefit}</li>)}</ul>
            <div className="contact-direct">
              <a href="mailto:troosbouw@gmail.com">troosbouw@gmail.com</a>
              <a href="tel:+31610983085">{language === "nl" ? "06 10 98 30 85" : "+31 6 10 98 30 85"}</a>
              <a href="https://wa.me/31610983085" target="_blank" rel="noreferrer">WhatsApp ↗</a>
            </div>
          </div>
          <form className="contact-form" action="https://formsubmit.co/e2a3109e56f2b784903eb6ae24352c31" method="POST">
            <input type="hidden" name="_subject" value="Nieuwe aanvraag via Domi Installatie" />
            <input type="hidden" name="_template" value="table" />
            <div className="form-heading"><span>01</span><h3>{t.contact.formTitle}</h3></div>
            <div className="form-grid">
              <Field label={t.contact.name}><input name="name" autoComplete="name" required /></Field>
              <Field label={t.contact.email}><input name="email" type="email" autoComplete="email" required /></Field>
              <Field label={t.contact.phone}><input name="phone" type="tel" autoComplete="tel" /></Field>
              <Field label={t.contact.location}><input name="location" autoComplete="postal-code" required /></Field>
              <Field label={t.contact.type}>
                <select name="projectType" required defaultValue=""><option value="" disabled>{t.contact.typePrompt}</option>{t.contact.typeOptions.map((option) => <option key={option}>{option}</option>)}</select>
              </Field>
              <Field label={t.contact.timing}><input name="timing" placeholder={language === "nl" ? "Bijv. najaar 2026" : "E.g. autumn 2026"} /></Field>
            </div>
            <Field label={t.contact.message}><textarea name="message" rows={5} required placeholder={t.contact.messagePlaceholder} /></Field>
            <label className="consent"><input type="checkbox" name="privacyConsent" value="Akkoord" required /><span>{t.contact.consent} <Link href="/privacy">{language === "nl" ? "Lees de privacyverklaring." : "Read the privacy notice."}</Link></span></label>
            <div className="form-submit"><button className="button button-primary" type="submit">{t.contact.submit}<span>↗</span></button><p>{t.contact.demo}</p></div>
          </form>
        </section>
      </main>

      <a className="whatsapp-float" href="https://wa.me/31610983085" target="_blank" rel="noreferrer" aria-label={language === "nl" ? "Stuur een WhatsApp-bericht" : "Send a WhatsApp message"}>WhatsApp <span>↗</span></a>

      {activeArticle && (
        <div
          className="article-reader"
          ref={articleReaderRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="active-article-title"
          onScroll={handleArticleScroll}
        >
          <button className="article-close" ref={articleCloseRef} type="button" onClick={closeArticle}>
            <span>{t.knowledge.close}</span><i aria-hidden="true">×</i>
          </button>
          <article className="article-sheet">
            <figure className="article-cover">
              <img src={activeArticle.image} alt={activeArticle.alt} />
              <div className="article-cover-shade" />
            </figure>
            <div className="article-reader-content">
              <p className="article-meta">{activeArticle.category}</p>
              <h2 id="active-article-title">{activeArticle.title}</h2>
              <p className="article-reader-lead">{activeArticle.text}</p>
              <div className="article-body">
                {activeArticle.body.map((paragraph, index) => (
                  <p key={paragraph}><span>0{index + 1}</span>{paragraph}</p>
                ))}
              </div>
              <button className="button button-primary article-inline-close" type="button" onClick={closeArticle}>{t.knowledge.close}<span>×</span></button>
            </div>
          </article>
          <div className={`article-exit-zone${articleExitVisible ? " visible" : ""}`} ref={articleExitRef} aria-hidden={!articleExitVisible}>
            <div>
              <span className="scroll-wheel" aria-hidden="true"><i /></span>
              <p>{t.knowledge.scrollClose}</p>
            </div>
          </div>
        </div>
      )}

      {activeServiceDetail && activeServiceDetailIndex !== null && (
        <div className="article-reader service-reader" ref={serviceReaderRef} role="dialog" aria-modal="true" aria-labelledby="active-service-title">
          <button className="article-close" ref={serviceCloseRef} type="button" onClick={closeServiceDetails}>
            <span>{t.services.close}</span><i aria-hidden="true">×</i>
          </button>
          <article className="article-sheet">
            <figure className="article-cover service-cover">
              <img src={serviceImages[activeServiceDetailIndex]} alt="" />
              <div className="article-cover-shade" />
            </figure>
            <div className="article-reader-content">
              <p className="article-meta">{t.services.overlayLabel} · 0{activeServiceDetailIndex + 1}</p>
              <h2 id="active-service-title">{activeServiceDetail[0]}</h2>
              <p className="article-reader-lead">{activeServiceDetail[1]}</p>
              <div className="article-body service-body">
                <p><span>01</span><span><strong>{activeServiceDetail[0]}</strong>{activeServiceDetail[2]}</span></p>
                <p><span>02</span><span><strong>{t.services.approachTitle}</strong>{t.services.approach}</span></p>
                <p><span>03</span><span><strong>{t.services.contactTitle}</strong>{t.services.contact}</span></p>
              </div>
              <button className="button button-primary article-inline-close" type="button" onClick={closeServiceDetails}>{t.services.close}<span>×</span></button>
            </div>
          </article>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><span className="brand-mark"><img src="/domi-logo-intro.gif" alt="" /></span><div><p>DOMI INSTALLATIE</p><h2>{t.footer.line}</h2></div></div>
          <nav aria-label={t.footer.navigation}>{t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
          <div><p className="footer-label">{t.footer.contact}</p><p>{t.footer.contactLine}</p><a className="footer-contact-link" href="mailto:troosbouw@gmail.com">troosbouw@gmail.com ↗</a></div>
          <div className="social-block">
            <p className="footer-label">{t.footer.social}</p>
            <div className="social-links">{socials.map(([name, href]) => <a href={href} target="_blank" rel="noreferrer" key={name}>{name}<span>↗</span></a>)}</div>
            <small>{t.footer.socialNote}</small>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Domi Installatie</span><span>{t.footer.closing}</span><span><Link href="/privacy">Privacy</Link> · <Link href="/voorwaarden">{language === "nl" ? "Voorwaarden" : "Terms"}</Link></span></div>
      </footer>
    </div>
  );
}

function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className="section-intro"><div><p className={`eyebrow${light ? "" : " dark"}`}><span />{eyebrow}</p><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

function HighlightedReview({ quote, terms }: { quote: string; terms: readonly string[] }) {
  const escapedTerms = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const matcher = new RegExp(`(${escapedTerms.join("|")})`, "gi");
  const highlightedTerms = new Set(terms.map((term) => term.toLowerCase()));

  return quote.split(matcher).map((part, index) => highlightedTerms.has(part.toLowerCase())
    ? <mark className="review-highlight" key={`${part}-${index}`}>{part}</mark>
    : part);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="form-field"><span>{label}</span>{children}</label>;
}
