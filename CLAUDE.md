# Working on this portfolio

- Before changing homepage layout, copy, case briefs, experiments, contact or anything mobile: use the `portfolio-ux-patterns` skill (`.claude/skills/portfolio-ux-patterns`). It has the page shape, length budgets and a measure script.
- Before changing colours, gradients, glass, covers, dark mode or the appearance lab: use the `portfolio-looks` skill (`.claude/skills/portfolio-looks`). Looks change tokens only; content and order are identical in all four.
- Validate with `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.
