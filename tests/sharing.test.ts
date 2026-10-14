import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("every shareable page has a social preview image (X, LinkedIn, Slack need og:image)", () => {
  for (const dir of ["src/app", "src/app/experiments", "src/app/work/[slug]"]) {
    assert.ok(fs.existsSync(`${dir}/opengraph-image.tsx`), `${dir} is missing opengraph-image`);
    assert.ok(fs.existsSync(`${dir}/twitter-image.tsx`), `${dir} is missing twitter-image`);
  }
  for (const font of ["instrument-sans-400", "instrument-sans-600"]) assert.ok(fs.statSync(`src/app/_og/${font}.woff`).size > 10000);
});

test("metadata always has an absolute base URL and a large-image card", () => {
  const layout = fs.readFileSync("src/app/layout.tsx", "utf8");
  assert.match(layout, /metadataBase:new URL\(siteUrl\)/);
  assert.match(layout, /summary_large_image/);
  assert.match(fs.readFileSync("src/lib/site.ts", "utf8"), /https:\/\/nayana-builds\.vercel\.app/);
});

test("offline fallback shows real details and the service worker caches it with the résumé", () => {
  const page = fs.readFileSync("public/offline.html", "utf8");
  for (const must of ["nayanak872@gmail.com", "Founding Product Manager", "Open to PM roles", "/assets/nayana-kumari-ai-product-manager-resume.pdf", "location.reload"]) assert.ok(page.includes(must), `offline.html lacks ${must}`);
  const sw = fs.readFileSync("public/sw.js", "utf8");
  for (const asset of ["/offline.html", "/scope-runner.html", "/assets/nayana-kumari-ai-product-manager-resume.pdf"]) assert.ok(sw.includes(`"${asset}"`), `sw.js does not precache ${asset}`);
  assert.ok(fs.existsSync("public/scope-runner.html"));
});
