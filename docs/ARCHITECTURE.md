# System Architecture & Technical Specifications

> **Project: The Delusion Calculator**

---

## 1. Architectural Overview

The application is built on **Next.js 15 (App Router)** with **TypeScript (Strict Mode)** and **Tailwind CSS v4**. It uses a **Unified Single-Shell Architecture** to handle both standard web visitors and live OBS broadcast overlays without state fragmentation or page reloads.

```mermaid
graph TD
    subgraph "Unified App Shell (src/app/page.tsx)"
        State["Shared Global State<br/>• viewState: WELCOME | INPUT | RESULTS<br/>• criteria & activeCriteria<br/>• isStreamMode: true | false<br/>• bgMode: VAPORWAVE | OBSIDIAN<br/>• activeBank: 1 | 2<br/>• isVaultOpen: boolean<br/>• playingSound: object | null"]
        
        Header["Unified Top Header (src/components/Header.tsx)<br/>• Standard Mode: Sticky & Visible<br/>• Stream Mode: Auto-Hides on Proximity<br/>• Controls: Sound Vault, Bank 1/2, Theme, Stream Mode, Fullscreen"]
        
        Stage["Active View Stage (AnimatePresence)<br/>• WELCOME: WelcomeStage.tsx<br/>• INPUT: CriteriaForm.tsx (3x2 Grid)<br/>• RESULTS: ResultsPanel.tsx (Full Verdict)"]
        
        VaultModal["Sound Vault Modal (src/components/SoundVaultModal.tsx)<br/>• 45+ Categorized Soundbites with Search<br/>• Active Bank 1 & Bank 2 Presets"]
        
        AudioHUD["Floating Audio Toast<br/>• Non-intrusive sound playing feedback"]
    end

    State --> Header
    State --> Stage
    State --> VaultModal
    State --> AudioHUD
```

---

## 2. Core State Management & Navigation Flow

1. **Single Source of Truth**:
   - `viewState`: Switches between `'WELCOME'`, `'INPUT'`, and `'RESULTS'`.
   - `isStreamMode`: Boolean state toggled by `[Space]` or Header button. Because state lives in the parent shell, toggling Stream Mode does not discard active form inputs or calculation results.
   - `criteria`: Current form values.
   - `activeCriteria`: Committed form values passed to `useCalculator` upon clicking *Calculate* or pressing `[Enter]`.

2. **Unified Navigation Matrix**:
   - `[Space]`: In-place Stream Mode toggle.
   - `[Enter]`: Advances `WELCOME` $\rightarrow$ `INPUT` $\rightarrow$ `RESULTS` $\rightarrow$ `INPUT`.
   - `[Tab]` / `[` `]`: Swaps Sampler Bank 1 and Bank 2.
   - `[1]` to `[0]`: Triggers audio drops corresponding to active bank presets.

---

## 3. Calculation Engine Flow

```mermaid
sequenceDiagram
    participant User as 👤 User / Host
    participant UI as 🎛️ CriteriaForm (3x2 Grid)
    participant Hook as 🔄 useCalculator Hook
    participant Engine as 🧮 Probability Engine
    participant Data as 📊 Census/CDC Datasets

    User->>UI: Adjusts Age, Height, Income, Race, Education, Fitness
    User->>UI: Presses [Enter] or clicks Calculate
    UI->>Hook: Passes activeCriteria
    Hook->>Engine: calcCombinedProbability(criteria)
    Engine->>Data: Age-conditional lookups (ACS 2023 / NHANES)
    Engine-->>Hook: { matchPercentage, breakdown }
    Hook->>Hook: getDelusionScore(matchPercentage)
    Hook-->>UI: { result, breakdown, comment }
    UI->>User: Displays ResultsPanel (Gauge, %, Ratio, Roasts)
```

---

## 4. Performance Benchmarks

* **Calculation Latency**: $< 1.0\text{ ms}$ (pure client-side synchronous arithmetic).
* **Frame Rate**: $60\text{ FPS}$ smooth rendering on HTML5 canvas particle repulsion.
* **First Contentful Paint (FCP)**: $< 1.2\text{ s}$.
* **Zero Runtime Server Costs**: 100% static prerendered client-side application.
