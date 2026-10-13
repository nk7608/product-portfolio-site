# Appearance lab

Visitors can choose an appearance independently of the guided route. The label “A/B experimentation” is a playful, self-selected appearance demo, not a randomized test or measured winner. No new tracking service is enabled.

## Research and shortlist

- Fieldnotes: Windowed Portfolio (https://github.com/neobrutalism-templates/windowed-portfolio), a public MIT Next.js/Tailwind template. Adapt compact workspace framing to warm paper, illustrated stickers and connected notes; avoid draggable windows on mobile.
- Blue Blocks: Neobrutalism Portfolio (https://github.com/neobrutalism-templates/portfolio), a public Next.js/Tailwind portfolio template. Adapt thick rules, offset shadows, cobalt tiles and geometric shapes. The main neobrutalism.dev templates page currently says coming soon; use the published GitHub repository as the reference.
- Green Room: daisyUI's free theme system (https://daisyui.com/docs/themes/), emerald/forest palette direction; Mobbin's TIDAL library composition (https://mobbin.com/sites/sections/febe4345-f5ea-4f2f-a0dc-6e3530a5110c) supplies visual reference for cover cards. This is a custom music-library adaptation, not a downloadable Spotify template or copied brand artwork.
- Chic: Magic UI's free portfolio (https://magicui.design/docs/templates/portfolio / https://github.com/magicuidesign/portfolio) supplies compact work/experience hierarchy, adapted into an editorial index with cream/ink tones and fine rules.

These are design-pattern adaptations, not wholesale template imports. All implementation is local and original; no paid template, proprietary screenshot, new UI dependency or copied source is included. Existing Next.js/React, CSS tokens, Lucide, Motion and content files are reused.

## Reusable implementation instructions

Keep one semantic content tree. Apply appearance through the root data-appearance attribute and appearance.css. Do not fork content or route logic. Maintain light/dark tokens for every appearance. Fieldnotes remains the default. Validate persisted values via validAppearance; gracefully tolerate unavailable localStorage. Preserve tour query parameters and open story state when switching. Keep the appearance control on all portfolio pages. Use native dialog focus containment and Escape behavior with focus returning to its trigger.

Use decorative, aria-hidden icons and CSS artwork to support labels; never substitute icons for meaningful text. Keep the same resume, evidence, social and prototype links. Respect reduced motion. Avoid animation of decoration by default. Maintain single-column cards on phones and at least 44px controls. Test all four variants at 320/390/768/1024/1440, both modes, story expansion, routes and persistence.

Appearance choices are saved locally under nayana-appearance-v1. appearance_change is available to the existing no-op analytics adapter; no new data destination is enabled. The offline fallback retains its lightweight standalone recovery interface.
