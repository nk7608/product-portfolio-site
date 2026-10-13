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

## Brand-led revision — October 13

Removed the hero sticker strip. BrandCover and BrandLogo share a mapping in src/lib/brand-assets.ts; they appear on work summaries, expanded briefs, standalone case pages and independent experiment cards. Official source pages are recorded alongside URLs. The imagery is illustrative company branding, not evidence of shipped UI or an endorsement. Blaze uses the verified withblazeapp LinkedIn identity rather than the unrelated blaze.ai company.

All eight company logos and LinkedIn banners are verified and served locally from public/brands. SOURCES.json records their origin. Official banners retain their proportions, with portfolio labels below rather than over the company copy. Personal prototypes use contextual domain motifs; those are not company logos.

The four themes now share layered atmosphere, translucent surfaces, inner highlights and blur fallbacks. Blue Blocks adds blueprint texture, dimensional studs and tile edges; Green Room uses sleeve borders, record labels and a translucent library rail; Chic uses issue labels, fine rules, serif cover titles and muted glass panels. Branding remains legible and unfiltered in every theme.

New resume: Nayana K Product Works Resume.pdf. SHA-256: 3284dbc416b77969cbdf5c042204e5e0cc9782d78193c025100f7ff7915787a2. The public asset path remains unchanged for all CTAs.

Validation: production build, lint and 16 tests passed. Expanded stories checked in all four themes at five viewport widths. Experiments checked in all four themes, both light/dark modes and five widths (40 combinations). No horizontal overflow; all six experiments retained. Standalone case page and mobile resume download verified. Downloaded PDF hash matches the user-provided file exactly.

## Unified surfaces and product covers — October 13, 2026

Every card in every look is now the same object, defined once in `src/app/surfaces.css`: frosted glass, a 1px gradient edge (CSS mask ring on `::after`), a cursor spotlight (`src/components/spotlight.tsx` writes `--mx/--my` on the hovered card, fine pointers only), a hover lift, and an "active" ring for open stories and focused cards. Featured surfaces (route picker, contact panel) add a coloured outer halo. Looks only change tokens in `appearance.css` (`--glass`, `--edge*`, `--card-shadow*`, `--spot*`, `--radius-card`, `--lift`, cover tokens), so a new effect lands in all four looks at once. Do not add per-look card backgrounds, borders or shadows; add or change a token instead.

LinkedIn marketing banners are removed. Work and experiment covers are original SVG scenes (`src/components/cover-scenes.tsx`) that show what each product does and, on work covers, a one-line "What shipped" caption from the release notes. Scenes are tinted by the brand hue in `brand-assets.ts` and restyled per look (dotted paper, cobalt blueprint, record-sleeve grooves, editorial hairlines). Company logos remain the only brand artwork.

The page atmosphere is a viewport-fixed layer with a slow drift (off under reduced motion), so the glow never ends in a hard edge mid-page. Career flow is a compact 2×2 / 4-up progression; full detail lives in the product briefs. The hero adds a "Shipped with" logo strip.

## Concise pass and hardening — October 13, 2026

Copy is trimmed for skimmers and written as a portfolio rather than a pitch: "Open to work" is a status tag beside location and hours (hero and contact), the guided tour is a small "Short on time?" card, section intros are one line, career cards show role + one result, experiments show four with "Show all 6", long recommendations clamp with "Read more", and an opened brief no longer repeats its title, logo or metrics (alignment and reflection sit in a collapsible). On phones the cover illustration stacks under its caption instead of sitting behind it.

Security: Next.js pinned to 16.3.8 (fixes a critical RCE and several high advisories in 16.3.5), all "latest" ranges pinned, `sharp` and `source-map-js` forced to patched versions via pnpm overrides. `next.config.ts` sends a Content-Security-Policy allowlisting only the opt-in YouTube/X embeds and Vercel's preview toolbar, plus HSTS, X-Frame-Options, COOP and a stricter Permissions-Policy. The Scope Runner iframe is sandboxed to scripts only. Remaining audit findings (`braces` via eslint, `sprintf-js` via gray-matter) are build/lint-time only and have no upstream patch.
