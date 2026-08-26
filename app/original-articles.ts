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
    .replaceAll('class="collapsed"', 'class="expanded"')
    .replace(/<button\s+/gi, '<button type="button" disabled ')
    .replace(/<img\s+/gi, '<img loading="lazy" decoding="async" ');
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
    html: prepareOriginalHtml(tilesRaw),
    source: `${repository}/tilesandgrout.html`,
  },
] as const satisfies readonly OriginalArticle[];

export function findOriginalArticle(slug: string) {
  return originalArticles.find((article) => article.slug === slug);
}
