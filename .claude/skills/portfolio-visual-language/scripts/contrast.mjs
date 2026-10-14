// WCAG contrast check of the live tokens for every theme × accent.
// Usage (dev server running): node .claude/skills/portfolio-looks/scripts/contrast.mjs [url]
// Requires Playwright (see portfolio-ux-patterns/scripts/measure.mjs header).
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3100/";
const themes = ["paper", "stone", "ink", "night"];
const accentsList = ["rust", "cobalt", "moss", "plum"];
// [label, foreground token, background token, minimum ratio]
const pairs = [
  ["text / background", "--fg", "--bg", 4.5],
  ["text / panel", "--fg", "--panel", 4.5],
  ["muted / background", "--muted", "--bg", 4.5],
  ["muted / panel", "--muted", "--panel", 4.5],
  ["muted / hover", "--muted", "--hover", 4.5],
  ["accent text / background", "--accent", "--bg", 4.5],
];

const browser = await chromium.launch();
const rows = [];
for (const look of themes) for (const mode of accentsList) {
  const page = await browser.newPage();
  await page.addInitScript(([t, a]) => { try { localStorage.setItem("nayana-prefs-v2", JSON.stringify({ theme: t, accent: a, onboarded: true })); } catch {} }, [look, mode]);
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const results = await page.evaluate((pairs) => {
    const probe = document.createElement("div"); document.body.appendChild(probe);
    // Resolve a token to an opaque rgb, compositing alpha over --background (gradients: first colour stop).
    const resolve = (token, over) => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      const first = (raw.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/i) || [raw])[0];
      probe.style.color = ""; probe.style.color = first;
      const m = getComputedStyle(probe).color.match(/[\d.]+/g).map(Number);
      const [r, g, b, a = 1] = m;
      if (a >= 1 || !over) return [r, g, b];
      return [0, 1, 2].map(i => [r, g, b][i] * a + over[i] * (1 - a));
    };
    const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
    const base = resolve("--bg");
    return pairs.map(([label, fg, bg, min]) => {
      const B = resolve(bg, base), F = resolve(fg, B);
      const [l1, l2] = [lum(F), lum(B)].sort((a, b) => b - a);
      const ratio = (l1 + .05) / (l2 + .05);
      return { label, ratio: Math.round(ratio * 100) / 100, min, pass: ratio >= min };
    });
  }, pairs);
  for (const r of results) rows.push({ theme: look, accent: mode, ...r });
  await page.close();
}
await browser.close();
const failing = rows.filter(r => !r.pass);
console.table(failing.length ? failing : rows.filter((_, i) => i % 6 === 0));
console.log(failing.length ? `${failing.length} pair(s) below minimum.` : `All ${rows.length} pairs pass.`);
process.exitCode = failing.length ? 1 : 0;
