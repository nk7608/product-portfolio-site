# Portfolio product journey

The page tells one story — who I am → what I shipped and why → how I think → how to reach me — and lets visitors choose a lens on it. Rules and budgets live in `.claude/skills/portfolio-ux-patterns`.

## Shape (Oct 14, 2026)
1. **Profile hero**: positioning line, Open to work + location/hours tags, Email / Résumé / LinkedIn / GitHub; a proof card with three outcome tiles and the "Shipped with" logos.
2. **Persona lens** ("What brings you here?": Everything · Hiring · Building · Curious). Stored in `?for=`; reorders sections in the DOM (so keyboard and screen-reader order match), never hides one. Hiring pre-opens the latest brief. Retired `?tour=` links map onto lenses (`src/lib/lens.ts`).
3. **Experience**: one list, newest first (role · company, dates · duration · location, one result). A row opens an inline brief: cover scene, TL;DR, Challenge / Approach / Results, then a collapsible for scope, release notes, alignment, reflection and metric definitions, then links to the full brief at `/work/[slug]`.
4. **Experiment lab**: six compact cards (3-up desktop, swipe row on phones) with type chip, title, honesty note and links. Full cards with summaries stay on `/experiments`.
5. **Evidence**: featured quote + two short ones, "N more" for the rest; writing list.
6. **Off the clock**: one widget row — Fix You player, Bangalore time + pitstops, current book + Scope Runner.
7. **Contact**: Email, LinkedIn, résumé. On phones a slim Email/Résumé bar appears after the hero and hides at the contact block. Appearance moved into the menu/footer on phones.

## Measured (`.claude/skills/portfolio-ux-patterns/scripts/measure.mjs`)
| | Before | After |
|---|---|---|
| Mobile height (390px) | 12,780px | ~3,850px |
| Desktop height (1440px) | 8,837px | ~4,170px |
| Words in DOM (all collapsed) | ~1,400 | ~710 (includes clamped quotes and off-screen carousel cards) |

Removed: guided tour bar/controls, route card, chapter rail, separate Product brief and Career flow chapters, and the per-look layout forks (Blocks/Chic top nav, Green Room rail).
