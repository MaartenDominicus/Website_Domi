"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Language = "nl" | "en";

const images = {
  hero: "https://images.pexels.com/photos/32990521/pexels-photo-32990521/free-photo-of-construction-worker-at-indoor-renovation-site.jpeg?auto=compress&dpr=1&h=1200&w=2000",
  craft: "https://images.pexels.com/photos/37152389/pexels-photo-37152389/free-photo-of-carpenter-measuring-wood-with-precision-tools.jpeg?auto=compress&dpr=1&h=900&w=1400",
  bathroom: "https://images.pexels.com/photos/36446636/pexels-photo-36446636.jpeg?auto=compress&cs=tinysrgb&w=1600",
  kitchen: "https://images.pexels.com/photos/37357024/pexels-photo-37357024/free-photo-of-modern-renovated-kitchen-with-hardwood-floors.jpeg?auto=compress&dpr=1&h=900&w=1400",
  electric: "https://images.pexels.com/photos/27928760/pexels-photo-27928760/free-photo-of-a-man-is-working-on-an-electrical-panel.jpeg?auto=compress&dpr=1&h=900&w=1400",
  plumbing: "https://images.pexels.com/photos/32588548/pexels-photo-32588548/free-photo-of-plumber-repairing-pipe-with-wrench-indoors.jpeg?auto=compress&dpr=1&h=900&w=1400",
  tiling: "https://images.pexels.com/photos/29181494/pexels-photo-29181494/free-photo-of-construction-worker-laying-tile-in-renovation-project.jpeg?auto=compress&dpr=1&h=900&w=1400",
} as const;

