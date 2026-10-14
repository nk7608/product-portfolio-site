# The four looks

Values are the light-mode anchors; dark variants live next to them in `appearance.css` (Fieldnotes in `globals.css` + `surfaces.css`). Contrast for all 64 token pairs passed on Oct 14, 2026 (`scripts/contrast.mjs`).

## Fieldnotes (default)
- **Feels like:** a warm paper notebook in Bangalore sunshine.
- **Palette:** background `#fbf7ee`, ink `#181719`, accent rust `#b83a20`; auras sun `#f3cf7a`, sky `#c7ddea`, leaf `#c4d9bd`, rose `#efbda7`.
- **Signature:** the serif-italic accent line in the headline ("*a product decision.*").
- **Material:** warm white glass; edge gradient white → sun → rose → sky; spotlight rust at ~7%; radius 20px.
- **Covers:** paper base with dotted texture; brand hue glow ~30%.
- **Do:** keep it the calmest look; it's the default first impression.
- **Don't:** add stickers, tape, handwriting fonts or doodles — the notebook idea is carried by colour and type only.

## Blue Blocks
- **Feels like:** a cobalt blueprint made of building tiles.
- **Palette:** background `#eaf0ff`, ink navy `#10204b`, accent cobalt `#164bd6`, yellow key caps `#ffe27a`.
- **Signature:** the offset hard shadow (4px → 7px on hover) with translate lift.
- **Material:** near-opaque white glass (so the hard shadow reads), navy edge 1.5px, cobalt spotlight.
- **Covers:** cobalt base with white blueprint grid; scene panels get a navy drop shadow.
- **Do:** keep shapes square-ish (radius 12px), sans-serif headings.
- **Don't:** use the solid cobalt fill on large text surfaces (the old cobalt route card); stack shadows with soft blur shadows; use the 3-up grid if it leaves orphan cards.

## Green Room
- **Feels like:** a record collection — good work, on repeat.
- **Palette:** background `#edf5ed`, ink `#102e20`, accent `#176b3c` (dark mode `#71e999`).
- **Signature:** vinyl-groove texture on dark record-sleeve covers.
- **Material:** green-tinted glass, mint→white edge, green spotlight, round logos.
- **Covers:** dark sleeve in both modes (`#0f2a1d → #183d2a`) with radial grooves.
- **Do:** let the dark covers be the rhythm of the page; keep everything else light in light mode.
- **Don't:** add "SIDE A" labels or record-label stickers on covers (the old clutter); put the glass rail on mobile.

## Chic
- **Feels like:** an editorial index — a quieter kind of confidence.
- **Palette:** background `#f6f1eb`, ink `#30252b`, accent plum `#813952`, gold hint `#e9d8b8`.
- **Signature:** Instrument Serif display + hairline rules (left rule on section headings).
- **Material:** cream glass, hairline plum→gold edge, radius 6px, soft shadow, 2px lift.
- **Covers:** pale duotone with fine horizontal rules; cover captions in serif.
- **Do:** more whitespace, fewer borders; it should read like a magazine contents page.
- **Don't:** add "The product issue / NK." captions or other faux-magazine furniture; let hairline edges disappear in dark mode (check `--edge` alpha ≥ ~0.3).

## Shared across looks
- Product brand hues (`brand-assets.ts`) only inside covers.
- Status green for "Open to work" (`#3a9b65`) is fixed across looks — it's semantic, not decorative.
- Logos sit on white tiles in every look (they're raster brand marks with their own backgrounds).
