# Mobile tailoring (≤760px)

Phones are where most recruiters first open a portfolio link (from LinkedIn, email, chat). Design for one thumb, short attention, and a small screen; then let desktop add space, not content.

## Layout
- One column, 16–20px side gutters, no horizontal page scroll (carousels scroll inside themselves).
- First viewport: name, one-line positioning, status tags, persona lens. Nothing else needs to fit.
- No in-page chapter grid or sticky side rail. Navigation = header menu + persona lens.
- Sibling cards (experiments, quotes) → horizontal snap carousel with a visible next-card peek (~12%), or "Show N more".
- Experience list rows ≤ 3 lines collapsed. The expanded brief opens inline and scrolls the row's top into view.
- Contact: slim sticky bottom bar (Email primary, Résumé secondary) once the hero scrolls away; hide when the contact block is visible. Respect `env(safe-area-inset-bottom)`.
- The look switcher lives in the header menu (and footer), not as a floating pill.

## Imagery
- Cover scenes stack above (or below) their caption, full width, never behind text.
- Collapsed rows use the brand logo only; scenes appear when expanded.
- Don't ship decorative blur layers that cost frames: on phones, cap `backdrop-filter` to the header and dialogs, and use solid `--glass` fallbacks on cards.

## Type and touch
- Body ≥ 15px, labels ≥ 11px (the 8–9px mono labels are desktop-only flavour; bump them on mobile).
- Tap targets ≥ 44×44px with ≥ 8px between them.
- Expanded states must be reachable and closable without scrolling back up: put "Close" at the bottom of long disclosures.
- No hover-dependent meaning; `:hover` effects only under `(hover:hover) and (pointer:fine)`.

## Checks
- 360, 390 and 430px widths; light and dark; all four looks.
- iOS Safari: fixed elements and the sticky bar with the URL bar collapsing; `100svh` not `100vh`.
- Budget from SKILL.md: ≤ 5,500px tall and ≤ 650 visible words with everything collapsed.
