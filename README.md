# 🧮 THE DELUSION CALCULATOR
### *"The Numbers Don't Lie."* — Powered by Fresh & Fit Reality Checks

[![Next.js 16](https://img.shields.io/badge/Next.js-16_(App_Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0_(Strict)-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-crimson?style=for-the-badge)](LICENSE)

A stream-ready, high-accuracy statistical calculator web application inspired by the **Fresh & Fit Podcast (Miami After Hours)**. It computes the exact percentage of adult US men matching a user's partner criteria using official **US Census Bureau ACS (2023)** and **CDC NHANES (2021–2023)** demographic datasets.

---

## 🌟 Key Features

* **3 × 2 Spacious Calculator Grid**: Six clean, high-contrast, easily scannable cards (*Age Range*, *Minimum Height*, *Race / Ethnicity*, *Minimum Education*, *Minimum Income*, and *Status & Fitness*).
* **Unified Single-Shell Stream Mode**: Press `[Space]` anywhere to toggle OBS broadcast mode without resetting your criteria or calculated results.
* **Peek Header in Stream Mode**: The top header hides for a clean broadcast view and peeks back only when the cursor reaches the top edge of the screen.
* **45+ Soundboard Vault (Chris & Big Mo)**:
  * **Bank 1 (Main Stage Hits)**: Hotkeys `[1]` to `[0]` (*Don Demarco*, *For The Streets*, *Stop The Cap*, *Top G Theme*, *Emotional Damage*, *Airhorn Blast*, *Falcon Punch*, *Spongebob Fail*, *FAHHH*, *Undertaker Bell*).
  * **Bank 2 (Meme & Roast FX)**: Hotkeys `[1]` to `[0]` (*You're Broke*, *Button It*, *Breathe Air*, *Rizz Effect*, *Losing Horn*, *Stoopid*, *Bruh*, *Tuco Get Out*, *Rewind*, *Over 9000*).
  * **Instant Bank Switch**: Press `[Tab]` to swap active banks on the fly.
  * **Sound Vault Modal**: Search and trigger across 45+ categorized soundbites.
  * **Floating Audio HUD**: Non-intrusive bottom-right status badge during playback.
* **Dual Theme Engine**: Instant switching between **`80s Vaporwave`** (floating particles + drifting cat bags) and **`Obsidian Dark`** (`#080808` pitch-black studio mode).
* **Cat Lady Meter (0–5 Scale)**: Animated gauge and cat litter bag risk meter reflecting realistic dating market probabilities.
* **Universal Hotkey Matrix**:
  * `[Space]`: Toggle Stream Mode in place.
  * `[Enter]`: Progress forward (`WELCOME` $\rightarrow$ `INPUT` $\rightarrow$ `RESULTS` $\rightarrow$ `INPUT`).
  * `[Tab]`: Toggle Soundboard Banks.
  * `[1]`–`[0]`: Trigger Sampler Drops.

---

## 📊 Demographic Methodology

The calculation engine uses **age-conditional joint probabilities** to account for demographic correlations (e.g. income and marital status heavily correlate with age):

$$P(\text{Match}) = P(\text{Age}) \times P(\text{Race}) \times P(\text{Height} \geq H) \times P(\text{Not Obese} \mid \text{Age}) \times P(\text{Income} \geq I \mid \text{Age}) \times P(\text{Single} \mid \text{Age}) \times P(\text{Edu} \geq E)$$

* **Height**: Continuous Normal CDF with CDC NHANES parameters ($\mu = 69.1\text{ in}$, $\sigma = 2.9\text{ in}$).
* **Income**: Age-bracket empirical distributions from US Census ACS 2023 1-year estimates.
* **Marital Status**: Never-married percentages conditioned on selected age brackets.
* **Obesity**: CDC NHANES BMI $< 30$ proportions conditioned on age.
* **Education & Race**: US Census ACS empirical distributions.

---

## 🚀 Quick Start

### Prerequisites
* **Node.js**: v18.18+ or v20+
* **npm**: v9+

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/anmolsharma152/Delusion-Calculator.git
cd Delusion-Calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001`) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
Delusion Calculator/
├── public/
│   ├── Assets/                 # Official banner, cover art, cat litter bag
│   ├── Soundbites/             # 45+ Fresh & Fit stream sound effects
│   ├── favicon.ico
│   └── icon.png
├── src/
│   ├── app/
│   │   ├── globals.css         # Outrun neon glows & solid surface tokens
│   │   ├── layout.tsx          # Root layout with metadata & fonts
│   │   ├── page.tsx            # Unified Application Core & State Shell
│   │   ├── robots.ts           # Search engine crawler configuration
│   │   └── sitemap.ts          # SEO sitemap generator
│   ├── components/
│   │   ├── CriteriaForm.tsx    # 3x2 spacious input grid & banner header
│   │   ├── Header.tsx          # Top header with stream-mode peek
│   │   ├── SoundVaultModal.tsx # Full 45+ stream sound deck modal
│   │   ├── ResultsPanel.tsx    # Gauge meter, %, ratio, breakdown & roast
│   │   ├── WelcomeStage.tsx    # Hero intro landing screen
│   │   ├── GaugeMeter.tsx      # Animated SVG semi-circular gauge
│   │   ├── CatBagMeter.tsx     # 0-5 Cat litter bag risk visual
│   │   ├── BreakdownChart.tsx  # Demographic filter horizontal bars
│   │   ├── CommentBox.tsx      # Fresh & Fit podcast reality roast terminal
│   │   ├── ShareCard.tsx       # Social export PNG card generator
│   │   ├── AnticipationOverlay.tsx # Tension countdown with audio
│   │   └── InteractiveBackground.tsx # Canvas particles & cat bag repulsion
│   ├── data/
│   │   └── distributions.ts    # US Census ACS 2023 & CDC NHANES datasets
│   ├── engine/
│   │   ├── probability.ts      # Joint probability math engine
│   │   ├── scoring.ts          # 0-5 score & tier definitions
│   │   └── commentPool.ts      # 150+ Fresh & Fit dark comedy roasts
│   ├── hooks/
│   │   └── useCalculator.ts    # Reactive calculation hook
│   ├── types.ts                # TypeScript interfaces & enums
│   └── utils/
│       ├── math.ts             # Normal CDF & linear interpolation
│       └── format.ts           # Number, height & percentage formatters
├── docs/                       # Technical & Architectural Documentation
│   ├── ARCHITECTURE.md
│   ├── FRONTEND_DESIGN.md
│   ├── DATA_STRATEGY.md
│   └── DEPLOYMENT.md
├── AGENTS.md                   # AI Assistant coding conventions
└── README.md
```

---

## 👑 Credits & Team

* **Podcast Inspiration**: Fresh & Fit Podcast (Miami After Hours)
* **Co-Hosts**: Myron Gaines & Walter Weekes (Fresh)
* **Soundboard & Audio**: Chris the Producer & Big Mo
* **Data Sources**: US Census Bureau (ACS 2023), CDC NHANES (2021–2023), BLS

---

## 📄 License

MIT License. Open source for educational and streaming utility purposes.
