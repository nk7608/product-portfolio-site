---
name: portfolio-visual-language
description: Fonts, colours, themes, accents and visual effects for Nayana's portfolio — the rules that keep it minimal and hand-made rather than AI-generated. Use this whenever you touch src/app/globals.css, the theme/accent/font/size options in src/lib/prefs.ts, the pre-paint script in layout.tsx, cover illustrations, buttons, cards, hover states, gradients, shadows, dark mode or anything someone describes as "make it look nicer / more premium / more modern". Use it before adding any visual flourish, because the default flourishes are exactly what made the old site look generated.
---

# Portfolio visual language

The site should read like a carefully written page by a person, not a template. The research behind this (docs/RESEARCH-2026-10.md) found that the things that make sites look AI-generated are the things that are easiest to add: glass cards, gradient glows, italic-accent headlines, uppercase mono "eyebrows" on every block, status pills, generic UI illustrations, default fonts. The reference sites hiring managers and designers admire (Emil Kowalski, Paco Coursey, Rauno Freiberg, Calwyn) do almost nothing decorative: one column, one family, one grey, one accent.

So the default answer to "can we add an effect?" is no; the default answer to "how do we make this feel better?" is spacing, alignment, wording and type weight.

## The system (all in `src/app/globals.css`)

**Themes** — set by `data-theme` on `<html>`; "System" resolves to Paper or Ink.

| Theme | bg | text | muted | rule | Use |
|---|---|---|---|---|---|
| Paper (default light) | `#FBFAF7` | `#1F1E1B` | `#68655F` | `#E6E3DC` | warm off-white |
| Stone | `#F6F7F8` | `#1A1C1E` | `#5D636A` | `#E1E4E8` | cool alternative |
| Ink (default dark) | `#1A1917` | `#ECE9E3` | `#A9A59D` | `#302E2A` | warm charcoal |
| Night | `#0B0B0C` | `#EDEDEE` | `#A1A1A6` | `#232326` | near-black / OLED |

`--panel` (sheets) and `--hover` (hover rows, segmented controls) are the only other surfaces. `--faint` is for decoration only (never text: it fails contrast).

**Accents** — `data-accent`; one at a time; light/dark values: Rust `#B4441F`/`#F08A62` (default), Cobalt `#2F5BD3`/`#8FAAFF`, Moss `#3D7838`/`#8FC98A`, Plum `#8A3A6A`/`#E39BC7`. The accent marks interaction (hover, open, focus, copied) — never large fills.

**Type** — Instrument Sans for everything (`--font-sans-face`), Newsreader when the visitor picks Serif (`--font-serif-face`); system mono only for `<kbd>`. Body 15.5px (Small 14, Large 17.5; Serif adds ~1.5px). Section titles are body size at weight 600; the name is 1.45em. Numbers use tabular figures. Never more than three sizes on one screen.

**Layout** — one 680px column, centred; on ≥1100px a quiet numbered section index sits in the left margin. Sections are separated by space and a 1px rule, not boxes.

**Interaction states** — hover: text turns accent or a row gets `--hover`; open: title in accent and the "+" rotates; focus: 2px accent outline; selected (segmented/swatches): panel background + 1px foreground border. Transitions ≤ 200ms, colour only.

## Rules

1. **No decorative effects.** No `backdrop-filter`, gradient backgrounds/borders, glows, coloured shadows, blobs, noise overlays, animated backgrounds, parallax, cursor spotlights. The single shadow token is for floating sheets only.
2. **No AI tells in type.** No italic or gradient word inside a headline, no uppercase mono labels as decoration, no "Eyebrow / Big headline / Subhead" stacks, no three-part slogans. Labels are sentence case in the body face.
3. **Pills only for interactive things.** Status ("Open to PM roles") is text with one green dot, not a chip row.
4. **Illustrations must depict the actual product.** Cover scenes (`cover-scenes.tsx`) are flat, tinted with the brand hue, and appear only inside an opened row or a case page — never as a wall of cards.
5. **Every theme × accent passes contrast.** Run `node .claude/skills/portfolio-visual-language/scripts/contrast.mjs` (dev server on :3100): text, muted and accent-as-text ≥ 4.5:1 on bg, panel and hover. 96/96 passed on Oct 14, 2026.
6. **Pre-paint parity.** The inline script in `layout.tsx` must mirror `htmlAttributes()` in `src/lib/prefs.ts`; add a new option in both or the page flashes.
7. **Adding an option** (a theme, accent or size): add tokens to globals.css, the id to `prefs.ts` and the pre-paint allow-list, a swatch/dot style, update `tests/prefs.test.ts`, run contrast.

Read `references/anti-slop.md` before any "make it pop" request; it lists every banned pattern with the reason and the alternative.
