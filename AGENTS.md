# AI Agent Guidelines

> **Project: Delusion Calculator (Fresh & Fit — US)**

Next.js web app (Fresh & Fit / Miami After Hours themed) that computes the empirical probability of finding a partner matching criteria using US demographic data. All calculation is pure client-side TypeScript — there are **no API routes and no backend**.

*Note: This repository is dedicated exclusively to the US Female Delusion Calculator. The Indian market calculator has been split into an independent project (`Rishta Calculator`).*

## Tech Stack

- **Next.js 16** (App Router, Turbopack). `next` is pinned to `16.3.0` — **not** Next 15.
- **React 19**, TypeScript strict, Tailwind CSS v4, Framer Motion 13.
- **Lucide React** for UI icons.

## Commands

- `npm run dev` — dev server on port 3000 (or 3001 if 3000 is taken).
- `npm run build` — the verification gate; must pass clean before finishing any task.
- `npm run lint` — **NOT clean**: pre-existing `react-hooks/set-state-in-effect` and `no-unused-vars` errors. Don't gate on it or "fix" unrelated hits.
- No test framework is configured (no jest/vitest).

## Architecture

- `src/app/page.tsx` is the entire app shell: WELCOME / INPUT / RESULTS view states, Stream Mode, theme (VAPORWAVE / OBSIDIAN), soundboard, and global hotkeys. Most UI work lands here or in `src/components/`.
- Stream Mode is a state toggle in `page.tsx` — there is no separate `/stream` route (the old redirect stub was deleted).
- Methodology lives in `src/components/MethodologyModal.tsx` (in-app overlay, hotkey `A`) — there is no `/about` route. `src/app/layout.tsx` hardcodes the Vercel SITE_URL and Google fonts.
- Calculation flow: `CriteriaForm` → `page.tsx` state → `hooks/useCalculator.ts` → `engine/probability.ts` → `data/distributions.ts`. Pure functions, no server work, no fetching.
- `next.config.ts` adds security headers.

## Conventions & Gotchas

- **TypeScript**: strict; no `any`. Shared types/enums live in `src/types.ts`.
- **Client vs Server**: every interactive component starts with `'use client'`. Use `@/` absolute imports.
- **Fonts**: Bebas Neue / Anton / Inter / JetBrains Mono load via `next/font/google` in `layout.tsx`. Apply with the Tailwind v4 `@utility` classes `font-display` and `font-subhead` — plain `font-bebas`/`font-anton` utilities do **not** exist.
- **Surfaces**: use solid `#0e0726` cards (`.glass-card-vapor` / `.glass-card-cyan`) on the `#180e38` / `#0c0721` gradient. Avoid semi-transparent fills that hurt text legibility.
- **Hotkeys** (`page.tsx`):
  - `[Space]` / `[S]`: Toggle Stream Mode in place
  - `[Enter]`: Advance views (`WELCOME` → `INPUT` → `RESULTS` → `INPUT`)
  - `[Tab]`: Toggle soundboard sampler banks (Bank 1 ↔ Bank 2)
  - `[1]`–`[0]`: Trigger soundboard sampler drops
  - `[M]`: Toggle Sound Vault modal
  - `[F]`: Toggle Fullscreen
  - `[T]`: Toggle Theme (Vaporwave ↔ Obsidian)
  - `[H]`: Go to Home / Welcome stage
  - `[C]`: Go to Calculator / Input stage
  - `[A]`: Toggle Methodology modal
  - `[/]`: Toggle Keyboard Shortcuts Cheatsheet
  - Handler guard: Always early-returns when target is `INPUT` or `TEXTAREA`.
- **Soundboard**: banks are hardcoded arrays in `SoundVaultModal.tsx` (`BANK_1_SOUNDS`, `BANK_2_SOUNDS`, `ALL_VAULT_SOUNDS`). Adding a sound means dropping the mp3 in `public/Soundbites/` **and** registering its path in those arrays. Playback runs through `GlobalAudio`, exported from `components/AnticipationOverlay.tsx`.
- **Canvas perf**: `InteractiveBackground.tsx` pre-renders sprites to offscreen canvases and avoids per-frame `shadowBlur` for 60 FPS GPU-accelerated blitting.
- `CLAUDE.md` just imports `@AGENTS.md` — update this file, not that one.

## Palette

- Obsidian Dark `#080808` / `#0D0D0D`; surfaces `#0e0726` / `#180e38`
- Crimson Neon `#FF007F` / `#E50914`; Electric Cyan `#00F5FF`; Laser Gold `#FFE600`
- Glow helpers (`.glow-pink`, `.glow-cyan`, `.text-glow-*`) and vaporwave grid/sun layers live in `src/app/globals.css`