const imageSources = {
  hero: "https://www.pexels.com/photo/construction-worker-at-indoor-renovation-site-32990521/",
  craft: "https://www.pexels.com/photo/carpenter-measuring-wood-with-precision-tools-37152389/",
  bathroom: "https://www.pexels.com/photo/elegant-modern-bathroom-with-marble-and-chrome-faucet-36446636/",
  kitchen: "https://www.pexels.com/photo/modern-renovated-kitchen-with-hardwood-floors-37357024/",
  electric: "https://www.pexels.com/photo/a-man-is-working-on-an-electrical-panel-27928760/",
  plumbing: "https://www.pexels.com/photo/plumber-repairing-pipe-with-wrench-indoors-32588548/",
  tiling: "https://www.pexels.com/photo/construction-worker-laying-tile-in-renovation-project-29181494/",
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
      eyebrow: "Bouwen · Installeren · Afwerken",
      titleTop: "Eén vakteam.", titleAccent: "Uw hele project.",
      text: "Van elektra, water en verwarming tot badkamers, verbouwingen en de laatste afwerking. Domi Installatie brengt alle werkzaamheden samen in één helder plan.",
      primary: "Bespreek uw project", secondary: "Bekijk ons werk",
      proofTitle: "Alles in één lijn.", proofText: "Bouw, techniek en afwerking zorgvuldig op elkaar afgestemd.",
      alt: "Sfeerbeeld van een vakman tijdens een woningrenovatie",
    },
    ticker: ["Breed inzetbaar", "Korte lijnen", "Heldere afspraken", "Netjes opgeleverd"],
    about: {
      eyebrow: "Over Domi", title: "Alles komt samen bij Domi.",
      lead: "Bouwkundige kennis, installatietechniek en een scherp oog voor afwerking — bij Domi vindt u het onder één dak.",
      body: "Daardoor hoeft u niet voor iedere stap een andere partij te regelen. We denken praktisch mee, stemmen werkzaamheden goed op elkaar af en houden u tijdens het project op de hoogte. Van een gerichte reparatie tot een complete verbouwing: we kijken naar het geheel en leveren een resultaat waar u direct mee verder kunt.",
      detail: "Eén aanspreekpunt. Minder losse schakels. Meer grip op het resultaat.",
      imageAlt: "Sfeerbeeld van nauwkeurig timmerwerk",
    },
    services: {
      eyebrow: "Onze vakgebieden", title: "Vakwerk voor iedere fase.",
      intro: "Van de eerste aansluiting tot de laatste afwerking: één aanspreekpunt en werkzaamheden die logisch op elkaar aansluiten.",
      items: [
        ["Elektra & verlichting", "Aanpassingen aan installaties, extra aansluitpunten en functionele binnen- en buitenverlichting."],
        ["Water & sanitair", "Leidingen, kranen, toiletten, aansluitingen en het zorgvuldig oplossen van lekkages."],
        ["Verwarming", "Radiatoren, leidingwerk en praktische aanpassingen voor comfortabel en efficiënt verwarmen."],
        ["Badkamers & toiletten", "Complete vernieuwing, inclusief leidingwerk, elektra, tegelwerk, montage en afwerking."],
        ["Renovatie & verbouwing", "Slimme aanpassingen aan woningen en bedrijfsruimtes, van indeling tot gebruiksklare oplevering."],
        ["Tegel-, stuc- & schilderwerk", "Strakke wanden, vloeren en oppervlakken die een ruimte zichtbaar afmaken."],
        ["Timmerwerk & montage", "Maatwerk, aftimmering en zorgvuldige montage van praktische interieuroplossingen."],
        ["Onderhoud & reparaties", "Kleine en grotere werkzaamheden om uw woning of pand veilig, netjes en goed bruikbaar te houden."],
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
      intro: "Onderstaande projecten en beelden zijn voorbeelden en kunnen later eenvoudig worden vervangen door eigen Domi-werk.",
      placeholder: "Voorbeeldproject",
      items: [
        { title: "Van gedateerd naar dagelijks comfort", type: "Complete badkamerrenovatie", text: "Leidingwerk verlegd, elektra aangepast en de ruimte opnieuw opgebouwd met tegelwerk, sanitair en maatwerkdetails.", tags: ["Sanitair", "Tegelwerk", "Elektra", "Afwerking"], image: images.bathroom, source: imageSources.bathroom, alt: "Sfeerbeeld van een moderne afgewerkte badkamer" },
        { title: "Wonen, koken en techniek als één geheel", type: "Renovatie begane grond", text: "Een nieuwe indeling met aansluitingen, wandafwerking, verlichting en zorgvuldig timmerwerk als samenhangend geheel.", tags: ["Verbouwing", "Elektra", "Water", "Timmerwerk"], image: images.kitchen, source: imageSources.kitchen, alt: "Sfeerbeeld van een lichte gerenoveerde keuken" },
        { title: "Een lichtere, praktischere werkplek", type: "Modernisering bedrijfsruimte", text: "Verlichting en aansluitpunten vernieuwd en de pantry en sanitaire ruimte opgefrist in overzichtelijke fases.", tags: ["Bedrijfspand", "Verlichting", "Sanitair", "Onderhoud"], image: images.electric, source: imageSources.electric, alt: "Sfeerbeeld van een elektricien bij een installatiekast" },
      ],
    },
    reviews: {
      eyebrow: "Reviews", title: "Goed werk merkt u aan het resultaat én aan de samenwerking.",
      note: "Voorbeeldreviews — vervang deze vóór definitieve publicatie door geverifieerde klantreacties.",
      label: "Voorbeeldreview",
      items: [
        ["“Vanaf de eerste opname was duidelijk wat er ging gebeuren. Er werd netjes gewerkt, goed meegedacht en de ruimte is precies geworden zoals we hoopten.”", "Opdrachtgever · Badkamerrenovatie"],
        ["“Heel prettig dat één team de leidingen, elektra én afwerking kon verzorgen. Dat maakte de verbouwing een stuk overzichtelijker.”", "Opdrachtgever · Woningverbouwing"],
        ["“Duidelijke afspraken, snel schakelen en een verzorgde oplevering. De werkzaamheden verliepen in rustige, overzichtelijke fases.”", "Opdrachtgever · Bedrijfsruimte"],
      ],
    },
    knowledge: {
      eyebrow: "Blog & kennis", title: "Praktische kennis vóór u beslist.",
      intro: "Heldere uitleg uit de praktijk over planning, techniek en keuzes die later het verschil maken.",
      read: "Lees artikel", close: "Sluit artikel",
      items: [
        { category: "Badkamer · 5 min", title: "Badkamer verbouwen: zo voorkomt u verrassingen", text: "Een goede volgorde van keuzes en werkzaamheden bespaart tijd, herstelwerk en onnodige kosten.", body: "Begin met maatvoering en leidingroutes, bepaal daarna sanitair en verlichting en maak pas vervolgens het tegelplan. Zo sluiten techniek en afwerking op elkaar aan. Reserveer ook tijd voor droging, controle van de ondergrond en een gezamenlijke vooroplevering.", image: images.tiling, source: imageSources.tiling, alt: "Sfeerbeeld van tegelwerk tijdens een renovatie" },
        { category: "Elektra · 4 min", title: "Extra stopcontacten of een nieuwe groep: wat is verstandig?", text: "Waar u op let wanneer uw woning meer apparatuur en aansluitpunten krijgt.", body: "Kijk niet alleen naar het gewenste stopcontact, maar naar de volledige belasting van de groep, de kabelroute en toekomstig gebruik. Zware apparaten vragen vaak een eigen groep. Laat aanpassingen beoordelen en testen door iemand met de juiste vakkennis.", image: images.electric, source: imageSources.electric, alt: "Sfeerbeeld van veilig werk aan een elektrische installatie" },
        { category: "Verbouwen · 6 min", title: "Verbouwen terwijl u thuis blijft wonen", text: "Zeven praktische afspraken die stof, hinder en misverstanden tijdens het werk beperken.", body: "Spreek looproutes, werktijden, afsluitmomenten van water en stroom en dagelijkse schoonmaak vooraf af. Deel de planning per week, houd één ruimte stofvrij en leg vast wie wijzigingen goedkeurt. Dat geeft rust voor bewoners én vakmensen.", image: images.plumbing, source: imageSources.plumbing, alt: "Sfeerbeeld van installatiewerk in een woning" },
      ],
    },
    contact: {
      eyebrow: "Contact", title: "Een plan, klus of verbouwing in gedachten?",
      text: "Vertel ons kort wat u wilt laten uitvoeren. We bekijken de mogelijkheden en nemen contact met u op over een passende vervolgstap.",
      benefits: ["Voor woningen en bedrijfsruimtes", "Eén aanspreekpunt voor meerdere vakgebieden", "Duidelijke afstemming vóór de start"],
      formTitle: "Vertel ons over uw project",
      name: "Naam", email: "E-mailadres", phone: "Telefoonnummer (optioneel)", location: "Postcode en plaats",
      type: "Type project", typePrompt: "Maak een keuze", typeOptions: ["Renovatie of verbouwing", "Elektra", "Water of sanitair", "Badkamer of toilet", "Timmer- of afbouwwerk", "Onderhoud of reparatie", "Anders"],
      timing: "Gewenste startperiode", message: "Uw vraag of plan", messagePlaceholder: "Vertel kort wat er moet gebeuren, waar en wanneer.",
      consent: "Ik ga akkoord met het verwerken van mijn gegevens voor deze aanvraag.", submit: "Verstuur aanvraag",
      demo: "Demoversie: dit formulier bewaart of verzendt nog geen persoonsgegevens. Koppel vóór publicatie het gewenste e-mailadres of formulierenplatform.",
      success: "Bedankt voor uw aanvraag. In deze demo is niets verzonden; de formulierkoppeling kan nu worden toegevoegd.",
    },
    footer: {
      line: "Bouw, techniek en afwerking onder één dak.", navigation: "Navigatie", contact: "Contact",
      contactLine: "Contactgegevens worden vóór publicatie toegevoegd.", closing: "Met aandacht gemaakt. Netjes opgeleverd.",
      imageCredit: "Sfeerbeelden via Pexels",
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
      eyebrow: "Build · Install · Finish",
      titleTop: "One skilled team.", titleAccent: "Your entire project.",
      text: "From electrical, plumbing and heating work to bathrooms, renovations and the finishing touches. Domi Installatie brings every part of the job together in one clear plan.",
      primary: "Discuss your project", secondary: "View our work",
      proofTitle: "Everything aligned.", proofText: "Construction, technical work and finishing carefully coordinated.",
      alt: "Atmospheric image of a professional working on a home renovation",
    },
    ticker: ["Versatile expertise", "Direct communication", "Clear agreements", "Careful completion"],
    about: {
      eyebrow: "About Domi", title: "Everything comes together at Domi.",
      lead: "Construction expertise, technical installations and a sharp eye for finishing — all available from one team.",
      body: "You do not need to coordinate a different contractor for every stage. We think practically, align the work carefully and keep you informed throughout the project. From a focused repair to a complete renovation, we look at the full picture and deliver a result that is ready to use.",
      detail: "One point of contact. Fewer loose ends. More control over the result.",
      imageAlt: "Atmospheric image of precise carpentry work",
    },
    services: {
      eyebrow: "Our expertise", title: "Skilled work at every stage.",
      intro: "From the first connection to the final finish: one point of contact and work that fits together seamlessly.",
      items: [
        ["Electrical & lighting", "Electrical alterations, additional outlets and practical indoor and outdoor lighting."],
        ["Plumbing & sanitary systems", "Pipework, taps, toilets, connections and careful leak repairs."],
        ["Heating", "Radiators, pipework and practical improvements for comfortable, efficient heating."],
        ["Bathrooms & toilets", "Complete renovations, including plumbing, electrical work, tiling, installation and finishing."],
        ["Renovation & remodelling", "Practical improvements to homes and commercial spaces, from layout changes to ready-to-use completion."],
        ["Tiling, plastering & painting", "Clean walls, floors and surfaces that give every room a polished finish."],
        ["Carpentry & installation", "Bespoke details, finish carpentry and careful installation of practical interior solutions."],
        ["Maintenance & repairs", "Small and larger jobs that keep your home or property safe, tidy and fully functional."],
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
      intro: "The projects and images below are examples and can easily be replaced with Domi's own work later.",
      placeholder: "Sample project",
      items: [
        { title: "From dated to everyday comfort", type: "Complete bathroom renovation", text: "Pipework was relocated, electrics adapted and the room rebuilt with new tiling, sanitary fittings and bespoke details.", tags: ["Plumbing", "Tiling", "Electrical", "Finishing"], image: images.bathroom, source: imageSources.bathroom, alt: "Atmospheric image of a modern finished bathroom" },
        { title: "Living, cooking and technical work as one", type: "Ground-floor renovation", text: "A new layout with connections, wall finishes, lighting and careful carpentry brought together as one coherent space.", tags: ["Renovation", "Electrical", "Plumbing", "Carpentry"], image: images.kitchen, source: imageSources.kitchen, alt: "Atmospheric image of a bright renovated kitchen" },
        { title: "A brighter, more practical workplace", type: "Commercial space upgrade", text: "Lighting and outlets were upgraded, while the kitchenette and washroom were refreshed in clearly planned phases.", tags: ["Commercial", "Lighting", "Sanitary", "Maintenance"], image: images.electric, source: imageSources.electric, alt: "Atmospheric image of an electrician at a distribution board" },
      ],
    },
    reviews: {
      eyebrow: "Reviews", title: "Good work shows in both the result and the experience.",
      note: "Sample reviews — replace these with verified client feedback before final publication.",
      label: "Sample review",
      items: [
        ["“From the first visit, it was clear what would happen. The team worked carefully, offered useful ideas and delivered exactly the room we had hoped for.”", "Client · Bathroom renovation"],
        ["“It was great to have one team handle the plumbing, electrical work and finishing. It made the renovation much easier to manage.”", "Client · Home renovation"],
        ["“Clear agreements, responsive communication and a tidy handover. The work progressed in calm, clearly planned phases.”", "Client · Commercial space"],
      ],
    },
    knowledge: {
      eyebrow: "Blog & insights", title: "Practical knowledge before you decide.",
      intro: "Clear advice from the field about planning, technical work and choices that make a difference later.",
      read: "Read article", close: "Close article",
      items: [
        { category: "Bathroom · 5 min", title: "Renovating a bathroom: how to avoid surprises", text: "Making decisions and scheduling work in the right order prevents delays, rework and unnecessary costs.", body: "Start with dimensions and pipe routes, then select sanitary fittings and lighting before making the tiling plan. This ensures the technical work and finish align. Allow time for drying, subfloor checks and a joint pre-handover inspection.", image: images.tiling, source: imageSources.tiling, alt: "Atmospheric image of tiling work during a renovation" },
        { category: "Electrical · 4 min", title: "Extra outlets or a new circuit: what makes sense?", text: "What to consider when your home needs more electrical equipment and connection points.", body: "Look beyond the desired outlet and consider the total circuit load, cable route and future use. Heavy appliances often need a dedicated circuit. Have alterations assessed and tested by someone with the right expertise.", image: images.electric, source: imageSources.electric, alt: "Atmospheric image of safe work on an electrical installation" },
        { category: "Renovation · 6 min", title: "Renovating while continuing to live at home", text: "Seven practical agreements that help reduce dust, disruption and misunderstandings during the work.", body: "Agree on access routes, working hours, water and power shutdowns and daily cleaning in advance. Share a weekly schedule, keep one room dust-free and decide who approves changes. This gives both residents and tradespeople peace of mind.", image: images.plumbing, source: imageSources.plumbing, alt: "Atmospheric image of installation work in a home" },
      ],
    },
    contact: {
      eyebrow: "Contact", title: "Have a project, repair or renovation in mind?",
      text: "Tell us briefly what you would like to have done. We will review the possibilities and contact you to discuss a suitable next step.",
      benefits: ["For homes and commercial spaces", "One point of contact across multiple trades", "Clear coordination before work starts"],
      formTitle: "Tell us about your project",
      name: "Name", email: "Email address", phone: "Phone number (optional)", location: "Postcode and city",
      type: "Project type", typePrompt: "Select an option", typeOptions: ["Renovation or remodelling", "Electrical", "Plumbing or sanitary", "Bathroom or toilet", "Carpentry or finishing", "Maintenance or repair", "Other"],
      timing: "Preferred start period", message: "Your question or plan", messagePlaceholder: "Briefly describe what needs doing, where and when.",
      consent: "I agree to my details being processed for this enquiry.", submit: "Submit enquiry",
      demo: "Demo version: this form does not yet store or send personal data. Connect the preferred email address or form platform before publication.",
      success: "Thank you for your enquiry. Nothing was sent in this demo; the form connection can now be added.",
    },
    footer: {
      line: "Construction, technical work and finishing under one roof.", navigation: "Navigation", contact: "Contact",
      contactLine: "Contact details will be added before publication.", closing: "Built with care. Finished properly.",
      imageCredit: "Atmospheric images via Pexels",
    },
  },
} as const;

