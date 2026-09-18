# Permanent design system and reusable implementation instructions

Maintain Nayana Kumari's portfolio as a proof-first product review with an **Autosend-inspired editorial system**: warm canvas, lavender atmosphere, crisp white panels, generous space, and one focused story at a time. Professional work leads; builds, recommendations, writing, and personal context support it.

Preserve Next.js App Router + TypeScript + Tailwind 4 + Motion + Radix + local MDX + next-themes + Vercel. Keep content separate from reusable layouts.

## Tokens

| Token | Light | Dark |
| --- | --- | --- |
| Canvas | #FAF9F6 | #131217 |
| Surface | #FFFFFF | #1B1A20 |
| Ink | #181719 | #F7F5FB |
| Secondary text | #69666E | #AAA6B3 |
| Accent | #725CF6 | #9D8CFF |
| Lavender field | #EDE9FF | #252039 |
| Blue-violet field | #EEF2FF | #1E2435 |

Typography: self-hosted Instrument Serif for hero and major editorial headings, Geist Sans for interfaces and reading, and Geist Mono for dates, indices, labels, and metrics. Use a maximum width of 1180px, a 12-column desktop grid, 32px desktop gutters, and 16px mobile gutters. Primary panels use 20px radii; smaller controls are fully rounded.

## Interaction and hierarchy

Keep the page sequence: hero and proof → selected professional work → builds → recommendations → writing → about → contact. Selected work uses one-open-at-a-time disclosures. Closed stories provide the company, domain, role, outcome, and metrics; open stories reveal product, challenge, ownership, decisions, shipped work, impact, and evidence.

Every interactive row or card uses the same feedback: violet border, pale tint, small arrow movement, and a restrained shadow. Hover and keyboard focus must communicate the same state. Use 150–180ms for feedback, 280–320ms for disclosures, and honor reduced motion. Never add autoplay, carousels, parallax, decorative diagrams, or product screenshots without a new explicit decision.

## Content honesty

Use sourced numbers exactly and identify their measure. Vidrush weekly access is not weekly active users. ARR is a supported team outcome. Phasio's three launches collectively contributed to 20 deals. Loans24 is a proposal. Foobar deployment is simulated. Elaya's recommendation is an excerpt.

Professional project frontmatter owns homepage storytelling. Keep domain, outcome, primaryMetric, supportingMetrics, product, challenge, ownership, decisions, shipped, impact, and evidence links current. Retain Problem → Insight → Execution → Impact in the MDX body for static case routes.

## Maintenance and acceptance

Add projects through MDX, writing through content/writing.json, and recommendations through content/recommendations.json. Validate content, types, lint, and a production build. Inspect desktop and narrow widths, both themes, keyboard navigation, focus return, disclosures, and reduced motion. The resume remains an external Google Doc link until a public PDF is explicitly approved.
