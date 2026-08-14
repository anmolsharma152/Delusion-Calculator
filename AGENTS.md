# AI Agent Guidelines

> **Project: Delusion Calculator**

Next.js web app (Fresh & Fit / Miami After Hours themed) that computes the probability of finding a partner matching criteria using US demographic data. All calculation is pure client-side TypeScript — there are **no API routes and no backend**.

## Tech Stack

- **Next.js 16** (App Router, Turbopack). `next` is pinned to `16.3.0` — **not** Next 15, despite README/badges.
- **React 19**, TypeScript strict, Tailwind CSS v4, Framer Motion 13.

## Commands

- `npm run dev` — dev server on port 3000 (or 3001 if 3000 is taken).
- `npm run build` — the verification gate; currently passes clean. Run before finishing any task.
- `npm run lint` — **NOT clean**: pre-existing `react-hooks/set-state-in-effect` and `no-unused-vars` errors. Don't gate on it or "fix" unrelated hits.
- No test framework is configured (no jest/vitest).

## Architecture

- `src/app/page.tsx` is the entire app shell: WELCOME / INPUT / RESULTS view states, Stream Mode, theme (VAPORWAVE / OBSIDIAN), soundboard, and global hotkeys. Most UI work lands here or in `src/components/`.
- `src/app/stream/page.tsx` is only a client-side redirect to `/` — Stream Mode is a state toggle in `page.tsx`, not a separate route.
- `src/app/about/page.tsx` documents the methodology; `src/app/layout.tsx` hardcodes the Vercel SITE_URL and the four Google fonts.
- Calculation flow: `CriteriaForm` → `page.tsx` state → `hooks/useCalculator.ts` → `engine/probability.ts` → `data/distributions.ts`. Pure functions, no server work, no fetching.
- `next.config.ts` only adds security headers (no static-export config, despite `docs/DEPLOYMENT.md`).

## Conventions & Gotchas

- **TypeScript**: strict; no `any`. Shared types/enums live in `src/types.ts`.
- **Client vs Server**: every interactive component starts with `'use client'`. Use `@/` absolute imports.
- **Fonts**: Bebas Neue / Anton / Inter / JetBrains Mono load via `next/font/google` in `layout.tsx`. Apply with the Tailwind v4 `@utility` classes `font-display` and `font-subhead` — plain `font-bebas`/`font-anton` utilities do **not** exist.
- **Surfaces**: use solid `#0e0726` cards (`.glass-card-vapor` / `.glass-card-cyan`) on the `#180e38` / `#0c0721` gradient. Avoid semi-transparent fills that hurt text legibility.
- **Hotkeys** (`page.tsx`): `[Space]` toggles Stream Mode, `[Enter]` advances views, `[Tab]` / `` ` `` switches sound banks, `[1]`–`[0]` trigger drops. The handler early-returns while typing in INPUT/TEXTAREA — keep that guard when adding keys.
- **Soundboard**: banks are hardcoded arrays in `SoundVaultModal.tsx` (`BANK_1_SOUNDS`, `BANK_2_SOUNDS`, `ALL_VAULT_SOUNDS`). Adding a sound means dropping the mp3 in `public/Soundbites/` **and** registering its path in those arrays (a prior commit fixed broken paths). Playback runs through `GlobalAudio`, exported from `components/AnticipationOverlay.tsx`.
- **Canvas perf**: `InteractiveBackground.tsx` pre-renders sprites to offscreen canvases and deliberately avoids per-frame `shadowBlur` (was removed to reach near-0% CPU). Keep it that way.
- `CLAUDE.md` just imports `@AGENTS.md` — update this file, not that one.

## Palette

- Obsidian Dark `#080808` / `#0D0D0D`; surfaces `#0e0726` / `#180e38`
- Crimson Neon `#FF007F` / `#E50914`; Electric Cyan `#00F5FF`; Laser Gold `#FFE600`
- Glow helpers (`.glow-pink`, `.glow-cyan`, `.text-glow-*`) and vaporwave grid/sun layers live in `src/app/globals.css`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
