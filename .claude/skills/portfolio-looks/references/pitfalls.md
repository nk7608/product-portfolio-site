# Look-specific pitfalls (all seen on this site)

1. **Effects only in one look.** Glass, gradients and active cards existed in Fieldnotes' hero only; other looks had flat cards. Cause: per-look selector overrides. Fix: shared material + tokens (`surfaces.css`).
2. **Overrides fighting each other.** Four generations of `html[data-appearance=X] :is(.card…)` rules stacked in `appearance.css`; the last one won by accident. Keep the token-only rule.
3. **Looks that change the layout.** Blocks went to a 3-column experiment grid (orphan third card when only 4 shown); Chic changed experiment cards to a 3-column internal grid. Content parity broke and every new feature had to be built four times.
4. **Theme decorations as content.** "BUILD NOTES ●●●", "SIDE A ◉ PRODUCT STORIES", "The product issue NK." were added per look on covers. They read as noise and duplicated nothing useful.
5. **Brand colour leaking into chrome.** Company banner colours (Blaze teal, Phasio purple) next to a green accent looked like a different site. Brand hues stay inside covers.
6. **Hard edge in the atmosphere.** `background-size:100% 1900px` + `repeat-y` produced a visible seam. Fixed atmosphere layer only.
7. **Halo tinting the glass.** A `::before` halo with `z-index:-1` inside an element with `backdrop-filter` (new stacking context) painted *over* the glass. Use outer `box-shadow` halos.
8. **Ring clipped by overflow.** A gradient edge at `inset:-1px` vanished on `overflow:hidden` cards. Draw the ring at `inset:0` with `border:0`.
9. **Faint dark-mode edges.** Chic dark edges at ~15% alpha disappear; keep ≥ ~30% on at least one stop.
10. **The floating "A/B" pill.** Clever label, but on phones it overlapped content and its purpose wasn't obvious. Plain "Appearance" in the menu; joke as subtitle.
