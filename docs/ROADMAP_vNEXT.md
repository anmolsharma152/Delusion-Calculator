# ROADMAP vNEXT — Live Podcast Tool Positioning

> **Project:** The Delusion Calculator
> **Owner:** Anmol Sharma
> **Date:** August 2026
> **Status:** Active — supersedes the priority ordering of the original `Implementation Plan 1.txt` and `Implementation Plan 2.txt` (those files remain the source of truth for *what* to build; this document reorders and atomizes *when* and *how*).

---

## 1. Product Repositioning

The Delusion Calculator is **no longer a statistical calculator**. It is a **live podcast tool** for the Fresh & Fit workflow.

| Priority | Overrides |
| :--- | :--- |
| Podcast usability | > statistical completeness |
| Discussion generation | > scientific purity |
| Immediate discoverability | > hidden features |
| Visual identity | > feature count |

**Assumption:** Hosts interact with the app for **30–60 seconds**. They will never read the README, open GitHub, or read developer docs. **The website itself must communicate everything.**

**Core message:** `LET'S BUILD YOUR MAN.`

**Positioning:** A live-show-ready dating standards calculator powered by real U.S. Census and CDC data.

**Design:** Maintain and *elevate* the existing Miami / vaporwave / neon / Fresh & Fit identity. Do **not** replace it.

---

## 2. Shortcut Audit (from source)

All shortcuts verified in code. This is the authoritative list for the cheat sheet.

| Key | Action | Source |
| :--- | :--- | :--- |
| `Enter` | Next stage (WELCOME → INPUT → RESULTS → INPUT); triggers calculation when on INPUT | `page.tsx:148`, `CriteriaForm.tsx:75` |
| `Space` | Toggle Stream Mode in place | `page.tsx:141` |
| `S` | Toggle Stream Mode | `page.tsx:186` |
| `Tab` | Switch sound bank 1 ↔ 2 | `page.tsx:159`, `page.tsx:204` |
| `1`–`0` | Trigger soundbite from active bank | `page.tsx:167`, `KEY_LABELS` |
| `M` | Open / close Sound Vault | `page.tsx:179` |
| `F` | Toggle Fullscreen | `page.tsx:193` |
| `T` | Toggle Vaporwave ↔ Obsidian theme | `page.tsx:211` |
| `Esc` | Close Sound Vault / Share Card | `SoundVaultModal.tsx:127`, `ShareCard.tsx:22` |
| `?` | **NEW** — open keyboard shortcut cheat sheet (not yet implemented) | this roadmap |

> Note: all letter/space hotkeys early-return while typing in `INPUT`/`TEXTAREA` (`page.tsx:128`) — must be preserved.

---

## 3. Discoverability Proposal (decision)

**Goal:** Nothing important hidden behind keyboard shortcuts.

**Proposal (recommended):**
1. **Keyboard shortcut cheat sheet overlay** — open with `?` or a visible **Help `?` button** in the header. Data-driven from a shared shortcut registry so docs and UI never drift.
2. **"Press ? for shortcuts" hint** — small, dismissible chip on the landing screen. Never a forced modal.
3. **Data sources affordance** — visible "Powered by Census & CDC" chip on the landing screen linking to `/about` (footer link already exists).
4. **Keep existing visible header icons** — stream, theme, bank, vault, fullscreen are already icon buttons; keep them.

**Rejected for now:** first-run onboarding modal, quick tour, Host/Podcast mode switch (too much friction for a 30–60s window). Revisit only if live testing shows confusion.

---

## 4. Milestones & Atomic Tasks

Every bullet is **independently committable**. Order = implementation priority for podcast usability.

### M0 — Discoverability & Shortcuts (IMMEDIATE — START HERE)
- [ ] M0.1 `docs/ROADMAP_vNEXT.md` — this document (commit)
- [ ] M0.2 Add `src/lib/shortcuts.ts` — single registry of all shortcuts (single source of truth)
- [ ] M0.3 Add `ShortcutsCheatsheet.tsx` overlay component (styled to match theme, closes on `Esc`/backdrop)
- [ ] M0.4 Wire `?` key + `isShortcutsOpen` state into `page.tsx`; add Help `?` button to `Header.tsx`
- [ ] M0.5 Landing discoverability: "Press ? for shortcuts" hint + "Powered by Census & CDC" chip on `WelcomeStage.tsx`
- [ ] M0.6 Capture current-state screenshots (welcome, calculator, results, stream mode, sound vault) for marketing draft

