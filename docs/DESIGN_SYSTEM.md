# Permanent design system and reusable implementation instructions

Maintain Nayana Kumari's portfolio as a proof-first product review with an **Autosend-inspired editorial system**: warm canvas, clay atmosphere, crisp white panels, generous space, and one focused story at a time. Professional work leads; references, independent work, concise writing, and personal context support it.

Preserve Next.js App Router + TypeScript + Tailwind 4 + Motion + Radix + local MDX + next-themes + Vercel. Keep content separate from reusable layouts.

## Tokens

| Token | Light | Dark |
| --- | --- | --- |
| Canvas | #FAF9F6 | #131217 |
| Surface | #FFFFFF | #1B1A20 |
| Ink | #181719 | #F7F5FB |
| Secondary text | #69666E | #AAA6B3 |
| Accent | #B83A20 | #FF8A65 |
| Clay field | #F7E7DE | #39231C |
| Sand field | #FBF0E9 | #2C2420 |

Typography: self-hosted Instrument Serif for hero and major editorial headings, Geist Sans for interfaces and reading, and Geist Mono for dates, indices, labels, and metrics. Use a maximum width of 1180px, a 12-column desktop grid, 32px desktop gutters, and 16px mobile gutters. Primary panels use 20px radii; smaller controls are fully rounded.

## Interaction and hierarchy

Keep the page sequence: hero and proof → two featured professional stories → compact shipped work → references → independent work → about and contact → writing footer. Featured work uses one-open-at-a-time disclosures. Closed stories provide the company, domain, role, outcome, and metrics; open stories reveal product, challenge, ownership, decisions, shipped work, impact, metric context, alignment, reflection, and evidence.

Every interactive row or card uses the same feedback: vermilion border, pale clay tint, small arrow movement, and a restrained shadow. Hover and keyboard focus must communicate the same state. Use 150–180ms for feedback, 280–320ms for disclosures, and honor reduced motion. Never add autoplay, carousels, parallax, decorative diagrams, or product screenshots without a new explicit decision.

## Content honesty

Use sourced numbers exactly and identify their measure. Vidrush weekly access is not weekly active users. ARR is a supported team outcome. Phasio's three launches collectively contributed to 20 deals. Loans24 is a proposal. Foobar deployment is simulated. Elaya's recommendation is an excerpt.

Professional project frontmatter owns homepage storytelling. Keep domain, outcome, primaryMetric, supportingMetrics, metricContext, product, challenge, ownership, decisions, shipped, impact, alignment, reflection, and evidence links current. Retain Problem → Insight → Execution → Impact in the MDX body for static case routes.

## Maintenance and acceptance

Add projects through MDX, writing through content/writing.json, and recommendations through content/recommendations.json. Validate content, types, lint, and a production build. Inspect desktop and narrow widths, both themes, keyboard navigation, focus return, disclosures, and reduced motion. The resume remains a view-only Google Doc preview until a public PDF is explicitly approved.
