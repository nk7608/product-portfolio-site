# Phones (≤640px)

- Same single column; 20px gutters; no horizontal scroll anywhere.
- Header: name, ⌘K, Settings. Work/Contact links and the clock hide; the hero carries contact.
- Hero must fit the first viewport: name, positioning, status line, links, and the three outcomes as a compact 3-column row (small text, no stacked panels).
- Rows: number · title on the first line, year + duration on the second, result/summary on the third. Opened rows drop the left indent; brief columns stack.
- Settings opens as a bottom sheet (respect `env(safe-area-inset-bottom)`); ⌘K opens centred near the top; the intro is a centred card with Skip.
- Tap targets ≥ 32px with spacing; text links have generous underline offsets.
- No blur or heavy effects anywhere (there are none to remove now — keep it that way).
- Check 360, 390 and 430px in Paper and Night, with a row open and Settings open.