### M1 — Landing & Branding (IMMEDIATE)
- [ ] M1.1 Hero copy → **"LET'S BUILD YOUR MAN."** (`WelcomeStage.tsx`)
- [ ] M1.2 Subheading with live-show positioning: *"A live-show-ready dating standards calculator powered by real U.S. Census and CDC data."*
- [ ] M1.3 Strengthen landing hierarchy for 10-second comprehension (headline → one-line pitch → CTA → data chip)

### M2 — Typography Overhaul (IMMEDIATE — audit FIRST)
- [ ] M2.1 **Write `docs/TYPOGRAPHY_REPORT.md`** (hierarchy, heading scale, body, numbers, results, CTAs, livestream legibility) — *blocker for M2.2/M2.3*
- [ ] M2.2 Apply display-typography hierarchy per report (bigger headline scale, condensed display font usage)
- [ ] M2.3 Results presentation: **larger percentages**, stronger number/label separation

### M3 — Result Screen 2.0 (proposal first)
- [ ] M3.1 **Write proposal** for: percentage, 1-in-N representation, estimated population pool, biggest contributing filters, scarcity indicators — *blocker for M3.2*
- [ ] M3.2 Implement approved result-screen items

### M4 — Stream Mode 2.0 (proposal first)
- [ ] M4.1 **Write proposal** for: remaining-pool visualization, filter-impact ("biggest shrinking factor"), castle/cat-lady meter, 1-in-X rarity meter
- [ ] M4.2 Implement approved items

### M5 — Filter & Engine (POSTPONED until M0–M4 ship)
- [ ] M5.1 Refactor engine: **unselected filter ⇒ multiplier = 1.0, never excludes**
- [ ] M5.2 Add optional Tier-2 filters: education (exists), religion, political affiliation, children, smoking, drug use, BMI, criminal record
- [ ] M5.3 Engine audit: document correlation warning (education↔income, age↔marital, religion↔politics, BMI↔health); **do not blindly multiply**; show per-result biggest shrinking factor
- [ ] M5.4 Update methodology page with documented assumptions + pool-reduction breakdown

### M6 — Data Layer Audit (report first — can start in parallel, no code)
- [ ] M6.1 **Write `docs/DATA_PACK_AUDIT.md`**: current versions (ACS 2023, NHANES 2021–23, CPS 2023 per `DATA_STRATEGY.md`), whether 2025/2026 data exist per source (ACS, CPS, Census, CDC, NHANES, SAMHSA, Pew, Gallup, FBI, BJS), and the update path for each — *blocker for M6.3*
- [ ] M6.2 Add visible `DATA PACK 2026.1` versioning + changelog (fallback `2025.1`)
- [ ] M6.3 Swap datasets **only after M6.1 report approval**

### M7 — Documentation & Marketing (deliverables, not code — after visuals stabilize)
- [ ] M7.1 Rewrite public `README.md` for hosts/podcast viewers; move technical docs to `README_DEV.md`
- [ ] M7.2 Produce 60–90s demo video + screenshot set (refine M0.6 draft after M2–M4 land)
- [ ] M7.3 X/Twitter outreach tagging `@FreshandFitPod` / `@MyronGainesX`; submission checklist

---

## 5. Blockers & Dependencies

| Task | Blocked by |
| :--- | :--- |
| M2.2, M2.3 (typography code) | M2.1 (audit report) |
| M3.2 (result screen) | M3.1 (proposal) |
| M4.2 (stream viz) | M4.1 (proposal) |
| M5.2 (new filters) | M5.1 (optional-filter semantics), M6 (data for those dimensions) |
| M6.3 (dataset swap) | M6.1 (audit report + approval) |
| M7.2 (final assets) | M2/M3/M4 landed (visual quality) |

---

## 6. Immediate vs Postponed

**Do now (highest podcast impact, low risk):**
- M0.1–M0.5 (discoverability + shortcuts)
- M1 (landing/branding)
- M2.1 (typography audit — no code risk)

**Do next (proposal → approve → build):**
- M2.2–M2.3, M3, M4

**Postpone until core UX is locked:**
- M5 (new filters / engine), M6 (dataset swap), M7 (docs/assets/outreach)

**Explicitly do NOT start with:** adding filters, or replacing datasets.

---

## 7. Working Agreement

- Small, atomic commits — one task per commit, independently committable.
- Stop after **every completed milestone** and request approval before continuing.
- No changes to fonts/datasets without the corresponding written report first.
