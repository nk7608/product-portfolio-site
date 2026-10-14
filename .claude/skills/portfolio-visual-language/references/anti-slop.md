# Anti-slop checklist

Each row: what to avoid → why (source) → what to do instead. Most of these were on this site before Oct 14, 2026.

| Avoid | Why | Instead |
|---|---|---|
| Glassmorphism, translucent blurred cards | Listed as a top AI tell (Beaver Builder; Medium "AI design slop"; DesignCode); also expensive on phones | Solid background; separate items with a 1px rule |
| Gradient borders, halos, glows, coloured shadows | "glow lights, purple gradients" (DesignCode) | No border, or one neutral rule; shadow only on floating sheets |
| Aurora/blob backgrounds, noise overlays, drifting atmospheres | Decorative, reads as generated, competes with text | Flat `--bg` |
| Italic or coloured word inside a headline ("Behind every launch, *a product decision.*") | "Headlines filled with italicized words" (Beaver Builder) | Plain sentence; emphasis by weight on a noun if needed |
| Uppercase mono eyebrows over every block ("01 / PRODUCT BRIEF") | "oversized eyebrows" (DesignCode) | Section title in body face, weight 600, plus a count |
| Rows of status pills/chips | "random status pills" (DesignCode) | One line of text: "Open to PM roles · Bangalore · …" |
| Cursor spotlight, hover lift, tilt | Effects for their own sake | Colour change on hover; `+` rotates when open |
| Generic floating-UI illustrations on every card | "generic illustrations, visuals that do not match the product" | Product-specific scenes, only inside an opened item |
| Default fonts (Inter/Geist everywhere) | "default fonts" (DesignCode) | Instrument Sans; Newsreader for serif reading |
| Many accent colours, brand colours in chrome | Noisy, not a system ("semantic colour systems over decorative gradients", 925 Studios) | One accent; brand hues only inside covers |
| Pitch copy ("What should we build next?") | Sounds like a landing page | Plain facts, first person, short |
| Boxes nested in boxes | "boxes nested inside other boxes" (Beaver Builder) | One level of grouping: section → rows |
