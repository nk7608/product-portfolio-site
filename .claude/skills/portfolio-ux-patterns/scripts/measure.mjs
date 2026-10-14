// Measures page length and visible word count for every persona × (light, dark) at phone and desktop widths.
// Usage (dev server running):  node .claude/skills/portfolio-ux-patterns/scripts/measure.mjs [url]
// Requires Playwright: `npx playwright install chromium` once, and `playwright` resolvable
// (e.g. `pnpm dlx playwright@1.48.2 --version` or run from a folder where `npm i playwright` was done).
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3100/";
const looks = ["hiring", "building", "curious", "all"];
const modes = ["paper", "ink"];
const sizes = [["mobile", 390, 844], ["desktop", 1440, 900]];
const budget = { mobile: { height: 4500, words: 550 }, desktop: { height: 3200, words: 550 } };

const browser = await chromium.launch();
const rows = [];
for (const [device, width, height] of sizes) for (const look of looks) for (const mode of modes) {
  const context = await browser.newContext({ viewport: { width, height }, isMobile: device === "mobile", hasTouch: device === "mobile" });
  await context.addInitScript(([persona, theme]) => { try { localStorage.setItem("nayana-prefs-v2", JSON.stringify({ persona, theme, onboarded: true })); } catch {} }, [look, mode]);
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  const m = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    const words = main.innerText.split(/\s+/).filter(Boolean).length; // innerText skips collapsed (display:none) sections
    const heroBottom = (document.querySelector("main section") ?? main).getBoundingClientRect().bottom + scrollY;
    const overflow = document.documentElement.scrollWidth > innerWidth + 1;
    return { pageHeight: document.documentElement.scrollHeight, words, heroBottom: Math.round(heroBottom), overflow };
  });
  const b = budget[device];
  rows.push({ device, persona: look, theme: mode, ...m, ok: m.pageHeight <= b.height && m.words <= b.words && !m.overflow, heroFits: m.heroBottom <= height });
  await context.close();
}
await browser.close();
console.table(rows);
const failing = rows.filter(r => !r.ok);
console.log(failing.length ? `${failing.length} combination(s) over budget or overflowing.` : "All combinations within budget.");
process.exitCode = failing.length ? 1 : 0;
