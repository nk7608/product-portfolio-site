# Nayana Kumari — AI Product Portfolio

A light-first, Autosend-inspired portfolio built with Next.js App Router, TypeScript, Tailwind CSS 4, Motion, Radix, local MDX, Zod, and next-themes.

## Run and validate

Use Node 22+ and pnpm. Start development with pnpm dev. Run pnpm typecheck, pnpm lint, pnpm test, and pnpm build before publishing.

## Architecture

The server homepage discovers and validates project MDX, then passes it to PortfolioHome. The client component renders the hero, proof panel, one-open-at-a-time product stories, builds, recommendation disclosures, writing, about, and contact. Shared providers supply theme, reduced-motion handling, and a vendor-neutral analytics adapter.

Static work routes remain available at /work/[slug]. The homepage provides the primary case-study experience through inline progressive disclosure.

## Content

- Professional and prototype projects: content/projects/*.mdx
- Recommendations: content/recommendations.json
- Writing: content/writing.json
- Loans24 concept PDF: public/assets

Professional work frontmatter controls the homepage: domain, outcome, metrics, product, challenge, ownership, decisions, shipped work, impact, and evidence links. MDX bodies retain Problem → Insight → Execution → Impact for static work pages.

The resume links to the current Google Doc and is intentionally not a downloadable public asset.

## Analytics

AnalyticsWrapper currently uses a no-op adapter. Supported events cover case expansion, evidence links, builds, recommendations, writing, resume, contact, and theme changes. Do not add client secrets or visitor personal information.

## Responsive behavior

The layout responds to CSS viewport width, including browser split view and foldable inner or outer displays. It is usable from 320px. Mobile uses a compact menu, stacked proof metrics, vertical product disclosures, and full-width contact actions.

## Deployment

Import the repository into Vercel with the Next.js preset. Set NEXT_PUBLIC_SITE_URL after choosing the production domain. No API keys are required for the portfolio itself.

See docs/DESIGN_SYSTEM.md for the permanent visual and interaction rules and docs/CONTENT_SOURCES.md for attribution.
