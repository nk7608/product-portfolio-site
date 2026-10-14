# Nayana Kumari — AI Product Portfolio

A minimal, personalised product-manager portfolio built with Next.js App Router, TypeScript, Tailwind CSS 4, Radix, local MDX and Zod. Visitors pick who they are in a short intro and get the same one-column page arranged for them, with reader-style settings (theme, accent, typeface, size, detail, motion) and a ⌘K menu.

## Run and validate

Use Node 22+ and pnpm. Start development with pnpm dev. Run pnpm typecheck, pnpm lint, pnpm test, and pnpm build before publishing.

## Architecture

The server homepage loads and validates project MDX and passes it to `PortfolioHome`, which renders the hero and six sections (Experience, Experiments, Writing, Recommendations, Off the clock, Contact) as numbered rows that open in place. `PrefsProvider` holds visitor preferences (`src/lib/prefs.ts`), applied before paint by an inline script in `layout.tsx`. The intro, Settings and ⌘K menu are native dialogs. Design and UX rules live in `.claude/skills/`.

Static work routes remain available at /work/[slug]. The homepage provides the primary case-study experience through inline progressive disclosure.

## Content

- Professional and prototype projects: content/projects/*.mdx
- Recommendations: content/recommendations.json
- Writing: content/writing.json
- Loans24 concept PDF: public/assets

Professional work frontmatter controls the homepage: domain, outcome, metrics, product, challenge, ownership, decisions, shipped work, impact, and evidence links. MDX bodies retain Problem → Insight → Execution → Impact for static work pages.

The resume is hosted as a same-origin PDF in `public/assets` and every resume CTA downloads that file.

## Analytics

AnalyticsWrapper currently uses a no-op adapter. Supported events cover case expansion, evidence links, independent work, references, writing, resume, contact, and theme changes. Do not add client secrets or visitor personal information.

## Responsive behavior

The layout responds to CSS viewport width, including browser split view and foldable inner or outer displays. It is usable from 320px. Mobile uses a compact menu, stacked proof metrics, vertical product disclosures, and full-width contact actions.

## Deployment

Import the repository into Vercel with the Next.js preset. Set NEXT_PUBLIC_SITE_URL after choosing the production domain. No API keys are required for the portfolio itself.

See docs/DESIGN_SYSTEM.md for the permanent visual and interaction rules and docs/CONTENT_SOURCES.md for attribution.
