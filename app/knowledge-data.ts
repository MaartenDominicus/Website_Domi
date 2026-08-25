export type KnowledgeArticle = {
  slug: string;
  category: string;
  title: string;
  text: string;
  body: readonly string[];
  image: string;
  alt: string;
  source: string;
  sourceLabel: string;
  updated?: string;
};

const repository = "https://github.com/MaartenDominicus/TroosCom";

export const knowledgeArticlesNl = [
  {
    slug: "veilige-elektrische-installatie",
    category: "Elektra · 6 min",
    title: "Oudere elektrische installatie: waar let u op?",
    text: "Van groepenkast en aarding tot oude bedrading: dit zijn de onderdelen die samen de veiligheid en capaciteit bepalen.",
    body: [
      "Een oudere elektrische installatie hoeft niet automatisch onveilig te zijn, maar vraagt wel om een beoordeling als u gaat verbouwen of meer apparatuur gaat gebruiken. De groepenkast verdeelt de woning over afzonderlijke groepen. Automaten beveiligen tegen overbelasting en kortsluiting; aardlekbeveiliging is een aanvullende bescherming wanneer stroom via een ongewenste weg wegvloeit.",
      "Kijk niet alleen naar de kast. Aarding, kabels, verbindingen en leidingroutes vormen samen één installatie. In oudere woningen kunnen verbindingen los of aangetast zijn en kan de isolatie van bedrading zijn verouderd. Plaatselijk oplappen is dan niet altijd de meest verstandige oplossing: soms is een nieuw, overzichtelijk leidingtracé veiliger en beter uit te breiden.",
      "De benodigde capaciteit hangt af van het gelijktijdige gebruik. Inductiekoken, een oven, warmtepomp, laadpunt of andere zware verbruikers kunnen een aparte groep of een aanpassing van de aansluiting nodig maken. Bepaal daarom eerst wat u nu gebruikt en wat u later wilt toevoegen, voordat wanden en vloeren worden afgewerkt.",
      "Ook de afwerking is een keuze. Inbouw is strak, maar vraagt vaak om frezen en herstelwerk. Opbouw is voordeliger en beter bereikbaar. Via een kruipruimte of bestaande schacht kan soms een nette route worden gemaakt met minder breekwerk. Een installatieplan verbindt dus veiligheid, gebruik en afwerking.",
      "Laat wijzigingen en uitbreidingen ontwerpen, aansluiten en controleren door een vakbekwaam installateur. NEN 1010 is de centrale Nederlandse norm voor nieuwe laagspanningsinstallaties en voor wijzigingen en uitbreidingen. Bij een bestaande installatie kan een uitbreiding ertoe leiden dat ook het beïnvloede bestaande deel moet worden aangepast.",
    ],
    image: "/blog/hoofdschakelaar.jpg",
    alt: "Hoofdschakelaar in een bestaande groepenkast",
    source: `${repository}/blob/main/electriciteit.html`,
    sourceLabel: "Bronartikel Elektra in het TroosCom-archief",
    updated: "Inhoud gecontroleerd aan de hand van NEN-informatie over NEN 1010.",
  },
  {
    slug: "binnendeuren-hang-en-sluitwerk",
    category: "Binnendeuren · 5 min",
    title: "Hang- en sluitwerk in oudere woningen",
    text: "Doorhangende klinken, afwijkende slotmaten en versleten scharnieren vragen vaak om maatwerk in plaats van een standaardvervanging.",
    body: [
      "Een doorhangende deurklink komt bij oudere deuren vaak voor. Een moderne, zwaardere hendel belast de veer van een oud slot meer dan het oorspronkelijke lichte beslag. Een geveerde deurkruk kan helpen, mits het hout rondom het slot sterk genoeg is voor een degelijke bevestiging. Is het slot zelf versleten, dan is volledige vervanging meestal duurzamer.",
      "Bij oude sloten wijken doornmaat, voorplaat en uitsparingen geregeld af van moderne standaarden. Kies daarom eerst een nieuw slot dat de bestaande maatvoering zo dicht mogelijk benadert. Grote verschillen betekenen dat gaten moeten worden gevuld, opnieuw geboord of uitgefreesd. Houd dan ook rekening met herstel van het schilderwerk.",
      "Een vrij-bezetsluiting in een badkamer of toilet vraagt vaak om een ander type insteekslot en extra freeswerk. Ook de sluitplaat in het kozijn moet meestal worden aangepast. Een slot is pas goed vervangen wanneer de deur zonder spanning sluit, de dagschoot netjes aangrijpt en het beslag stabiel blijft.",
      "Versleten scharnieren kunnen een deur laten zakken. Moderne, geschroefde scharnieren zijn vaak relatief eenvoudig te vervangen. Oude of ingebouwde uitvoeringen zijn soms niet meer leverbaar en moeten worden verwijderd, waarna deur en kozijn passend worden gemaakt voor nieuwe scharnieren. Dat is precies het soort werk waarbij de staat van het bestaande hout de aanpak bepaalt.",
      "Een compleet nieuwe deur is niet altijd de snelste uitweg. Oude kozijnen zijn zelden perfect recht, waardoor een nieuwe rechte deur niet vanzelf mooi aansluit. Soms is vervanging van deur én kozijn nodig. Voor betere geluidsisolatie kunnen een massieve deur, kierdichting en eventueel een valdorpel meer effect hebben dan alleen nieuw beslag.",
    ],
    image: "/blog/doorhangende-deurhendel.jpg",
    alt: "Doorhangende deurhendel op een oudere binnendeur",
    source: `${repository}/blob/main/Binnendeuren_hang_en_sluitwerk.html`,
    sourceLabel: "Bronartikel Binnendeuren en hang- en sluitwerk in het TroosCom-archief",
  },
  {
    slug: "tegels-en-voegen-kiezen",
    category: "Badkamer · 7 min",
    title: "Tegels en voegen kiezen voor de badkamer",
    text: "Formaat, maatvastheid, voegbreedte en ondergrond bepalen samen hoe strak het tegelwerk wordt én hoeveel onderhoud het vraagt.",
    body: [
      "Grote tegels geven een rustig beeld, hebben minder voegen en zijn daardoor vaak makkelijker schoon te houden. Ze vragen wel om een vlakke ondergrond. Kleinere tegels volgen een licht golvende wand eenvoudiger, maar zorgen voor meer voegwerk. In een kleine ruimte moet u dus zoeken naar de balans tussen vlak maken, ruimteverlies en het gewenste formaat.",
      "Het legverband beïnvloedt zowel uitstraling als arbeidsduur. Een recht verband is overzichtelijk; halfsteens of diagonale patronen vragen meer uitlijning en snijwerk. Bij een sterk contrasterende voegkleur vallen kleine verschillen in tegelmaat en voegbreedte extra op. Maak daarom vooraf een legplan met zichtlijnen, hoeken, nissen en aansluitingen.",
      "Gerectificeerde tegels zijn na productie nauwkeuriger op maat gemaakt en kunnen doorgaans met een strakkere voeg worden verwerkt. Ook deze tegels hebben toleranties. Niet-gerectificeerde of handgevormde tegels vragen meestal om bredere voegen, zodat maatverschillen netjes kunnen worden verdeeld. Controleer behalve lengte en breedte ook dikte, haaksheid en eventuele kromming.",
      "Voor vloeren is een matte, daarvoor geschikte tegel meestal praktisch: glanzende oppervlakken kunnen glad zijn en wandtegels zijn niet automatisch sterk genoeg voor de vloer. Natuursteen en ongeglazuurde tegels kunnen extra gevoelig zijn voor vocht, vlekken of schoonmaakmiddelen en vragen soms om impregneren en onderhoud.",
      "Cementgebonden voegmortel is gangbaar en voordelig, maar kan gevoeliger zijn voor verkleuring en vuil. Reactiehars- of composietvoegen zijn duurder, maar kunnen in intensief gebruikte of licht gevoegde vloeren makkelijker te onderhouden zijn. Kies voeg- en kitkleur samen; elke extra kleurwisseling kost meer tijd en maakt kleine afwijkingen zichtbaarder.",
      "Werk in natte ruimtes begint altijd onder de tegel. Een stabiele, vlakke ondergrond, correcte waterdichting, goede afschotvorming en nette aansluitingen bij dorpel, afvoer en leidingdoorvoeren bepalen de levensduur. Leg materiaalkeuzes en detaillering daarom vast vóórdat de tegelzetter start.",
    ],
    image: "/blog/badkamer-tegels.jpg",
    alt: "Badkamer met tegelwerk uit het eigen projectarchief",
    source: `${repository}/blob/main/tilesandgrout.html`,
    sourceLabel: "Bronartikel Tiles and Grout in het TroosCom-archief",
  },
] as const satisfies readonly KnowledgeArticle[];

