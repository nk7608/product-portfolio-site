---
name: portfolio-ux-patterns
description: Page structure, information budget and copy rules for Nayana's product-manager portfolio (Next.js; src/components/portfolio-home.tsx, experience.tsx, experiment-lab.tsx, /work/[slug], /experiments). Use this whenever you add, remove, reorder or rewrite any homepage section, row, case brief, experiment, recommendation, the hero, contact, or anything about page length, "too much information", mobile layout or what a recruiter sees. Also use it before reviewing or redesigning the site, even if the request only says "make it simpler", "cleaner" or "better on phone". Pair with portfolio-visual-language (look), portfolio-onboarding-journeys (personas) and portfolio-user-controls (settings, ⌘K).
---

# Portfolio UX patterns

One page, one column, one story: **who I am → what I shipped and why → how I think → the person → how to reach me.** Just enough on the first read; every detail one click away in place. Evidence and sources: `docs/RESEARCH-2026-10.md`.

## Page shape

| # | Block | Visible by default | One click deeper |
|---|---|---|---|
| — | Header | Name · "Bangalore 13:41" · Work · Contact · ⌘K · Settings | — |
| 1 | Hero | Name, two-line positioning, "Open to PM roles · Bangalore · Remote or hybrid · Europe & US hours", copyable email + Résumé/LinkedIn/GitHub, three outcomes, "Arranged for … Change · Settings" | Metric definitions live in each role |
| 2 | Experience | Numbered rows: logo · role · company · year · duration · one result | TL;DR, period/location/domain, cover scene, Challenge / Approach / Results, a disclosure with scope, release notes, alignment, reflection, metric definitions; Full write-up page |
| 3 | Experiments | Numbered rows: logo · name · one-line title · type | Summary, cover scene, honesty boundary, links |
| 4 | Writing | Numbered rows: title · publication · year (external links) | — |
| 5 | Recommendations | One quote with ← → and "1 / 5" | The other four |
| 6 | Off the clock | Four lines: Listening to (Play), Reading, Around town, Side quest (Play) | YouTube player / Scope Runner open inline |
| 7 | Contact | "Email is fastest" + copy, Write an email, Résumé, LinkedIn, GitHub, X | — |

Order of 2–6 comes from the persona (see `portfolio-onboarding-journeys`); sections the visitor didn't ask for collapse to a header with "Show". On ≥1100px a numbered index of the sections sits in the left margin.

## Budgets (measured, not eyeballed)

`node .claude/skills/portfolio-ux-patterns/scripts/measure.mjs http://localhost:3100/` checks every persona × light/dark at 390px and 1440px.

| With the visitor's journey applied | Phone 390px | Desktop 1440px |
|---|---|---|
| Page height | ≤ 4,500px | ≤ 3,200px |
| Visible words in `<main>` | ≤ 550 | ≤ 550 |
| Hero | fits the first viewport | fits the first viewport |
| A row, collapsed | 1 line + 1 result/summary line | same |
| Sections | ≤ 6 | ≤ 6 |

Oct 14, 2026: phone 2,856–3,704px / 282–437 words; desktop 2,161–2,742px / 296–451 words — all pass. History: 12,780px / ~1,400 words (Oct 13) → 3,850 / 706 → now.

## Writing rules

- Portfolio, not pitch. First person, past tense for what happened, numbers with their definition one click away.
- One idea per line; section intros are one sentence or none.
- Never repeat a fact on the first read (a metric appears once in the hero and once in its row, nowhere else).
- Keep honesty notes ("Not shipped company work", metric definitions, "excerpt") — move them deeper, never delete them.
- Labels are plain words in sentence case ("Experience", not "02 / SHIPPED WORK").

## Before finishing a change

1. `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.
2. Run the measure script; budgets hold for every persona.
3. Screenshot 390px and 1440px in Paper and Ink, with a row open.
4. Read the hero aloud as a recruiter with 15 seconds: role, seniority, outcomes, availability, how to reach — all visible?
5. Check `references/pitfalls.md`.

## References
- `references/borrow.md` — patterns borrowed (Mobbin/Firecrawl links) and where they landed.
- `references/retain.md` — what must survive any redesign.
- `references/pitfalls.md` — mistakes already made here.
- `references/mobile.md` — phone specifics.
- `references/improvements.md` — open backlog.
