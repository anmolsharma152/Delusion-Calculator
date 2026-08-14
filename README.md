# THE DELUSION CALCULATOR

> **"The Numbers Don't Lie."**

The **Delusion Calculator** is a high-performance web application designed to evaluate dating partner expectations against empirical demographic data. Inspired by the *Fresh & Fit After Hours* podcast reality checks, it provides an unfiltered mathematical reality check by cross-referencing user partner preferences with real US government microdata (~100M+ adult population).

Whether you're looking for a partner who is 6'0"+ tall, making $100k+, fit, unmarried, and highly educated, the calculator reveals the exact statistical probability of finding that "dream criteria" match in the real world.

---

## 🎯 Application & Purpose

Many individuals hold dating standards without realizing how overlapping joint probabilities compound. A requirement that sounds modest on its own (e.g. 14% tall, 12% high-earning) drops below **0.4% (1 in 233)** when required simultaneously in one single person.

### 🔮 Sex-Agnostic Core Roadmap
While currently focused on female expectations for male partners (where delusion trends are frequently discussed), the application is architected to become **100% Sex-Agnostic**:
- **Female Standards for Males**: Evaluating hypergamy, height, income brackets, age range, and marital status.
- **Male Standards for Females**: Evaluating age curves, fitness/BMI, relationship history, and realistic Sexual Market Value (SMV) expectations.

---

## 🚀 Planned Feature Roadmap (Next Iterations)

The following four major feature expansions are documented and scheduled for upcoming releases:

### 1. 👶 Children & Prior Marriage Criteria Filters
- **Single Mother & Kids Filter**: Toggle for *"Has Children / Single Mother Exclusion"* vs *"Wants Future Children"* (a core Fresh & Fit podcast debate topic).
- **Prior Marriage Exclusion**: Filter for never-married individuals vs excluding prior marriages and divorces.

### 2. 📺 Enhanced Streamer Mode (OBS Chromakey & Hotkeys)
- **OBS Green Screen Overlay**: Custom chromakey background mode for live content creators streaming on YouTube, Rumble, and Twitch.
- **Soundboard Hotkeys**: Keyboard shortcuts (`Key1` through `Key9`) for Chris & Big Mo soundboard buttons during live broadcasts.

### 3. 📸 HD Image Download & Social Export (PNG/JPEG Export)
- **Direct Canvas Export**: High-resolution PNG/JPEG image generation via `html-to-image` for downloading custom result cards formatted for Instagram Stories, Twitter/X, and TikTok sharing.

### 4. 🤖 AI-Powered Dynamic Podcast Roasts (Gemini API)
- **Context-Aware AI Roasts**: Serverless Next.js API integration with Google Gemini Flash API to generate dynamic, personalized Fresh & Fit podcast roasts tailored to specific user parameter combinations.

---

## 📊 Empirical Government Datasets

All calculations rely on real, official microdata:
- **US Census Bureau ACS (2023)**: Age distributions, age-dependent income brackets, marital status, race/ethnicity, and educational attainment.
- **CDC NHANES (2021–2023)**: Male & female physical height percentiles (Mean = 5'9.1", StdDev = 2.9") and BMI non-obesity rates.

---

## ⚡ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4 + 80s Vaporwave Outrun Aesthetics |
| **Animations** | Framer Motion |
| **Typography** | Bebas Neue, Anton, Inter, JetBrains Mono |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/anmolsharma152/Delusion-Calculator.git
cd "Delusion Calculator"

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐈 Scoring System (Cat Lady Meter)

| Delusion Score | Population Match % | Tier Label | Reality Verdict |
| :---: | :---: | :--- | :--- |
| **0 / 5** | $> 30.0\%$ | **GROUNDED** | Plenty of realistic options in the real world. |
| **1 / 5** | $10.0\% - 30.0\%$ | **REASONABLE** | Selective, but completely achievable. |
| **2 / 5** | $3.0\% - 10.0\%$ | **SELECTIVE** | Above average expectations; high competition. |
| **3 / 5** | $0.5\% - 3.0\%$ | **PICKY** | Unicorn hunter territory. |
| **4 / 5** | $0.05\% - 0.5\%$ | **UNICORN HUNTER** | Statistically rare; high cat lady risk. |
| **5 / 5** | $< 0.05\%$ | **DELUSIONAL** | 1 in 2,000+ rarity. The numbers don't lie! |

---

## 👥 Credits & Acknowledgments

Inspired by the *Fresh & Fit Podcast* crew: Myron Gaines, Walter Weekes (Fresh), Chris the Producer, and Big Mo.

---

## 📜 License

[MIT](LICENSE)
