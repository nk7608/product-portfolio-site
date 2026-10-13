# Portfolio product journey

## Design analysis
The first task for a visitor is choosing how to assess Nayana, not completing a form. The landing page offers three optional routes and immediate access to the full portfolio. No identity or answer is collected. The route is a shareable URL, and browser Back works between chapters.

- Hiring: brief → shipped work → career → experiments → evidence → personal.
- Building: shipped work → career → brief → experiments → evidence → personal.
- Exploring: career → brief → shipped work → experiments → evidence → personal.

All routes include every chapter. The selected route is rendered on the server from its URL so shared tour links do not flash the full page. Without a tour URL, the complete page is rendered and is readable without onboarding. The career flow runs chronologically from Phasio through Blaze and Opsmith to Vidrush; every node opens the corresponding source-backed brief.

## Content and components
Keep professional facts in existing MDX. `work-story.tsx` renders all four companies from those records, including role, dates, metrics, ownership, decisions, releases, alignment, reflection, and evidence. Do not rewrite measured outcomes during visual changes.

`content/experiments.json` owns the experiment cards. `ExperimentLab` is reused in the guided journey, full portfolio, and `/experiments`. Independent proposals are identified explicitly; Foobar is a simulated deployment. The cycle-synced build remains a personal prototype.

Use PRD and spec language where it helps structure the evidence, not to describe personal facts as invented product metrics. Recommendations remain verbatim and Elaya remains explicitly excerpted.

## Visual foundation
Reuse the warm sunrise, sky, leaf, and clay tokens in globals.css for light mode and the existing deep sky, green, amber, and coral tokens for dark mode. Instrument Serif is selective in editorial headings. Geist Sans handles interface copy and narrative; Geist Mono identifies dates, stages, and metrics. Journey styles are scoped in journey.css so standalone MDX pages retain their established reading layout.

Prefer readable 12–14px summaries, 18–20px card titles, and 28–37px section titles. All buttons have 44px minimum targets. Stack grids on mobile, collapse guided chapter navigation behind See all steps, with a wrapping grid when opened, and let long briefs scroll naturally. Do not lock scrolling, auto-advance, or hijack arrow keys outside the game.

## Offline and play
Scope Runner is a self-contained HTML/canvas game at `/offline.html`, also loaded on explicit request in the final chapter. It supports keyboard and touch, pause/resume, restart, and pauses on blur/backgrounding. It records no scores or personal data. Motion starts only on user activation; reduced motion lowers its pace.

The production service worker caches only the offline fallback after an initial successful visit. It does not cache or intercept resume PDF downloads, API requests, or third-party content. Page navigations always attempt the network; network failure or 5xx uses the fallback, while 404 stays a 404. A first visit while offline cannot be recovered before installation. No guarantee is made for third-party prototypes or embeds offline.

## Reference patterns
- Typeform onboarding: https://mobbin.com/flows/1856adf8-41de-4886-882b-18ed02a2d763 — focused choices and clear continuation.
- Linear product sections: https://mobbin.com/sites/sections/ac08f1c7-d536-4996-91cc-85da059dcade — document hierarchy, small labels, compact structured panels.

## Reusable instructions for future assistants
Preserve the Next.js/TypeScript/Tailwind/Motion/MDX/Vercel stack. Add routes and chapter order in src/lib/journey.ts; use existing content sources and shared cards. Keep onboarding optional, every section available to all routes, and hobbies last. Preserve metrics with attribution and downloadable resume links. Keep experiments on one mobile-friendly page. Validate URL restoration, Back/Next/exit, keyboard focus, theme, disclosure closure, PDF downloads, game controls, offline fallback behavior, and reduced motion before deploying.
