# Improvement backlog (applies this skill to the current code)

Ordered by impact on "too much to read". Each item names the files it touches. Re-run `scripts/measure.mjs` after each.

## P0 — length and repetition
1. **Merge Career flow + Shipped work into one Experience list.** `portfolio-home.tsx` (`#journey`, `#work`), `work-story.tsx`, `src/lib/journey.ts` (drop the `journey` chapter, keep anchors redirecting to `#work`). Row = logo, role · company, dates · duration, one result, chevron. Expanded = cover scene + TL;DR + Challenge/Approach/Results + links + "Full brief" → `/work/[slug]`. Expected saving: ~2,500px mobile.
2. **Persona lens replaces the route card and tour mode.** Segmented control under the hero; `?for=` param; reorders blocks and pre-opens one. Remove `tour-bar`, `tour-controls`, `hidden` chapter logic, chapter rail on mobile. Expected saving: ~1,200px mobile.
3. **Proof as 3 small tiles** in the hero area; remove the separate "Product brief" chapter (its three facts move into the hero line and the about widget). ~900px.
4. **Experiments as a carousel on mobile, 3-up grid on desktop**; cards show cover + chip + name + title; summary/boundary in the expanded state. ~1,500px mobile.

## P1 — readability
5. **Brief template** (Attio pattern): TL;DR line, then three short columns/sections; product context, decisions, release notes, alignment, reflection behind "Full brief". Update content frontmatter with a `tldr` field and `approach` bullets.
6. **Evidence**: one featured quote + carousel of the rest; writing list collapsed to 3 links.
7. **Off the clock as a widget row** (song · Bangalore clock/pitstops · book); game as a link.
8. **Sticky mobile contact bar**; remove the large contact panel's duplicate chips.
9. **Look switcher into the header menu on mobile**; remove the floating pill below 760px.

## P2 — polish
10. Mobile label sizes ≥ 11px; desktop keeps the 9px mono flavour.
11. Card blur only on desktop; solid glass on phones for scroll performance.
12. Appearance dialog: real mini-render previews and a separate Mode control (see `portfolio-looks`).
13. Analytics adapter: count lens choices and brief opens (privacy-safe, no PII) to learn which persona actually visits.

## Done already (for context)
- Unified surfaces, product cover scenes, open-to-work tag, de-pitched copy, show-4-of-6 experiments, quote clamp, collapsible reflections, mobile cover stacking, security headers (Oct 13, 2026).
