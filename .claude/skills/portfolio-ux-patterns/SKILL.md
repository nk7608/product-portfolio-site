---
name: portfolio-ux-patterns
description: Layout, information architecture and mobile UX rules for Nayana's product-manager portfolio (Next.js, src/components/portfolio-home.tsx). Use this whenever you add, remove, reorder, restyle or rewrite any homepage section, case-study brief, experiment card, the persona "what brings you here" router, the contact area, or anything about mobile layout, page length, copy density, expandables or "too much information". Also use it before reviewing the site or proposing a redesign, even if the request only says "make it simpler", "cleaner", "less cluttered" or "better on phone".
---

# Portfolio UX patterns

The portfolio tells one story — **who I am → what I shipped and why → how I think → how to reach me** — and lets a visitor pick a lens on that story by persona (hiring / building / curious). The problem this skill exists to prevent is the one the site already had: the story connects, but there is too much of it on screen at once, it repeats itself, and on a phone it runs to ~15 screens.

Simplify by **progressive disclosure**, not by deleting evidence. Every fact a hiring manager needs stays reachable in one tap; only the first glance gets shorter.

## The shape of the page

Read `references/borrow.md` for the source patterns (Mobbin references) behind each block.

| # | Block | First glance (collapsed) | One tap deeper |
|---|---|---|---|
| 1 | **Profile header** | Name, one-line positioning, status tags (Open to work · city · remote · hours), 3 icon links, résumé | — |
| 2 | **Persona lens** | Segmented control: Hiring · Building · Curious (default: everything) | Reorders/filters the blocks below; never hides contact |
| 3 | **Proof** | ≤3 metric tiles (number first, 4-word label) + "Shipped with" logo row | Metric definitions |
| 4 | **Experience** | One list, newest first: logo · role · company · dates · duration · one result | Inline brief: cover scene, TL;DR, Challenge/Approach/Results, links |
| 5 | **Experiments** | Horizontal cards (mobile carousel): cover, name, one-line title, honesty tag | Summary + links |
| 6 | **Evidence** | One featured quote + "N more" | Other quotes, writing list |
| 7 | **Off the clock** | One row of 3 small widgets (song, Bangalore time/pitstops, book) | Game, full lists |
| 8 | **Contact** | Email + LinkedIn + résumé; on mobile a sticky bottom bar after the header scrolls away | — |

Career flow and shipped work are **one block** (Experience). Two blocks listing the same four companies is the biggest source of length and repetition.

## Budgets (check them, don't eyeball them)

Run `node .claude/skills/portfolio-ux-patterns/scripts/measure.mjs http://localhost:3100/` (needs `playwright`; see the script header). It reports page height and visible words at 390px and 1440px for every look.

| Metric (all disclosures closed) | Mobile 390px | Desktop 1440px |
|---|---|---|
| Page height | ≤ 5,500px (~6.5 screens) | ≤ 5,000px |
| Visible words | ≤ 650 | ≤ 700 |
| Hero (block 1) | fits in the first viewport | fits in first viewport with lens visible |
| Lines per card summary | ≤ 2 | ≤ 2 |
| Primary actions per block | 1 | 1 |

Baseline when this skill was written (Oct 2026): mobile 12,780px / 1,416 words; desktop 8,837px / 1,453 words. Calwyn's simpler profile: 3,874px / 570 words. Aim between the two — richer than Calwyn, half of today.

## Writing rules

- It is a portfolio, not a pitch. State what happened; skip adjectives about yourself. "Rebuilt the editor; higher-tier adoption 10% → 40%" beats "I deliver outstanding outcomes".
- One idea per line. Section intros are one sentence or none.
- Numbers lead, labels follow, definitions sit one tap away. Keep every honesty note (metric definitions, "independent, not company work") — move it, never delete it.
- Never say the same thing twice on the first glance (metrics, chips, company names). If it appears in the hero, it doesn't reappear in the brief summary.

## Persona lens (the "typeform" idea, simplified)

Keep the idea — visitors self-select and the page adapts — but make it a **lens**, not a separate tour mode:

- A 3-option segmented control directly under the header, persisted in the URL (`?for=hiring`) so links can be shared.
- Choosing an option reorders blocks and pre-expands the most relevant one (Hiring → first brief open; Building → experiments first; Curious → off the clock earlier). It never hides contact, proof or the open-to-work status.
- Default (no choice) shows everything in the canonical order. No Back/Next tour bar, no progress bar, no "step 3 of 6" — that pattern suits multi-screen onboarding (Brilliant, pliability) where each screen is one question, not a single scrolling page.
- If a richer intro is wanted, use the one-question-per-screen pattern (big tappable answer cards, progress bar, Skip) as an optional overlay launched from the lens — never as the first thing a visitor must deal with.

## Mobile tailoring

Read `references/mobile.md` before touching anything under `@media (max-width:760px)`. Short version: single column, header fits one screen, no floating controls over content, carousels for sibling cards, sticky contact bar, covers stack above captions, tap targets ≥44px, no hover-only affordances.

## Before you finish a change

1. Run the measure script; budgets hold for all four looks in light and dark.
2. Screenshot 390px and 1440px for at least Fieldnotes light and Green Room dark (the two most different looks).
3. Walk the page as each persona: can a recruiter find role, dates, outcomes, résumé and email within one screen-scroll of choosing "Hiring"?
4. Check `references/pitfalls.md` — every item there happened at least once on this site.

## References

- `references/borrow.md` — patterns to borrow, each with the Mobbin example and what to take from it.
- `references/retain.md` — what already works on this site and must survive any simplification.
- `references/pitfalls.md` — mistakes to avoid, with how each one showed up here.
- `references/mobile.md` — phone-specific layout rules.
- `references/improvements.md` — prioritised backlog that applies this skill to the current code.
- For anything about the four appearances or colour, use the `portfolio-looks` skill.
