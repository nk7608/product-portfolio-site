---
name: portfolio-looks
description: Rules for the portfolio's four visitor-selectable appearances (Fieldnotes, Blue Blocks, Green Room, Chic) × light/dark — colour tokens, gradients, glass, atmosphere, cover-scene tinting and the appearance-lab picker. Use this whenever you touch src/app/appearance.css, src/app/surfaces.css, globals.css colour variables, cover-scenes styling, the AppearanceLab dialog, or when someone asks to add/remove/tweak a theme, colour profile, gradient, dark mode, contrast, or "make the looks consistent". Use it even for a one-line colour change, because a token edited for one look silently affects the others.
---

# Portfolio looks

Visitors can pick one of four looks and light/dark. The promise to them is **"same Nayana, different canvas"**: identical content, order and behaviour; only material, colour and type personality change. Every bug in this area so far came from breaking that promise — a look that moved content around, hid a section, or got an effect the others didn't.

## How the system is built

- `src/app/surfaces.css` defines every material once (glass card, 1px gradient edge, cursor spotlight, hover lift, active ring, cover scenes, atmosphere) and its **default tokens = Fieldnotes**.
- `src/app/appearance.css` sets **only tokens** per look (`html[data-appearance=X]`, `html.dark[data-appearance=X]`) plus a small, explicit list of typography/composition differences.
- `data-appearance` is set before paint by the inline script in `layout.tsx` from `localStorage["nayana-appearance-v1"]`; dark mode is `next-themes` (`.dark` on `<html>`).

Token groups every look must define, for both modes: palette (`--background --surface --foreground --muted --border(-strong) --accent(-soft/-contrast)`), auras (`--aura-*` + `--page-atmosphere`), material (`--glass --edge --edge-hover --edge-active --highlight --card-shadow(-hover/-active) --spot --spot-edge --radius-card --lift`), covers (`--cover-base --cover-glow --cover-texture --sc-* --cn-*`). A missing token falls back to Fieldnotes — usually wrong in dark mode.

## The four looks (identity in one line each)

Read `references/looks.md` for full palettes, signatures and per-look don'ts.

| Look | Personality | Signature (exactly one) | Material |
|---|---|---|---|
| Fieldnotes (default) | warm paper notebook | serif-italic accent line | warm glass, sun/rose/sky gradient edge |
| Blue Blocks | playful cobalt blueprint | offset hard shadow | near-opaque white glass, navy edge, cobalt covers |
| Green Room | record collection | vinyl-groove cover texture | green-tinted glass, dark record-sleeve covers |
| Chic | editorial index | serif display + hairline rules | cream glass, hairline plum→gold edge, small radius |

A look gets **one** signature. Adding a second motif (stickers, record labels, "issue" captions) is how the earlier covers got cluttered.

## Rules

1. **Tokens, not overrides.** Change a look by changing its tokens. If you need a new effect, add a token with a Fieldnotes default in `surfaces.css` and set it per look. Never write `html[data-appearance=X] .some-card { background/border/box-shadow }`.
2. **Same IA in every look.** No look may reorder, hide, add or rename content. Composition differences allowed today: Blocks/Chic put the chapter nav on top at ≥1000px; Green Room uses a glass rail; Chic narrows the column. Anything new needs the same justification (density/personality) and must keep content parity. When the Experience/lens redesign lands (see `portfolio-ux-patterns`), remove per-look layout forks rather than adding more.
3. **Every effect in every look.** Glass, gradient edge, spotlight, hover lift, active ring and halo must be visible in all eight combinations. If an effect clashes with a look, retune its token (e.g., Blocks' edge is solid navy) instead of switching it off.
4. **Contrast is a gate.** Run `node .claude/skills/portfolio-looks/scripts/contrast.mjs` (dev server on :3100). Body text ≥ 4.5:1 on `--background` and on `--surface`; muted text ≥ 4.5:1 for anything ≤ 14px; accent on background ≥ 3:1 for UI, 4.5:1 if used for text; `--accent-contrast` on `--accent` ≥ 4.5:1; cover caption ink on cover base ≥ 4.5:1.
5. **Brand colour stays in covers.** Product hues (`brand-assets.ts` `hue/hue2`) tint cover scenes only. UI chrome uses the look's accent, so a Vidrush-orange card never fights Green Room green.
6. **Gradients are atmosphere, not decoration on text.** No gradient fills behind body copy; no gradient text for anything longer than a word. Atmosphere is viewport-fixed (`body::after`); never tile it with `background-size`.
7. **Dark mode is designed, not inverted.** Lower glass opacity, white-alpha edges, darker shadows, brighter accents. Green Room covers are dark in both modes on purpose; check they don't look like holes on the light page.
8. **Respect performance on phones.** Blur is expensive: on ≤760px keep `backdrop-filter` to header/dialog and use the token's solid fallback on cards. Atmosphere drift and pulses stop under `prefers-reduced-motion`.

## The appearance picker

- Show real mini-renders of the hero per look (Cal.com/Wrike pattern), not abstract glyphs. Separate **Look** (4) from **Mode** (Light · Dark · System).
- On phones, open it from the header menu; no floating pill over content.
- Label it plainly ("Appearance"). The "A/B experimentation" joke can stay as the dialog's subtitle, not as the only label — visitors who don't get the joke can't find the setting.
- Persist both choices; changing look must not reset scroll, route or open briefs.

## Adding or changing a look — checklist

1. Copy one look's token block for light and dark; fill every group listed above.
2. Pick one signature; write it into `references/looks.md`.
3. `contrast.mjs` passes; `portfolio-ux-patterns/scripts/measure.mjs` shows no height/word change versus Fieldnotes (content parity).
4. Screenshot 390px + 1440px, light + dark, with a brief expanded and a card hovered.
5. Update `src/lib/appearance.ts`, the picker preview, `docs/APPEARANCE_LAB.md`, and `tests/appearance.test.ts` (count of looks).

## References
- `references/looks.md` — per-look palette, signature, do/don't, known issues.
- `references/pitfalls.md` — look-specific mistakes already made here.
