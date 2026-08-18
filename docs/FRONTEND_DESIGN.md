# Frontend Design & UI System Guide

> **Project: The Delusion Calculator**

---

## 1. Aesthetic Foundations: Miami After Hours

The visual design is inspired by the **Fresh & Fit Miami After Hours studio**: dark obsidian and deep purple foundations, neon crimson and electric cyan accents, scanlines, and solid high-contrast surfaces.

### Color Tokens

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| **Obsidian Dark** | `#080808` / `#0D0D0D` | Primary background in Obsidian mode |
| **Outrun Purple** | `#0c0721` / `#180e38` | Card backgrounds in Vaporwave mode |
| **Crimson Pink** | `#FF007F` / `#E50914` | Primary CTA, Delusional tiers, neon headers |
| **Electric Cyan** | `#00F5FF` / `#00E5FF` | Secondary accents, low delusion, sliders |
| **Laser Gold** | `#FFE600` / `#FFCC00` | Warnings, ratio highlights, soundboard tags |
| **Stark White** | `#FFFFFF` | Primary headings, selected button states |

---

## 2. 3 × 2 Spacious Calculator Grid Layout

The main calculator form ([`CriteriaForm.tsx`](file:///home/anmol/Projects/Delusion%20Calculator/src/components/CriteriaForm.tsx)) uses a **3-column by 2-row layout**:

1. **Card 1: Age Range** — Dual range sliders with direct numerical indicators (`18` to `65+ Yrs`).
2. **Card 2: Minimum Height** — Dropdown select menu (`5'0"` to `6'6"+`) + quick slider.
3. **Card 3: Race / Ethnicity** — Checkbox-style multi-select grid.
4. **Card 4: Minimum Education** — Dropdown select menu (*Any*, *High School*, *College*, *Bachelor's*, *Master's*, *Doctorate*).
5. **Card 5: Minimum Income** — Custom dollar input + preset slider (`$0` to `$500k+`).
6. **Card 6: Status & Fitness** — Checkbox toggles (*Must Be Single*, *Exclude Obese*) + Location Scope dropdown.

### Solid Non-Transparent Card Hygiene
All cards use solid `#180e38` and `#0e0726` background fills with solid borders to ensure background canvas particles or grids never reduce typography contrast or legibility.

---

## 3. Typography Hierarchy

* **Headlines / Scores**: **Bebas Neue** (`font-display`) — High-impact all-caps display font.
* **Subheaders**: **Anton** (`font-subhead`) — Compact section headers.
* **Body / Labels**: **Inter** (`font-sans`) — High legibility on mobile and desktop.
* **Numbers & Roasts**: **JetBrains Mono** (`font-mono`) — Monospaced data displays and terminal roasts.

---

## 4. OBS Stream Mode Overlay & Header

In Stream Mode:
* The top header is hidden by default and only peeks back when the cursor reaches the top edge of the screen (mouse leaves → header hides again). No fullscreen is forced — hosts capture the window content directly.
* In **Obsidian Dark Theme**, the background canvas is completely disabled for a 100% pitch-black background suitable for chromakeying or window capture.
