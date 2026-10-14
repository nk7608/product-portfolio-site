# Patterns to borrow

Each pattern: where it comes from, what to take, what to leave behind, and where it lands on this site. Mobbin links are the canonical references (open them for the full screen).

## 1. Compact profile header — Calwyn, Fiverr, Handshake

- **Calwyn profile (calwyn.app/u/nayana)**: avatar + name + one-line positioning on the left; location and an "Open to work" pill on the right; three icon links (LinkedIn, site, email). The whole identity fits in ~120px.
- **Fiverr profile** — [screen](https://mobbin.com/screens/78d6e600-7316-4af5-83f2-c246c30dc198): status badges under the name, then exactly two buttons (Saved / Contact), with the primary one filled.
- **Handshake "Looking for"** — [screen](https://mobbin.com/screens/f6f917da-3f37-4d05-a7e9-66e717c3cea9): what the person wants, as a cluster of tags.

Take: status as a tag cluster (Open to work · Bangalore · Remote or hybrid · Europe & US hours), one primary action, icon links. Leave: follower counts, ratings, anything that reads like a marketplace listing.
Lands on: hero. The big serif headline can stay as the look's signature, but the description shrinks to one sentence and the hero must fit the first phone viewport.

## 2. Binary/ternary persona fork — Craft Agency

- **Craft Agency** — [section](https://mobbin.com/sites/sections/093daad4-fbb6-402b-8d80-9c3b63a2c30e): "I'm hiring" / "I'm looking" as two side-by-side buttons under one line of copy.

Take: the persona choice as 2–3 compact buttons in a single row, not a large card with descriptions. Leave: anything that blocks the page until answered.
Lands on: the persona lens (segmented control).

## 3. One question per screen (for an optional richer intro only) — Brilliant, pliability, NYT

- **Brilliant onboarding** — [flow](https://mobbin.com/flows/7ffbd4f0-78d1-49be-bf0d-9c90cac00e8c): one question, 3–4 large answer cards with an icon + bold first phrase, progress bar on top, Continue pinned at the bottom.
- **pliability "Tailoring content"** — [flow](https://mobbin.com/flows/ba530414-fbc6-4e1f-a353-bbed6c52305a): "2/2" counter, Skip in the corner, answers as full-width rows.
- **NYT "Setting up You"** — [flow](https://mobbin.com/flows/292d650a-8180-4201-a75d-2c75495b0374): two steps max, then a review screen of what was picked.

Take: if a typeform-like intro exists, it is ≤2 questions, has Skip, shows progress, and ends by landing on the normal page with the lens set. Leave: account walls, social-proof interstitials, fake "personalising…" loaders.

## 4. Experience as a compact list — Calwyn, Behance

- **Calwyn Experience**: logo · "Role · Company" · location · dates | duration · chevron. Four roles in ~280px on mobile.
- **Behance About** — [screen](https://mobbin.com/screens/f93853d1-96a4-49df-8229-81d87a677558): Work / About segmented toggle; About is a plain stacked list of role + company — place.

Take: one row per role; the chevron expands the brief inline. Add one result per row (the thing Calwyn lacks): "Founding PM · Vidrush — Jan–Sep 2026 · 10% → 40% higher-tier adoption". A thin connector line between logos carries the "one role builds on the next" journey without a separate section.
Lands on: merged Career flow + Shipped work → Experience.

## 5. Metric-first proof — Webflow customers, komoot

- **Webflow customer grid** — [section](https://mobbin.com/sites/sections/3502f1dd-e1b0-4ae9-bd67-7ec2228ffca7): big number ("$200M") with a 4–6 word label under each card.
- **komoot profile** — [screen](https://mobbin.com/screens/a93ef0fb-2385-432c-9205-682ec544f0a6): 2×2 stat tiles, number on top, label below, chevron to drill in.

Take: ≤3 tiles, number first, label ≤5 words, tap → definition. On mobile, a 3-up row of small tiles or a horizontal scroller, never three full-width stacked panels.

## 6. Case brief layout — Attio, Tailscale

- **Attio customer story** — [section](https://mobbin.com/sites/sections/17d20552-2b39-4321-9e15-8c0625596ec8): Challenge | Solution side by side, then Results as a short checklist; metadata (industry, size, founded) in a left rail; long story below.
- **Tailscale case study** — [section](https://mobbin.com/sites/sections/84f94fa1-216c-40e9-aa21-d4b6e8039f5b): title, tags, hero image, metadata sidebar (company, website, industry).

Take: inside an expanded brief, show TL;DR (one line) → Challenge / Approach / Results (2–3 bullets each) → metadata (role, dates, team, links). Everything else (product context, decisions, release notes, alignment, reflection) goes behind "Full brief" or onto `/work/[slug]`.

## 7. Cards with a chip on the cover — Contra, Shade

- **Contra case cards** — [section](https://mobbin.com/sites/sections/005afd6c-c2e6-4b81-8b19-b0453d4871df): cover with a small uppercase chip ("+$20K SAVED", "700+ PROJECTS"), title below in two lines.
- **Shade** — [section](https://mobbin.com/sites/sections/2d100fc2-36d8-4f1f-94e5-f1a21ea17c98): label row "CASE STUDY [ ] · READ" above the image, title + one-line subtitle below.

Take: experiment cards = cover scene + chip ("Case study + prototype" / "Independent") + name + one-line title. Summary and boundary note move into the expanded state.

## 8. Small personal widgets — Calwyn

- **Calwyn widget row**: "On repeat" song card with Play, an analog clock labelled with the city, "Suggested read" book cover. Three equal-height tiles, one row.

Take: Off the clock becomes one row of three widgets (Fix You player, Bangalore clock or pitstops, current book). Scope Runner becomes a small link inside the row, not a fourth card.

## 9. Theme picker as real previews — Cal.com, Wrike, Revolut Business

- **Cal.com appearance** — [screen](https://mobbin.com/screens/f561880a-1845-4179-904d-3c3aa8941090): three thumbnails that are miniature renders of the real page, label under each, selected one outlined.
- **Revolut Business** — [screen](https://mobbin.com/screens/d6ff3090-344e-4121-965a-3530f2ebe12b): mode row + background swatch row, separate concerns.

Take: the appearance dialog shows actual mini-renders of the hero in each look, and separates Look (4) from Mode (light/dark/system). See `portfolio-looks`.

## 10. Sticky contact on mobile — Fiverr

Fiverr keeps Contact reachable. Take: once the header scrolls out of view on phones, show a slim bottom bar with Email (primary) and Résumé. Hide it when the contact section is on screen.

---

## Round 2 (Oct 14, 2026): minimal, human, controllable

## 11. Hand-made personal sites — Emil Kowalski, Paco Coursey, Rauno Freiberg (Firecrawl branding extraction)
One ~640px column; headings the same size as body (14–16px) and set apart by weight; warm off-white `#FDFDFC` with `#21201C` text and one muted grey; Projects/Writing as title + one-line lists; a "Now"/"Today" paragraph; copy-to-clipboard email. → Whole homepage. Details in `docs/RESEARCH-2026-10.md`.

## 12. Numbered index rows with local time — Waka Waka, A24
- **Waka Waka** — [section](https://mobbin.com/sites/sections/fe089d5d-5adb-4849-a282-ae46d8fd7eac): N°0001 rows with aligned columns; "LOS ANGELES, CA 01:59 ●" in the header.
- **A24** — [section](https://mobbin.com/sites/sections/b645a881-adf5-43f3-a86c-758cd54f0b72): titles with the year set small beside them.
→ Experience, Experiments and Writing rows; "Bangalore 13:41" in the header.

## 13. Onboarding that personalises a home — Xero, Jasper
- **Xero** — [flow](https://mobbin.com/flows/215632ce-e64c-4fc6-bff6-427026f68ce9): 3-segment progress, one question, option cards, "This helps personalise your setup guide", Back/Next.
- **Jasper** — [flow](https://mobbin.com/flows/10732fd6-f1f1-4e21-bc58-b60592f6ddae): "What do you want to work on?" then a home arranged around the answer.
→ The 3-step intro and the "Arranged for … Change" note. See `portfolio-onboarding-journeys`.

## 14. Reader-style settings — Matter, X, Perplexity
- **Matter** — [screen](https://mobbin.com/screens/fc0a02b9-f5b6-4ca3-9d08-3bd6872738c3): theme swatches, font, size, spacing, width, "Reset to default".
- **X display** — [screen](https://mobbin.com/screens/e00feb2a-5421-448c-a2af-98f4313c9ab9): size slider, accent dots, background choice.
- **Perplexity** — [screen](https://mobbin.com/screens/27ad8f42-8906-4552-a56d-01c4c15e69dd): theme thumbnails and a serif/sans "Aa" choice.
→ The Settings sheet. See `portfolio-user-controls`.

## 15. Command menu — Mistral, Magnific
- **Mistral** — [screen](https://mobbin.com/screens/8450c1c7-7c10-40a3-9af3-c9c234ac4b53) and **Magnific** — [screen](https://mobbin.com/screens/e22e26e2-f813-4f1e-beda-43c9ecf26419): grouped results, keyboard hints, actions + navigation + settings in one list.
→ ⌘K menu.
