# Research: a minimal, human, personalised PM portfolio (Oct 14, 2026)

Sources: Firecrawl (web search + branding extraction of live sites) and Mobbin (screens, flows, sections). The decisions here are encoded in four skills under `.claude/skills/`; this file keeps the evidence.

## What the sources agree on

**Hiring managers skim.** A portfolio homepage gets 10–15 seconds before a 2–3 minute review; recruiters rarely read more than 3–4 case studies; "curated, not comprehensive"; show trade-offs, not process (The Fountain Institute, *What actually gets senior product designers hired in 2026*; HelloPM *PM portfolio guide*; Seera *PM portfolio example*: "three to five case studies, each written as the problem, the decision, the outcome"). A Reddit r/UXDesign poll of hiring managers: more than half prefer clean, minimal sites.

**What reads as AI-generated.** DesignCode (*How to avoid AI slop in vibe-coded landing pages*, Jun 2026): "lazy selected states, oversized eyebrows, random status pills, glow lights, purple gradients, generic illustrations, default fonts". Beaver Builder (*Avoid AI slop in web design*): "headlines filled with italicized words, gradients, dramatic three-part slogans … glassmorphism, translucent cards, floating gradients, and boxes nested inside other boxes". 925 Studios: "semantic color systems over decorative gradients". MindStudio: "use exact hex values"; tell the tool what *not* to do. The previous version of this site had glass cards, gradient edges and halos, a serif-italic accent headline, mono uppercase eyebrows on every block and several status pills — most of the list.

**Trends worth following (and not).** Davey & Krista, *Design trends you'll actually see in 2026*: "warm over perfect" — swap stark white/grey for warm neutrals (cream, stone, mocha). Figma *Web design trends 2026* reports a return of saturated colour; for a portfolio where the work is the content we keep saturation to one accent and the product illustrations.

## Reference sites (Firecrawl branding extraction)

| Site | Type | Colours | Layout and density |
|---|---|---|---|
| emilkowal.ski | Inter-like sans, h1 = body = 14–16px | bg `#FDFDFC`, text `#21201C`, muted `#63635E`, pill buttons | One column; "Today" paragraph; Projects and Writing as title + one-line description lists; newsletter; "More" links |
| paco.me | Söhne / Inter, h1 16px | white, text `#3A3A3A`, blue links | Name, one italic phrase, two lines of bio; Building / Projects / Writing / Now / Connect, each item = title + one line |
| rauno.me | system sans, 32px display | bg `#EDEDED`, text `#171717`, yellow highlight | A sentence as the hero; a row of links; "Email — Copied" interaction; seven short lines of principles |
| calwyn.app/u/nayana | system sans | warm off-white | Avatar, positioning, Open-to-work pill, three icon links; About; three small widgets; Experience list with duration |

Shared pattern: one ~600–680px column, headings the same size as body (hierarchy from weight and spacing), one muted grey, one link/accent colour, one-line entries, personal "Now" details, copy-to-clipboard email. No cards, no gradients.

## Mobbin patterns, section by section

**Header.** Waka Waka index page — [section](https://mobbin.com/sites/sections/fe089d5d-5adb-4849-a282-ae46d8fd7eac): studio name, three words of nav and "LOS ANGELES, CA 01:59 ●" — local time as a human detail. → name + "Bangalore 13:41" + ⌘K + settings.

**Hero.** Calwyn and Fiverr (profile + status + one primary action). → name, two-line positioning, "Open to PM roles · Bangalore · Remote or hybrid · Europe & US hours" as plain text with one green dot (not pills), copyable email + three text links, one row of three outcomes.

**Experience / experiments index.** Waka Waka — numbered rows (N°0001) with aligned columns; A24 — [section](https://mobbin.com/sites/sections/b645a881-adf5-43f3-a86c-758cd54f0b72) — titles with the year beside them. → numbered rows: N° · logo · role · company · year · duration · one result; click to open the brief in place.

**Case brief.** Attio customer story (Challenge | Solution | Results). → TL;DR, three short columns, a "Scope, release notes and what I'd change" disclosure, then the full write-up page.

**Onboarding.** Xero — [flow](https://mobbin.com/flows/215632ce-e64c-4fc6-bff6-427026f68ce9): three-segment progress bar, one question with 2–6 option cards, "This helps personalise your setup guide", Back/Next. Jasper — [flow](https://mobbin.com/flows/10732fd6-f1f1-4e21-bc58-b60592f6ddae): "what do you want to work on?" then a personalised home with recents. Mindvalley (via Mobbin): choose areas, pre-selected chips, Skip. → three steps (persona → what to show first → comfort), Skip on every step, a "Arranged for … Change" note on the page afterwards.

**User controls.** Matter reader panel — [screen](https://mobbin.com/screens/fc0a02b9-f5b6-4ca3-9d08-3bd6872738c3): theme swatches (White / Sepia / Paper / Dawn), font, font size, spacing, width, "Reset to default". X display — [screen](https://mobbin.com/screens/e00feb2a-5421-448c-a2af-98f4313c9ab9): font-size slider, six accent dots, background Default / Lights out. Perplexity — [screen](https://mobbin.com/screens/27ad8f42-8906-4552-a56d-01c4c15e69dd): theme thumbnails + serif/sans "Aa" choice. Asana display: compact mode, colour-blind friendly mode. → Settings sheet: Theme (System, Paper, Stone, Ink, Night), Accent (4 dots), Typeface (Sans/Serif), Text size (3), Detail (Skim/Full), Motion (Match device/Off), "Show me the page as" (persona), Replay intro, Reset.

**Command menu.** Mistral — [screen](https://mobbin.com/screens/8450c1c7-7c10-40a3-9af3-c9c234ac4b53), Magnific — [screen](https://mobbin.com/screens/e22e26e2-f813-4f1e-beda-43c9ecf26419), Vapi: grouped results (Actions, Navigation, Settings) with keyboard hints. → ⌘K: Go to (sections), Roles, Contact (copy email, write, résumé, LinkedIn), Appearance (themes, detail, typeface, settings, change persona).

## Decisions

| Topic | Decision | Why |
|---|---|---|
| Fonts | Instrument Sans (UI/body), Newsreader (optional serif reading), system mono only for `kbd` | Not the Geist/Inter default; warm humanist sans; a real reading serif for those who prefer it |
| Type scale | Body 15.5px (14 / 17.5 by setting; serif 17px), section heads = body size in 600 weight, name 1.45em | Matches the reference sites; hierarchy by weight, not size |
| Light | Paper `#FBFAF7` / ink `#1F1E1B` / muted `#68655F` / rule `#E6E3DC`; Stone `#F6F7F8` / `#1A1C1E` | Warm neutral (2026 trend) with a cool alternative |
| Dark | Ink `#1A1917` / `#ECE9E3` / muted `#A9A59D`; Night `#0B0B0C` / `#EDEDEE` | Warm charcoal by default, near-black for OLED fans |
| Accent | Rust `#B4441F` (dark `#F08A62`), Cobalt `#2F5BD3`, Moss `#3D7838`, Plum `#8A3A6A` | One accent at a time; all ≥ 4.5:1 as text |
| Information per page | Hero ≤ 1 screen; rows are one line (+ one result line); ≤ 6 sections; ≤ 550 visible words and ≤ 3,200px desktop / 4,500px mobile with unchosen sections collapsed | From the 10–15 second skim and the reference sites |
| Effects | None decorative. Hover = colour change; open = accent + rotated "+"; focus ring | Removes the AI tells |
