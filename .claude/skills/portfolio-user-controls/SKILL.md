---
name: portfolio-user-controls
description: Visitor controls on Nayana's portfolio — the Settings sheet (theme, accent, typeface, text size, detail level, motion, persona, replay intro, reset), the ⌘K command menu, copy-email, per-section Show/Hide and preference persistence. Use this whenever you touch src/components/controls.tsx, command-menu.tsx, prefs.tsx, sheet.tsx, src/lib/prefs.ts, or add any toggle, shortcut, menu item or saved setting, or when someone asks for "more control", "accessibility options", "dark mode toggle" or "keyboard navigation".
---

# User controls

The page is minimal on purpose; controls are how a visitor gets more (or less) of it without the page getting louder. They follow reader apps (Matter, X display settings, Perplexity) and command menus (Mistral, Magnific): everything is optional, reversible and remembered.

## What exists

| Control | Where | Effect | Stored as |
|---|---|---|---|
| Theme: System · Paper · Stone · Ink · Night | Settings, intro step 3, ⌘K | `data-theme`, `data-mode` | `theme` |
| Accent: Rust · Cobalt · Moss · Plum | Settings | `data-accent` | `accent` |
| Typeface: Sans · Serif | Settings, ⌘K | `data-font` (Instrument Sans / Newsreader) | `font` |
| Text size: Small · Default · Large | Settings, intro | `data-size` | `size` |
| Detail: Skim · Full | Settings, ⌘K | `data-density` — Full shows the one-line summary under every row | `density` |
| Motion: Match device · Off | Settings | `data-motion` — Off kills transitions; device reduced-motion always respected | `motion` |
| Show me the page as | Settings, intro | persona → section order | `persona`, `interests` |
| Replay intro / Reset to default | Settings, ⌘K | — | `onboarded` |
| ⌘K / Ctrl+K | header button, footer, keyboard | jump to sections and roles, copy email, résumé, LinkedIn, themes, detail, typeface | — |
| Copy email | hero, contact, ⌘K | clipboard, "Copied" feedback, mailto fallback | — |
| Section Show/Hide | unchosen sections | expands in place | session only |
| Recommendation ← → | recommendations | one quote at a time, "2 / 5" | session only |

All stored values go through `parsePrefs()` (unknown → default) in `localStorage["nayana-prefs-v2"]`; the pre-paint script in `layout.tsx` applies them before first paint.

## Rules

- **Defaults are good enough.** Nobody should need a control to read the page. Controls refine; they never rescue.
- **Every control is reversible and visible.** One "Reset to default". Current choice shown as selected (`aria-checked`). No control lives only behind a shortcut — ⌘K also has a header button and footer link.
- **Use native, accessible parts.** `<dialog>` via `Sheet` (focus trap, Escape, returns focus), radiogroups with `role="radio"`, buttons ≥ 32px high (44px on touch rows), labels in words not icons only.
- **One place per concern.** Appearance → Settings; navigation → ⌘K and the margin index; persona → intro (Settings mirrors it). Don't add a second floating control.
- **Respect the device.** System theme follows `prefers-color-scheme` live; reduced motion always wins; on phones Settings opens as a bottom sheet.
- **Nothing identifying is stored or sent.** Preference events carry the key and value only.

## Adding a control

1. Add the option list and field to `prefs.ts` (+ `parsePrefs`, `htmlAttributes`).
2. Mirror it in the pre-paint script in `layout.tsx`.
3. Style it via a `data-*` attribute in `globals.css` (follow `portfolio-visual-language`).
4. Add it to `controls.tsx`; if it's a frequent action, add a ⌘K item.
5. Extend `tests/prefs.test.ts`; check contrast and page budget scripts.