export default function DomiSite() {
  const [language, setLanguage] = useState<Language>("nl");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const t = content[language];

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
      ".section-intro, .about-copy, .about-image, .service-card, .process-list li, .project-card, .placeholder-note, .review-card, .knowledge-card, .contact-intro, .contact-form, .footer-top",
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
    const heroImage = document.querySelector<HTMLElement>(".hero-image");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    function updateScrollEffects() {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? Math.min(1, window.scrollY / scrollRange) : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);

      if (heroImage && !reduceMotion.matches && window.scrollY < window.innerHeight * 1.35) {
        heroImage.style.transform = `translate3d(0, ${window.scrollY * 0.075}px, 0) scale(1.055)`;
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
      heroImage?.style.removeProperty("transform");
    };
  }, []);

  function changeLanguage(next: Language) {
    setLanguage(next);
    setMenuOpen(false);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setFormStatus(t.contact.success);
  }

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <div className="scroll-progress" aria-hidden="true" />
        <a className="brand" href="#home" aria-label="Domi Installatie home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><img src="/domi-logo.jpg" alt="" /></span>
          <span className="brand-name"><strong>DOMI</strong><small>Installatie</small></span>
        </a>

        <nav className="desktop-nav" aria-label={t.navLabel}>
          {t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
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
            <a href={href} key={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>
          ))}
          <a className="mobile-quote" href="#contact" onClick={() => setMenuOpen(false)}>{t.quote}<b>↗</b></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <img className="hero-image" src={images.hero} alt={t.hero.alt} fetchPriority="high" />
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
          <a className="image-credit hero-credit" href={imageSources.hero} target="_blank" rel="noreferrer">Pexels ↗</a>
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
            <img src={images.craft} alt={t.about.imageAlt} loading="lazy" decoding="async" />
            <figcaption><span>{language === "nl" ? "Sfeerbeeld" : "Atmospheric image"}</span><a href={imageSources.craft} target="_blank" rel="noreferrer">Pexels ↗</a></figcaption>
          </figure>
        </section>

        <section className="services section-pad" id="diensten">
          <SectionIntro eyebrow={t.services.eyebrow} title={t.services.title} text={t.services.intro} light />
          <div className="service-grid">
            {t.services.items.map(([title, text], index) => (
              <article className="service-card" key={title}>
                <div className="service-top"><span>0{index + 1}</span><i aria-hidden="true" /></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process section-pad" id="werkwijze">
          <SectionIntro eyebrow={t.process.eyebrow} title={t.process.title} />
          <ol className="process-list">
            {t.process.items.map(([title, text], index) => (
              <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </section>

        <section className="projects section-pad" id="projecten">
          <SectionIntro eyebrow={t.projects.eyebrow} title={t.projects.title} text={t.projects.intro} />
          <div className="project-grid">
            {t.projects.items.map((project, index) => (
              <article className="project-card" key={project.title}>
                <figure>
                  <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
                  <span className="placeholder-badge">{t.projects.placeholder}</span>
                  <a className="image-credit" href={project.source} target="_blank" rel="noreferrer">Pexels ↗</a>
                </figure>
                <div className="project-number">0{index + 1}</div>
                <div className="project-copy">
                  <p className="project-type">{project.type}</p><h3>{project.title}</h3><p>{project.text}</p>
                  <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews section-pad" id="reviews">
          <SectionIntro eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
          <p className="placeholder-note">{t.reviews.note}</p>
          <div className="review-grid">
            {t.reviews.items.map(([quote, attribution], index) => (
              <article className="review-card" key={attribution}>
                <div className="review-meta"><span>0{index + 1}</span><span className="stars" aria-label={language === "nl" ? "5 sterren" : "5 stars"}>★★★★★</span></div>
                <blockquote>{quote}</blockquote><p>{attribution}</p><small>{t.reviews.label}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="knowledge section-pad" id="kennis">
          <SectionIntro eyebrow={t.knowledge.eyebrow} title={t.knowledge.title} text={t.knowledge.intro} />
          <div className="knowledge-grid">
            {t.knowledge.items.map((article) => (
              <article className="knowledge-card" key={article.title}>
                <figure><img src={article.image} alt={article.alt} loading="lazy" decoding="async" /><a className="image-credit" href={article.source} target="_blank" rel="noreferrer">Pexels ↗</a></figure>
                <div className="knowledge-copy">
                  <p className="article-meta">{article.category}</p><h3>{article.title}</h3><p>{article.text}</p>
                  <details><summary><span>{t.knowledge.read}</span><i>+</i></summary><p>{article.body}</p></details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-intro">
            <p className="eyebrow"><span />{t.contact.eyebrow}</p><h2>{t.contact.title}</h2><p>{t.contact.text}</p>
            <ul>{t.contact.benefits.map((benefit) => <li key={benefit}><span>✓</span>{benefit}</li>)}</ul>
          </div>
          <form className="contact-form" onSubmit={submitContact}>
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
            <label className="consent"><input type="checkbox" required /><span>{t.contact.consent}</span></label>
            <div className="form-submit"><button className="button button-primary" type="submit">{t.contact.submit}<span>↗</span></button><p>{t.contact.demo}</p></div>
            <p className="form-status" aria-live="polite" role="status">{formStatus}</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><span className="brand-mark"><img src="/domi-logo.jpg" alt="" /></span><div><p>DOMI INSTALLATIE</p><h2>{t.footer.line}</h2></div></div>
          <nav aria-label={t.footer.navigation}>{t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
          <div><p className="footer-label">{t.footer.contact}</p><p>{t.footer.contactLine}</p><a className="footer-contact-link" href="#contact">{t.quote} ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Domi Installatie</span><span>{t.footer.closing}</span><a href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">{t.footer.imageCredit} ↗</a></div>
      </footer>
    </>
  );
}

function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className="section-intro"><div><p className={`eyebrow${light ? "" : " dark"}`}><span />{eyebrow}</p><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="form-field"><span>{label}</span>{children}</label>;
}
