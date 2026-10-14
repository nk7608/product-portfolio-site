# Pitfalls to avoid

Each of these happened on this site. The "seen as" line says how to recognise it again.

## Information density
1. **Same content in two sections.** Career flow and Shipped work both listed the same four companies with the same headline metric. *Seen as:* a company name appearing twice before any tap. Fix: one Experience list.
2. **Metrics in three places.** Proof panel, career card and brief summary all showed "10% → 40%"; the opened brief showed them a fourth time. *Seen as:* identical numbers within one scroll.
3. **Chips repeated.** Location/availability chips in hero and again in contact. Keep them once near the top; contact just links.
4. **Paragraph intros under every heading.** If the heading says it, drop the paragraph.
5. **Everything expanded by default.** Six experiment cards × (cover + summary + boundary + links) ≈ three phone screens. Default to collapsed or a carousel.

## Tone
6. **Pitch copy on a portfolio.** "What should we build next?", "I turn unclear customer problems into products that ship, get adopted, and support revenue". Write facts, not claims.
7. **Too many CTAs.** Hero, rail, route card, contact panel and footer all asked for contact. One primary contact action on screen at a time (plus the mobile sticky bar).

## Navigation and modes
8. **Tour mode that hides sections.** Guided routes set `hidden` on non-current chapters and added Back/Next — the visitor loses the scroll they expect. Use a lens that reorders, not a wizard that hides.
9. **Six-tile chapter grid on mobile.** It consumed a full screen before any content. On phones, navigation is the header menu plus the lens; no in-page grid.
10. **Floating controls over content.** The "A/B experimentation" pill sat on top of route options on a 390px screen. On mobile, move the look switcher into the menu/footer.

## Visuals
11. **Marketing banners as covers.** LinkedIn banners (ads, stock photo, "Join us at phas.io") said nothing about the work. Covers must depict the product or the decision.
12. **Illustration behind text.** On phones the cover scene sat faded under the caption. Stack image and text.
13. **Background gradients ending in a hard edge.** A `background-size` tiled atmosphere stopped mid-page. Use the viewport-fixed atmosphere layer.
14. **Tiny scene text on small screens.** SVG labels at 10px in a 516-wide viewBox become ~6px on a 340px card. On mobile, prefer the scene without text-heavy panels, or let it scale to full width.

## Mechanics
15. **Hover-only affordances.** Spotlight/lift are fine, but every action must also be visible without hover.
16. **Width-based CSS cascade bugs.** A later unscoped rule (`.work-summary>.product-cover{height:224px}`) silently beat the mobile rule. Put base rules before media queries and scope consistently.
17. **Measuring by eye.** "Feels shorter" isn't a check; run `scripts/measure.mjs` and compare with the budgets.

## Round 2 (Oct 14, 2026)
18. **Looking generated.** Glass, gradient edges, halos, italic-accent headline, mono eyebrows, chip rows — each was added to "polish" the site and together they read as AI output. See `portfolio-visual-language/references/anti-slop.md`.
19. **Four "looks" that were really four layouts.** Themes should change colour and type only; the new Paper/Stone/Ink/Night × accent system does exactly that.
20. **A guided tour as the only personalisation.** Personalisation now arranges the normal page and says so ("Arranged for … Change").
21. **Controls with no reset or no visible entry point.** Every control has a visible button, a ⌘K entry where useful, and "Reset to default".
22. **Font variables on `<body>` while `[data-font]` lives on `<html>`.** The serif setting silently did nothing until the font classes moved to `<html>`.
23. **Client-side links to a hash don't fire `hashchange`.** Next `<Link href="/#work">` uses pushState, so a collapsed section never opened. Use `HashLink` (sets `location.hash` on the homepage).
24. **Resetting dialog state in an effect + rAF.** Closing and reopening ⌘K within one frame cancelled the reset, leaving old search text; the intro showed the previous choice for a frame. Mount dialog contents only while open so state initialises fresh (`Sheet` does this).
25. **Intro on deep links.** A first visit straight to `/work/...` was interrupted by the intro; it now only opens on `/`.
26. **Footer filler.** "Built by hand…" said nothing useful; the footer now carries contact, pages and the visitor's controls.
27. **Shared links with no preview.** The site sent `twitter:card=summary_large_image` but no `og:image`/`twitter:image` and no absolute base URL, so X showed a bare link. Every shareable route now has `opengraph-image.tsx` + `twitter-image.tsx` (rendered at build by `src/lib/og.tsx`) and `metadataBase` comes from `src/lib/site.ts`. Check with `curl -A Twitterbot <url> | grep og:image`. X caches cards for days; re-share or add `?v=2` after fixing.
28. **The offline fallback was a game.** `offline.html` is now a static summary (role, outcomes, contact, résumé); the game lives at `/scope-runner.html`. `sw.js` serves the last-seen copy of a page first, then `offline.html`, and keeps a saved résumé. Test a real outage by stopping the server — Playwright's `setOffline` doesn't apply to service-worker requests.
