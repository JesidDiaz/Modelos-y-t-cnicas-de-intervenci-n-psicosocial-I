import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://ova.example.edu/", {
      headers: { accept: "text/html", host: "ova.example.edu" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the academic course shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="es"/i);
  assert.match(html, /<title>Modelos y técnicas de intervención psicosocial I<\/title>/i);
  assert.match(html, /Saltar al contenido/);
  assert.match(html, /Maestría en Intervención Psicosocial/);
  assert.match(html, /Tres unidades, cinco lentes complementarios/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /Starter Project|codex-preview|Building your site/i);
});

test("keeps the complete learning architecture and safeguards in source", async () => {
  const [page, data, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/course-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  const modules = {
    ibc: "ibc",
    empoderamiento: "emp",
    ecologico: "eco",
    redes: "red",
    "educacion-popular": "ep",
  };

  for (const [id, prefix] of Object.entries(modules)) {
    assert.match(data, new RegExp(`id: "${id}"`));
    for (let question = 1; question <= 5; question += 1) {
      assert.match(data, new RegExp(`id: "${prefix}-${question}"`));
    }
  }

  for (let question = 1; question <= 5; question += 1) {
    assert.match(data, new RegExp(`id: "final-${question}"`));
  }

  assert.match(page, /localStorage\.setItem/);
  assert.match(page, /noopener noreferrer/);
  assert.match(page, /Modo presentación/);
  assert.match(data, /youtube-nocookie\.com/);
  assert.match(page, /Abrir Padlet/);
  assert.match(page, /Abrir Quizizz/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-height:\s*44px/);
});
