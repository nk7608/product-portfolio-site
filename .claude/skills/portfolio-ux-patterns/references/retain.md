# What to retain

These are the parts that make this portfolio more than a résumé page. Simplification should change how much of them shows at first glance, not whether they exist.

## Story and positioning
- **The narrative arc**: Junior PM (Phasio) → Growth PM (Blaze) → APM (Progress/Opsmith) → Founding PM (Vidrush). Keep the chronology visible as a connected list; it is the "one role builds on the next" story.
- **Persona self-selection** (hiring / building / curious). The idea is good and distinctive for a PM; keep it as a lens (see SKILL.md), not a modal tour.
- **"Behind every launch, a product decision."** — the positioning line and its look-specific typography.
- **Open to work** status tag alongside location, remote/hybrid and Europe & US hours.
- **"Shipped with" logo row** — fast credibility without a paragraph.

## Evidence and honesty
- Metric definitions (`metricContext`) — "weekly access is not WAU", "ARR is a team outcome". Move them one tap deeper; never delete them.
- Experiment boundary notes ("independent proposal, not commissioned by Swish"). Keep as a small tag on the card or in the expanded state.
- Recommendations attributed with name, title and relationship ("Managed Nayana directly").
- Links to real artefacts: prototypes, case-study PDFs, code, writing.

## Visual system
- **Product cover scenes** (`src/components/cover-scenes.tsx`): original SVG illustrations of each product's workflow, tinted by brand hue. They explain the product at a glance. Show them in expanded briefs and experiment cards; don't put them on every collapsed list row.
- **Unified surface tokens** (`src/app/surfaces.css`): glass, gradient edge, spotlight, lift, active ring. One definition, four looks.
- **Four looks + light/dark**, chosen in the appearance lab and stored in `nayana-appearance-v1`. See `portfolio-looks`.
- Company logos as the only third-party brand artwork.

## Quality floor
- Reduced-motion support, 44px tap targets, focus-visible rings, semantic headings, `aria-expanded` on every disclosure.
- Security headers / CSP in `next.config.ts`, sandboxed game iframe, pinned dependencies.
- `/work/[slug]` static pages as the long-form home for each brief (good for sharing and SEO).
- Tests in `tests/` (appearance validity, cover scenes, résumé PDF).
