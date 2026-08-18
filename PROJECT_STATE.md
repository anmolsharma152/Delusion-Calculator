# Project State

## Project Summary
Next.js 16 (App Router, Turbopack) + React 19 + TS strict + Tailwind v4 + Framer Motion live podcast tool for Fresh & Fit: computes the probability a US man matches a woman's criteria using pre-aggregated census/CDC distributions. Pure client-side, no API/backend. Repositioned as a live-show-ready tool, core message "LET'S BUILD YOUR MAN". Features 45+ FX soundboard, stream mode, dual theme, delusion meter, share card.

## Current Development Phase
Post-MVP expansion per `docs/ROADMAP_vNEXT.md`. M0 (shortcuts/discoverability) and M1 (landing) shipped; M5 (filters) and M6 (data versioning) shipped ahead of roadmap ordering per explicit user request; M2/M3 partial; M4/M7 not started.

## Active Milestone
Paused: header polish (uniform chrome Option A, `max-w-7xl` width, stream-mode header hide) + dead-route cleanup (`/stream`, Footer, sitemap, stale docs). Awaiting user decisions.

## Current Status
`npm run build` passes clean. Working tree clean, HEAD in sync with origin/main. Lint NOT clean (pre-existing, not gated). No test framework. Dev server on port 3000.

## Architecture References
`docs/ARCHITECTURE.md` (partly stale), `docs/DATA_STRATEGY.md` (stale on versions), `docs/FRONTEND_DESIGN.md` (stale on auto-hide), `docs/DATA_PACK.md` (current), `AGENTS.md` (authoritative stack/conventions).

## Core Constraints
- No backend; pure client-side TS; no `any`; shared types in `src/types.ts`.
- `next` pinned 16.3.0 (not Next 15). `npm run build` is the verification gate; lint deliberately not gated.
- Interactive components `'use client'`, `@/` imports. Fonts via `font-display`/`font-subhead` utilities only.
- Solid `#0e0726`/`#180e38` surfaces; avoid semi-transparent fills.
- Keep the INPUT/TEXTAREA guard in the hotkey handler.
- Soundboard: hardcoded arrays in `SoundVaultModal.tsx`; mp3 must be registered in those arrays.
- `InteractiveBackground` must avoid per-frame `shadowBlur`.

## Implemented Features
- Unified shell: WELCOME/INPUT/RESULTS, stream toggle (Space/S), theme (T), fullscreen (F).
- 3x2 criteria form; snapping height slider (default 5'9").
- Multiplicative age-conditional engine with religion, politics (incl. strict independent), children, drug, record, non-smoker, straight filters.
- DATA PACK 2026.2 + changelog; delusion meter (0-5), gauge, cat bag meter, 1-in-X, breakdown, roasts.
- 45+ FX / 2 banks / vault (M), shortcuts registry + cheatsheet (`/`), methodology modal (A), share card, anticipation overlay, canvas background.

## Features In Progress
- Header polish (chrome, width, stream hide) — paused awaiting decisions.
- Dead-route cleanup — planned, not started.

## Pending Features
- M2.1 typography audit report (blocker for M2.2/2.3 code).
- M3 Result Screen 2.0: remaining pool, biggest shrinking factor, 1-in-X rarity meter (proposal first).
- M4 Stream Mode 2.0: castle meter, filter-impact viz (proposal first).
- M7 host-facing README, demo video, X outreach.

## Recently Modified Areas
`page.tsx`, `distributions.ts`, `probability.ts`, `types.ts`, `CriteriaForm.tsx`, `MethodologyModal.tsx`, `docs/DATA_PACK.md` (commits `611c9b8`, `84e71a7`, `88935d0`).

## Technical Debt
Dead `src/app/stream/` route; unimported `Footer.tsx`; stale sitemap (`/stream`, `/about`); stale docs (README Next 15 / about / auto-hide / `[Tab]/[`]`, ARCHITECTURE.md, FRONTEND_DESIGN.md, DEPLOYMENT.md static-export claim, AGENTS.md:23); pre-existing lint errors.

## Open Questions
- Stream-mode header reveal: hotkey-flash vs top-edge peek vs always-visible.
- Footer: delete vs restore with working stream-mode link.

## Next Three Recommended Tasks
1. Implement header polish + dead-route/sitemap/docs cleanup (decisions locked pending user answers).
2. Write `docs/TYPOGRAPHY_REPORT.md` (M2.1), then apply typography hierarchy.
3. Write M3.1 (result screen) and M4.1 (stream mode) proposals for approval.