export const knowledgeArticlesEn = [
  {
    ...knowledgeArticlesNl[0],
    category: "Electrical · 6 min",
    title: "Older electrical systems: what should you check?",
    text: "From the distribution board and earthing to old wiring: these parts jointly determine safety and capacity.",
    body: [
      "An older electrical system is not automatically unsafe, but it should be assessed when you renovate or add more equipment. The distribution board separates the home into circuits. Circuit breakers protect against overload and short circuit, while residual-current protection adds protection when current flows along an unintended path.",
      "Do not look at the board in isolation. Earthing, cables, connections and routes form one system. Older homes may contain loose or deteriorated connections and wiring with ageing insulation. A local patch is not always the best answer; a new, clearly planned route may be safer and easier to extend.",
      "Required capacity depends on simultaneous use. Induction cooking, ovens, heat pumps, EV chargers and other heavy loads may require a dedicated circuit or an upgraded supply. List current and future equipment before walls and floors are finished.",
      "Finishing is part of the decision. Concealed wiring looks clean but often requires chasing and repair. Surface-mounted wiring costs less and stays accessible. A crawl space or existing shaft may provide a tidy route with less demolition.",
      "Have alterations designed, connected and verified by a qualified electrician. NEN 1010 is the central Dutch standard for new low-voltage installations and for alterations and extensions. Extending an existing system can also require work to the affected existing section.",
    ],
  },
  {
    ...knowledgeArticlesNl[1],
    category: "Interior doors · 5 min",
    title: "Door hardware in older homes",
    text: "Drooping handles, non-standard lock sizes and worn hinges often need bespoke work instead of a standard replacement.",
    body: [
      "A drooping handle is common on older doors. A modern, heavier lever puts more strain on the spring in an old lock than the original lightweight hardware. A sprung lever may help when the surrounding timber is sound enough; if the lock is worn, full replacement is generally more durable.",
      "Old locks often differ from modern standards in backset, faceplate and recess dimensions. Start with a replacement that is as close as possible to the existing measurements. Larger differences mean filling, drilling or routing the door and repairing paintwork afterwards.",
      "A privacy lock for a bathroom or WC often needs a different mortice lock and extra routing. The strike plate in the frame usually needs adjustment too. The job is complete only when the door closes without tension, the latch engages neatly and the hardware stays firm.",
      "Worn hinges can make a door sag. Modern screw-fixed hinges are often straightforward to replace. Older integrated types may no longer be available and can require removal, followed by adapting the door and frame for new hinges.",
      "A new door is not always the easy answer. Older frames are rarely perfectly square, so a straight new door will not automatically fit neatly. For better sound insulation, a solid door, perimeter seals and possibly a drop seal may achieve more than new hardware alone.",
    ],
  },
  {
    ...knowledgeArticlesNl[2],
    category: "Bathroom · 7 min",
    title: "Choosing bathroom tiles and grout",
    text: "Format, dimensional accuracy, joint width and substrate determine both the finish and the maintenance required.",
    body: [
      "Large tiles create a calm appearance, use fewer joints and are often easier to clean. They do, however, require a flat substrate. Smaller tiles follow a slightly uneven wall more easily but create more grout lines. In a small room, balance levelling work, loss of space and the preferred format.",
      "The layout affects appearance and labour. A straight grid is efficient, while running-bond or diagonal patterns need more alignment and cutting. Strongly contrasting grout makes small differences in tile size and joint width more visible. Prepare a layout for sightlines, corners, niches and fittings before work begins.",
      "Rectified tiles are machined more accurately after firing and can generally use a tighter joint. They still have tolerances. Non-rectified or handmade tiles usually need wider joints to absorb size variation. Check thickness, squareness and bowing as well as length and width.",
      "A matte, floor-rated tile is generally practical underfoot; polished surfaces can be slippery and wall tiles are not automatically strong enough for floors. Natural stone and unglazed tiles may be more sensitive to moisture, stains or cleaning products and can require sealing and maintenance.",
      "Cement-based grout is common and economical but can be more sensitive to staining and discolouration. Resin or composite grout costs more, yet can be easier to maintain on heavily used or light-coloured floors. Choose grout and sealant colours together.",
      "Wet-room work starts underneath the tile. A stable and level substrate, correct waterproofing, adequate falls and careful details at thresholds, drains and pipe penetrations determine service life. Finalise materials and details before tiling begins.",
    ],
  },
] as const satisfies readonly KnowledgeArticle[];

export function findKnowledgeArticle(locale: "nl" | "en", slug: string) {
  const articles = locale === "nl" ? knowledgeArticlesNl : knowledgeArticlesEn;
  return articles.find((article) => article.slug === slug);
}
