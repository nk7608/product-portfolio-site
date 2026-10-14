---
name: portfolio-onboarding-journeys
description: The first-visit intro and persona journeys on Nayana's portfolio — who visits (hiring, building, curious), what each needs first, how the 3-step intro maps answers to section order and what opens by default. Use this whenever you change src/components/onboarding.tsx, src/lib/lens.ts, sectionOrder/interests in src/lib/prefs.ts, the "Arranged for … Change" note, shared ?for= links, or when someone asks to personalise the page, add a persona, add a question, or change what a recruiter sees first.
---

# Onboarding and persona journeys

Visitors arrive with one job. A recruiter needs fit in 15 seconds; a founder or PM wants to see how decisions get made; a friend wants the person. The intro asks once, then arranges the same page for that job. It never hides content and never blocks someone who just wants to scroll.

## The intro (Xero / Mindvalley / Jasper patterns)

Shown on the first visit only (no stored `onboarded`, no `?for=`/`?tour=` in the URL). A modal `<dialog>` over the real page, three steps, progress bar, **Skip on every step**, Escape and backdrop click = Skip.

1. **"What brings you here?"** — three option cards, one tap advances:
   - I'm hiring for a product role → `hiring`
   - I'm building something → `building`
   - Just looking around → `curious`
2. **"What should I show first?"** — checkboxes, pre-ticked from the persona (`defaultInterests`): Roles & outcomes · Prototypes & case studies · What teammates say · Writing · The person. At least one required.
3. **"Make it comfortable"** (optional) — Theme and Text size; "Show my page" finishes.

Skip sets persona `all` with every section open. Answers live in `localStorage["nayana-prefs-v2"]` only. "Replay intro" (settings, ⌘K, the page note) reopens it.

## Journeys

| Persona | Order (lens.ts) | Opens by default | Collapsed (one click: "Show") | The 15-second answer |
|---|---|---|---|---|
| Hiring | Experience → Recommendations → Experiments → Writing → Off the clock → Contact | Vidrush brief | Experiments, Writing, Off the clock | Role, dates, outcome per role; references; résumé + email in the hero |
| Building | Experience → Experiments → Writing → Recommendations → Off the clock → Contact | — | Recommendations, Off the clock | Decisions & trade-offs (Approach column), prototypes with honest boundaries, writing |
| Curious | Off the clock → Experiments → Writing → Experience → Recommendations → Contact | — | Experience, Recommendations | Music, books, Bangalore, side projects |
| Everything (skip) | Experience → Experiments → Writing → Recommendations → Off the clock → Contact | — | none | Whole page |

`sectionOrder(persona, interests)` = the persona order with the visitor's ticked sections pulled to the front; Contact is always last (the hero already carries email and résumé). Sections not ticked render as a one-line header with "Show".

## Rules

- **Never hide, only arrange.** Every section exists in every journey; tests enforce it (`tests/prefs.test.ts`, `tests/lens.test.ts`).
- **≤ 3 steps, ≤ 6 options per step, Skip always visible.** A fourth question costs more attention than it saves.
- **Say what happened.** After the intro the hero shows "Arranged for *hiring for a product role*: experience, recommendations first. Change · Settings".
- **Shared links win.** `?for=hiring` (and retired `?tour=` links) set the persona and skip the intro, so a link sent to a recruiter opens ready.
- **No data leaves the browser.** Analytics events (`intro_persona`, `intro_done`, `intro_skip`) carry only the choice, never identity; the adapter is a no-op until consented analytics exist.
- **Content first, then personalisation.** The page must be complete and readable with JS disabled and before the intro opens (server render = Everything).

## Adding a persona or question

Add the lens to `lens.ts` (full order), its default interests to `prefs.ts`, a card to `onboarding.tsx`, a note to `personaNote` in `portfolio-home.tsx`; update the tests; run `portfolio-ux-patterns/scripts/measure.mjs` — each persona must stay within the page budget.
