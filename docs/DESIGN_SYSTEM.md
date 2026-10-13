# Permanent design system and reusable implementation instructions

Maintain Nayana Kumari's portfolio as a **guided product journey** with a warm Bangalore sunrise canvas, clay accents, document-like panels, compact typography, and one focused chapter at a time. Typeform-inspired route choices are optional. Every visitor can browse the complete portfolio immediately. See PRODUCT_JOURNEY.md for the current architecture and acceptance rules.

Preserve Next.js App Router + TypeScript + Tailwind 4 + Motion + Radix + local MDX + next-themes + Vercel. Keep content separate from reusable layouts.

## Tokens

| Token | Light | Dark |
| --- | --- | --- |
| Canvas | #FBF7EE | #12130F |
| Surface | #FFFDF9 | #1C1D18 |
| Ink | #181719 | #F6F1E7 |
| Secondary text | #69666E | #BDB3A5 |
| Accent | #B83A20 | #FF9270 |
| Clay field | #F7E7DE | #39231C |
| Sand field | #FBF0E9 | #2C2420 |

Typography: self-hosted Instrument Serif for hero and major editorial headings, Geist Sans for interfaces and reading, and Geist Mono for dates, indices, labels, and metrics. Use a maximum width of 1120px, a desktop chapter rail with a flexible content column, 32px desktop gutters, and 12–16px mobile gutters. Panels use 14–22px radii; smaller controls use restrained rounding. At mobile widths, guided navigation collapses into a See all steps control.

## Interaction and hierarchy

The full page runs welcome → product brief → career flow → shipped work → experiment lab → evidence and writing → personal interests and contact. Tailored routes reorder the first chapters but include all six, with personal interests last. Professional work uses one-open-at-a-time disclosures for all four companies. Closed stories provide company, domain, role, dates, outcome, and metrics; open stories retain all narrative, context, alignment, reflection, and evidence.

Every interactive row or card uses the same feedback: vermilion border, pale clay tint, small arrow movement, and a restrained shadow. Hover and keyboard focus must communicate the same state. Use 150–180ms for feedback, 280–320ms for disclosures, and honor reduced motion. Never add autoplay, carousels, or parallax. Career connectors describe real progression. Scope Runner is an explicitly optional final-chapter and offline-page game; it never autostarts.

## Content honesty

Use sourced numbers exactly and identify their measure. Vidrush weekly access is not weekly active users. ARR is a supported team outcome. Phasio's three launches collectively contributed to 20 deals. Loans24 is a proposal. Foobar deployment is simulated. Elaya's recommendation is an excerpt.

Professional project frontmatter owns homepage storytelling. Keep domain, outcome, primaryMetric, supportingMetrics, metricContext, product, challenge, ownership, decisions, shipped, impact, alignment, reflection, and evidence links current. Retain Problem → Insight → Execution → Impact in the MDX body for static case routes.

## Maintenance and acceptance

Add professional projects through MDX, experiments through content/experiments.json, writing through content/writing.json, and recommendations through content/recommendations.json. Route order is defined in src/lib/journey.ts. Validate content, types, lint, and a production build. Inspect desktop and narrow widths, both themes, keyboard navigation, focus return, disclosures, and reduced motion. Resume CTAs must download the approved PDF from `public/assets`.
