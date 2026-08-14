# AI Agent Guidelines

> **Project: Delusion Calculator**

This document serves as a context file for AI coding assistants and agents working on this repository.

## Project Overview

The Delusion Calculator is a Next.js web application inspired by the Fresh & Fit podcast. It calculates the statistical probability of a user finding a partner matching their specific criteria using real US demographic data. It provides a harsh, comedic reality check.

## Tech Stack Summary

- **Next.js 15** (App Router)
- **TypeScript** (Strict mode)
- **Tailwind CSS v4**
- **Framer Motion** (UI animations)

## Key File Locations

- `src/app/page.tsx`: The main UI.
- `src/lib/calculator.ts`: Contains the probability math logic.
- `src/data/`: Contains JSON files with statistical data and roast text.
- `src/components/`: Reusable UI elements.

## Coding Conventions

- **TypeScript**: Always use strict typing. Avoid `any`. Define interfaces for all data structures in `src/types/`.
- **Client vs Server**: Use `'use client'` at the top of files that require interactivity (Framer motion, React state). Keep data processing logic separate so it can eventually run server-side if needed.
- **Styling**: Exclusively use Tailwind CSS classes. Do not create custom CSS files unless absolutely necessary for complex animations.
- **Imports**: Use absolute imports with the `@/` alias (e.g., `import { calculate } from '@/lib/calculator'`).

## The Fresh & Fit Design System

When generating UI, adhere strictly to this palette:
- Background: `#0D0D0D` (Obsidian)
- Primary Accent: `#E50914` (Crimson)
- Secondary Accent: `#00E5FF` (Cyan)
- Fonts: Bebas Neue (Headers), Anton (Subheaders), Inter (Body), JetBrains Mono (Numbers).

## How to Add New Demographic Data

1. Obtain valid US Census/CDC data.
2. Convert it into a clean JSON array/object structure.
3. Save it to `src/data/your-data.json`.
4. Update `src/lib/calculator.ts` to include the new variable in the multiplication chain. Ensure you account for conditional probabilities (e.g., relate it to age).

## How to Add New Roast Comments

1. Open `src/data/roasts.json`.
2. Find the relevant `score_tier` (0 to 5).
3. Add a new string to the array. Ensure the tone is blunt, podcast-style reality-check humor.

## Testing Instructions

If generating tests, use **Jest** and **React Testing Library**.
Focus tests on `src/lib/calculator.ts` to ensure math formulas (Normal CDF, bracket interpolations) return expected percentages.
