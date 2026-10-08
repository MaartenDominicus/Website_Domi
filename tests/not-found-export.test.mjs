import assert from "node:assert/strict";
import test from "node:test";
import { notFoundDocument } from "../scripts/not-found-export.mjs";

test("404 export rejects successful, failed and non-HTML responses", async () => {
  for (const status of [200, 301, 500]) {
    await assert.rejects(notFoundDocument(new Response("error", { status, headers: { "content-type": "text/html" } })), /HTML 404/);
  }
  await assert.rejects(notFoundDocument(new Response("missing", { status: 404 })), /HTML 404/);
  await assert.rejects(notFoundDocument(new Response("missing", { status: 404, headers: { "content-type": "text/html" } })), /document head/);
});
