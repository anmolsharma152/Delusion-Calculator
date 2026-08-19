# Project State

## Project Summary
Next.js 16 (App Router, Turbopack) + React 19 + TS strict + Tailwind v4 + Framer Motion live stream and reality check tool inspired by Fresh & Fit. Computes the probability a US man matches a woman's criteria using pre-aggregated Census ACS (2024), CPS, and CDC NHANES distributions. Pure client-side, zero backend. Features a 45+ FX soundboard, stream mode, dual themes, delusion meter, and social share card.

*Note: This repository (`Delusion-Calculator`) is exclusively for the US Female Delusion Calculator. The Indian market calculator has been split into an independent project (`Rishta Calculator`).*

## Current Development Phase
Post-MVP production release on `main`. Features 3x2 criteria grid, snapping height slider (default 5'9"), Data Pack 2026.2 lifestyle filters, full 45+ sound vault, keyboard shortcut cheatsheet (`/`), in-app methodology modal (`A`), and high-performance canvas background.

## Current Status
- `npm run build` passes clean (7/7 static routes).
- Working tree clean, HEAD in sync with `origin/main`.
- Live deployment active on Vercel at `https://female-delusion-calculator.vercel.app/`.

## Architecture References
- `AGENTS.md` (authoritative stack & conventions)
- `docs/ARCHITECTURE.md` (system design)
- `docs/DATA_PACK.md` (Data Pack 2026.2 specification)
- `docs/DATA_STRATEGY.md` (statistical methodology)
- `docs/DEPLOYMENT.md` (Vercel & OBS broadcast guide)
- `docs/FRONTEND_DESIGN.md` (design tokens & visual system)

## Core Constraints
- No backend; pure client-side TS; strict TypeScript; no `any`; shared types in `src/types.ts`.
- `next` pinned to 16.3.0. `npm run build` is the verification gate.
- Interactive components `'use client'`, `@/` imports. Fonts via `font-display`/`font-subhead` utilities only.
- Solid `#0e0726`/`#180e38` surfaces; avoid semi-transparent fills.
- Keep the `INPUT`/`TEXTAREA` guard in the hotkey handler.
- Soundboard: hardcoded arrays in `SoundVaultModal.tsx`; MP3s registered in `public/Soundbites/`.
- `InteractiveBackground` uses pre-rendered offscreen canvases and avoids per-frame `shadowBlur`.

## Implemented Features
- **Unified Shell**: WELCOME / INPUT / RESULTS views, Stream Mode (`[Space]`/`[S]`), Themes (`[T]`), Fullscreen (`[F]`).
- **Input System**: 3x2 criteria form with snapping height slider (5'9" default), custom income parsing, and single-click selections.
- **Data Pack 2026.2**: Religion, Politics (including strict Independent), No Children, No Substance Use, Clean Record, Non-Smoker, Heterosexual Only.
- **Scoring & Roasts**: 0–5 Delusion Score, Cat Lady Risk Meter, 1-in-X ratio, demographic breakdown, 150+ Fresh & Fit reality roasts.
- **Sound Vault**: 45+ soundbites, Bank 1 & 2 sampler presets, search modal (`[M]`), `[Tab]` bank swap, floating audio HUD.
- **Accessibility & UX**: Keyboard cheatsheet (`[/]`), Methodology modal (`[A]`), Navigation shortcuts (`[H]` / `[C]`), Rotating cat litter bag next to official banner.
