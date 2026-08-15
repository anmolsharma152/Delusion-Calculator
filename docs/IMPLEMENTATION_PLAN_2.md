DELUSION CALCULATOR – IMPLEMENTATION ROADMAP

Owner: Anmol Sharma
Goal: Convert a fun side project into the calculator Fresh & Fit actually adopts and showcases on stream.

============================================================
PHASE 0 – IMMEDIATE PRIORITIES (TODAY–THIS WEEK)
============================================================

1. Capture media assets

Required screenshots:
- Landing page
- Standard calculator flow
- Stream mode
- Result page
- Soundboard controls
- Keyboard shortcut overlay
- Miami-themed visuals

Required demo video (60–90 seconds):
- Open application
- Select filters
- Use keyboard-only navigation
- Enable stream mode
- Trigger soundboard samples
- Generate result
- Show host mode/full-screen mode

2. Rewrite public-facing README

README.md should target:
- Fresh & Fit hosts
- Podcast viewers
- Twitter/X users
- Casual visitors

Move technical documentation into README_DEV.md.

Public README structure:
- Hero image
- One-sentence pitch
- Live demo
- Features
- Keyboard shortcuts
- Screenshots
- Demo GIF/video
- Data sources
- How it works
- Disclaimer

============================================================
PHASE 1 – BRANDING AND ONBOARDING
============================================================

Keep the existing line:

"Let's Build Your Man"

Recommended positioning:

BUILD-A-MAN CALCULATOR
Powered by Real Census Data

Subheading:
Let's Build Your Man.
Run the numbers. Test your standards. See what's statistically left.

Branding principles:
- Myron = precision, statistics, specificity.
- Fresh = Miami aesthetic, entertainment, humor, presentation.

The product should feel like a crossover between:
- An 80s Miami nightclub
- A podcast control room
- A statistical dashboard

============================================================
PHASE 2 – TYPOGRAPHY OVERHAUL
============================================================

Current typography should be upgraded.

Create a hierarchy:

Tier 1:
- Hero headlines
- Condensed display font

Tier 2:
- Section headings
- Strong podcast aesthetic

Tier 3:
- Body copy
- Highly readable sans-serif

Rules:
- Increase spacing.
- Increase contrast.
- Use fewer font sizes.
- Make stream mode readable from several feet away.

============================================================
PHASE 3 – KEYBOARD SHORTCUT SYSTEM
============================================================

Create a visible shortcut overlay.

Suggested mappings:

Enter = Next stage / calculate
Space = Next guest
S = Stream mode
F = Full-screen mode
T = Theme switch
Tab = Switch sound bank
Q = Alternative sound-bank toggle
M = Sampler menu
1–0 = Trigger sounds

Add:
- '?' key to open shortcuts
- Keyboard help button
- First-run onboarding tooltip

============================================================
PHASE 4 – FILTER REDESIGN
============================================================

Core principle:
Every filter must be optional.

Unselected filter = Ignore.

Never force users to answer every question.

Priority filters:

Tier 1 (required):
- Age
- Height
- Income
- Education
- Race
- Marital status

Tier 2 (high value):
- BMI/body composition
- Religion
- Political alignment
- Criminal record
- Past-year drug use
- Children

Tier 3 (future):
- Sexual orientation
- Region/state
- Veteran status
- Employment status

Avoid adding novelty filters.

============================================================
PHASE 5 – ENGINE AND STATISTICS
============================================================

Current model:
AND-based filtering.

Pool reduction:
A × B × C × D ...

This is multiplicative filtering.

Important warning:
Do not blindly multiply independent probabilities.

Many variables are correlated:
- Education and income
- Age and marital status
- Religion and politics
- BMI and health

Tasks:
- Audit every probability multiplier.
- Document every assumption.
- Create a methodology page.
- Show users which filters reduced the pool the most.

============================================================
PHASE 6 – DATA PACK 2026.1 AUDIT
============================================================

Verify every dataset:
- ACS
- NHANES
- CPS
- Pew
- Gallup
- SAMHSA

Add visible versioning:
DATA PACK 2026.1

Create a changelog documenting:
- Source
- Release date
- Sample size
- Last update

============================================================
PHASE 7 – STREAM MODE 2.0
============================================================

The screenshots from the calculators used on Fresh & Fit reveal several patterns:

1. Big filters.
2. High information density.
3. Large action buttons.
4. Persistent result panel.
5. Podcast-first design.

Add:
- Castle meter
- Filter impact visualization
- Remaining pool visualization
- Largest shrinking factor
- 1-in-X rarity meter

============================================================
PHASE 8 – OUTREACH
============================================================

Instagram:
- Already completed.

Twitter/X:
Create:
- Demo clip
- Screenshots
- Thread explaining methodology

Tag:
- @FreshandFitPod
- @MyronGainesX

Alternative outreach:
- YouTube comment
- Community post
- Discord (if available)

============================================================
SUCCESS CRITERIA
============================================================

Minimum viable success:
- Fresh & Fit sees the project.

Stretch goal:
- Calculator used during a live show.

Ultimate goal:
- Official adoption.
