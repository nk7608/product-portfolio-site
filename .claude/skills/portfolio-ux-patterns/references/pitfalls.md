# Pitfalls to avoid

Each of these happened on this site. The "seen as" line says how to recognise it again.

## Information density
1. **Same content in two sections.** Career flow and Shipped work both listed the same four companies with the same headline metric. *Seen as:* a company name appearing twice before any tap. Fix: one Experience list.
2. **Metrics in three places.** Proof panel, career card and brief summary all showed "10% → 40%"; the opened brief showed them a fourth time. *Seen as:* identical numbers within one scroll.
3. **Chips repeated.** Location/availability chips in hero and again in contact. Keep them once near the top; contact just links.
4. **Paragraph intros under every heading.** If the heading says it, drop the paragraph.
5. **Everything expanded by default.** Six experiment cards × (cover + summary + boundary + links) ≈ three phone screens. Default to collapsed or a carousel.

## Tone
6. **Pitch copy on a portfolio.** "What should we build next?", "I turn unclear customer problems into products that ship, get adopted, and support revenue". Write facts, not claims.
7. **Too many CTAs.** Hero, rail, route card, contact panel and footer all asked for contact. One primary contact action on screen at a time (plus the mobile sticky bar).

## Navigation and modes
8. **Tour mode that hides sections.** Guided routes set `hidden` on non-current chapters and added Back/Next — the visitor loses the scroll they expect. Use a lens that reorders, not a wizard that hides.
9. **Six-tile chapter grid on mobile.** It consumed a full screen before any content. On phones, navigation is the header menu plus the lens; no in-page grid.
10. **Floating controls over content.** The "A/B experimentation" pill sat on top of route options on a 390px screen. On mobile, move the look switcher into the menu/footer.

## Visuals
11. **Marketing banners as covers.** LinkedIn banners (ads, stock photo, "Join us at phas.io") said nothing about the work. Covers must depict the product or the decision.
12. **Illustration behind text.** On phones the cover scene sat faded under the caption. Stack image and text.
13. **Background gradients ending in a hard edge.** A `background-size` tiled atmosphere stopped mid-page. Use the viewport-fixed atmosphere layer.
14. **Tiny scene text on small screens.** SVG labels at 10px in a 516-wide viewBox become ~6px on a 340px card. On mobile, prefer the scene without text-heavy panels, or let it scale to full width.

## Mechanics
15. **Hover-only affordances.** Spotlight/lift are fine, but every action must also be visible without hover.
16. **Width-based CSS cascade bugs.** A later unscoped rule (`.work-summary>.product-cover{height:224px}`) silently beat the mobile rule. Put base rules before media queries and scope consistently.
17. **Measuring by eye.** "Feels shorter" isn't a check; run `scripts/measure.mjs` and compare with the budgets.
