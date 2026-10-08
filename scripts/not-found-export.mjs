// Error documents are shared by every missing URL on static hosting.
// They must not inherit the homepage's identity or language alternates.
export async function notFoundDocument(response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 404 || !/^text\/html\b/i.test(contentType)) {
    throw new Error(`404 export requires an HTML 404 response: ${response.status} ${contentType}`);
  }
  const html = await response.text();
  if (!/<head\b[^>]*>[\s\S]*?<\/head>/i.test(html)) {
    throw new Error("404 export has no document head");
  }
  return html.replace(/(<head\b[^>]*>)([\s\S]*?)(<\/head>)/i, (_, start, head, end) => {
    const cleaned = head
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
      .replace(/<meta\b[^>]*(?:name=["'](?:robots|description|keywords|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, "")
      .replace(/<link\b[^>]*rel=["'](?:canonical|alternate)["'][^>]*>/gi, "");
    return `${start}${cleaned}<title>Pagina niet gevonden | Domi Installatie</title><meta name="robots" content="noindex">${end}`;
  });
}
