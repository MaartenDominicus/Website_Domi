import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const buildRoot = join(projectRoot, "dist");
const outputRoot = join(projectRoot, "out");
const workerPath = join(buildRoot, "server", "index.js");

const projectSlugs = [
  "badkamer-toilet-amsterdam",
  "complete-renovatie-amsterdam",
  "complete-renovatie-rotterdam",
  "tuinhuis-amsterdam",
  "riolering-apeldoorn",
  "vloerverwarming-kampen",
];

const knowledgeSlugs = [
  "veilige-elektrische-installatie",
  "binnendeuren-hang-en-sluitwerk",
  "tegels-en-voegen-kiezen",
  "verborgen-waterlek-opsporen",
  "warmwatertoestel-kiezen",
  "signalen-elektrische-problemen",
  "badkamerventilator-kiezen",
  "leidingnoodgeval-eerste-stappen",
];

const routes = [
  "/",
  "/en",
  "/privacy",
  "/voorwaarden",
  ...projectSlugs.flatMap((slug) => [`/projecten/${slug}`, `/en/projects/${slug}`]),
  ...knowledgeSlugs.flatMap((slug) => [`/kennis/${slug}`, `/en/insights/${slug}`]),
];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(join(buildRoot, "client"), outputRoot, { recursive: true });
await writeFile(join(outputRoot, ".nojekyll"), "");

try {
  const domain = (await readFile(join(projectRoot, "CNAME"), "utf8")).trim();
  if (domain) await writeFile(join(outputRoot, "CNAME"), `${domain}\n`);
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const { default: worker } = await import(`${pathToFileURL(workerPath).href}?static-export=${Date.now()}`);
const platform = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const executionContext = { waitUntil() {}, passThroughOnException() {} };

async function render(route) {
  const response = await worker.fetch(
    new Request(`https://www.matrisbouw.nl${route}`, { headers: { accept: "text/html" } }),
    platform,
    executionContext,
  );
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200 || !contentType.startsWith("text/html")) {
    throw new Error(`Static export failed for ${route}: ${response.status} ${contentType}`);
  }
  const html = await response.text();
  const outputPath = route === "/" ? join(outputRoot, "index.html") : join(outputRoot, route.slice(1), "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

for (const route of routes) await render(route);

const notFoundResponse = await worker.fetch(
  new Request("https://www.matrisbouw.nl/__static-export-not-found__", { headers: { accept: "text/html" } }),
  platform,
  executionContext,
);
await writeFile(join(outputRoot, "404.html"), await notFoundResponse.text());

console.log(`Exported ${routes.length} routes to ${outputRoot}`);
