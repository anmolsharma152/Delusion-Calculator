# AI Agent Guidelines

> **Project: Delusion Calculator**

This document serves as the context and convention manual for AI coding assistants working on this repository.

## Project Overview

The Delusion Calculator is a Next.js 15 web application inspired by the Fresh & Fit podcast (Miami After Hours). It calculates the statistical probability of finding a partner matching specific criteria using real US demographic data (Census ACS 2023 & CDC NHANES 2021–2023).

## Tech Stack Summary

- **Next.js 15** (App Router, Turbopack)
- **TypeScript** (Strict mode)
- **Tailwind CSS v4**
- **Framer Motion** (UI animations)

## Key File Locations

- `src/app/page.tsx`: Unified single-shell application core managing view states, Stream Mode, themes, and soundboard.
- `src/components/CriteriaForm.tsx`: 3x2 spacious card layout with dropdowns, range sliders, and banner header.
- `src/components/Header.tsx`: Adaptive top header with theme switcher, soundboard bank toggles, and stream auto-hide.
- `src/components/SoundVaultModal.tsx`: 45+ categorized Fresh & Fit sound effects deck with live search.
- `src/components/ResultsPanel.tsx`: Gauge meter, match %, ratio, breakdown chart, and roast commentary box.
- `src/components/InteractiveBackground.tsx`: HTML5 canvas particle and cat litter bag mouse repulsion physics.
- `src/engine/probability.ts`: Age-conditional demographic probability multiplication math.
- `src/data/distributions.ts`: US Census & CDC demographic data arrays.

## Coding Conventions

- **TypeScript**: Strict typing required. Avoid `any`. Define interfaces in `src/types.ts`.
- **Client vs Server**: Mark interactive components with `'use client'` at the top.
- **Styling**: Use Tailwind CSS utility classes and solid `#180e38` / `#0e0726` surface tokens. Avoid semi-transparent glass fills that reduce text legibility.
- **Imports**: Use absolute imports with `@/` alias (e.g. `import { useCalculator } from '@/hooks/useCalculator'`).
- **Hotkeys**: Keep global hotkeys (`[Space]`, `[Enter]`, `[Tab]`, `[1]-[0]`) synchronized across all modes.

## The Fresh & Fit Design System

- **Obsidian Dark**: `#080808` / `#0D0D0D`
- **Crimson Neon**: `#FF007F` / `#E50914`
- **Electric Cyan**: `#00F5FF` / `#00E5FF`
- **Laser Gold**: `#FFE600` / `#FFCC00`
- **Fonts**: Bebas Neue (Headers), Anton (Subheaders), Inter (Body), JetBrains Mono (Numbers).

## Testing & Build

Before completing any task, run `npm run build` to ensure zero TypeScript and Turbopack errors.
