import doorsRaw from "./original-articles/Binnendeuren_hang_en_sluitwerk.html?raw";
import electricityRaw from "./original-articles/electriciteit.html?raw";
import tilesRaw from "./original-articles/tilesandgrout.html?raw";

export type OriginalArticle = {
  slug: string;
  title: string;
  category: string;
  language: "nl" | "en";
  html: string;
  source: string;
};

const repository = "https://github.com/MaartenDominicus/TroosCom/blob/main";

const localImages: Record<string, string> = {
  "doorhangende_deurhendel.jpg": "/blog/doorhangende-deurhendel.jpg",
  "deur_infrezen.JPG": "/blog/deur-infrezen.jpg",
  "scharnier_oud.jpg": "/blog/scharnier-oud.jpg",
  "hoofdschakelaar.jpg": "/blog/hoofdschakelaar.jpg",
  "slechte_verbinding.JPG": "/blog/slechte-verbinding.jpg",
  "verouderde_bedrading.JPG": "/blog/verouderde-bedrading.jpg",
  "half_inbouw.JPG": "/blog/half-inbouw.jpg",
};

function prepareOriginalHtml(raw: string, moveFirstHeading = false) {
  const bodyOpen = raw.match(/<body[^>]*>/i);
  const afterOpen = bodyOpen?.index === undefined ? raw : raw.slice(bodyOpen.index + bodyOpen[0].length);
  const body = afterOpen.split(/<\/body>/i)[0].replace(/<\/html>\s*$/i, "");
  let html = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  if (moveFirstHeading) html = html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, "");

  for (const [source, destination] of Object.entries(localImages)) {
    html = html.replaceAll(`src="${source}"`, `src="${destination}"`);
  }

  return html
    .replaceAll('href="ventilatie.html"', `href="${repository}/ventilatie.html" target="_blank" rel="noreferrer"`)
    .replace(/<img\s+/gi, '<img loading="lazy" decoding="async" ');
}

function addTileHeadingAnchors(html: string) {
  const headings = [
    ["h3", "Tile Size", "tile-size"],
    ["h4", "Half-brick pattern", "half-brick-pattern"],
    ["h4", "Full-brick pattern", "full-brick-pattern"],
    ["h3", "Tile Shape", "tile-shape"],
    ["h3", "Tiling Height", "tiling-height"],
    ["h3", "Tile Edge Corner Types", "tile-edge-corner-types"],
    ["h3", "Tile Surface Finish", "tile-surface-finish"],
    ["h3", "Tile Type (wall or floor)", "tile-type"],
    ["h3", "Exterior Corner Finish", "exterior-corner-finish"],
    ["h3", "Bathroom / Toilet Door Threshold", "bathroom-toilet-door-threshold"],
    ["h3", "Natural Stone", "natural-stone"],
    ["h3", "Grout width", "grout-width"],
    ["h3", "Grout Type", "grout-type"],
    ["h3", "Grout and Sealant Color", "grout-and-sealant-color"],
    ["h2", "Seniors, Limited Mobility, Wheelchair Users", "seniors-limited-mobility-wheelchair-users"],
    ["h2", "Shower", "shower"],
    ["h2", "Bath", "bath"],
    ["h2", "Sink / Vanity", "sink-vanity"],
    ["h2", "1. Sink or Vanity", "sink-or-vanity"],
    ["h3", "Shower Faucet", "shower-faucet"],
    ["h3", "Shower Floor", "shower-floor"],
    ["h3", "Shower Drain", "shower-drain"],
    ["h2", "3. Toilet", "toilet-section"],
    ["h2", "4. Bath", "bath-section"],
    ["h2", "5. Wash Basin/Sink", "wash-basin"],
    ["h2", "6. Mirror", "mirror-section"],
    ["h2", "7. Power Outlets Near Sink", "power-outlets"],
    ["h2", "8. Lighting", "lighting-section"],
    ["h2", "9. Fountain (Small Washbasin for Toilet)", "fountain"],
    ["h2", "11. Heating", "heating"],
    ["h2", "12. Accessories", "accessories"],
  ] as const;

  return headings.reduce(
    (result, [tag, label, id]) => result.replace(`<${tag}>${label}</${tag}>`, `<${tag} id="${id}">${label}</${tag}>`),
    html,
  );
}

export const originalArticles = [
  {
    slug: "veilige-elektrische-installatie",
    title: "Electriciteit",
    category: "Electriciteit",
    language: "nl",
    html: prepareOriginalHtml(electricityRaw, true),
    source: `${repository}/electriciteit.html`,
  },
  {
    slug: "binnendeuren-hang-en-sluitwerk",
    title: "Hang- en sluitwerk: Deursloten, scharnieren en beslag",
    category: "Binnendeuren Renovatie & Hang- en sluitwerk",
    language: "nl",
    html: prepareOriginalHtml(doorsRaw, true),
    source: `${repository}/Binnendeuren_hang_en_sluitwerk.html`,
  },
  {
    slug: "tegels-en-voegen-kiezen",
    title: "Bathroom & Tiles Guide",
    category: "Tiles, grout, standard heights and sizes, design choices and more...",
    language: "en",
    html: addTileHeadingAnchors(prepareOriginalHtml(tilesRaw)),
    source: `${repository}/tilesandgrout.html`,
  },
] as const satisfies readonly OriginalArticle[];

export function findOriginalArticle(slug: string) {
  return originalArticles.find((article) => article.slug === slug);
}
