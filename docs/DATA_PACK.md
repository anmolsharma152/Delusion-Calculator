# DATA PACK 2026.2

> Versioned changelog for the Delusion Calculator's probability distributions.

---

## 2026.2 — Released 2026-08-15

### New Tier-3 filters

| Filter | Source | Release | Key estimate | Last update |
| :--- | :--- | :--- | :--- | :--- |
| **Religion (Jewish / Muslim / Hindu / Buddhist)** | Pew Research Center, Religious Landscape Study | 2023–24 | 1.7% Jewish, 1.2% Muslim, 1.1% Buddhist, 0.9% Hindu (all adults) | 2026-08-15 |
| **Politics (Independent, strict)** | Pew Research Center, political affiliation survey | April 2024 | ~4% of men are strict independents (no party lean) | 2026-08-15 |
| **Non-smoker** | SAMHSA, NSDUH detailed tables | 2023 | Past-month smoking: 10.6% (18–25), ~17–20% (26–49), 9.2% (65+) | 2026-08-15 |
| **Must be straight** | Gallup, LGBTQ+ Identification | 2024 | 6% of men identify as LGBTQ+; ~12% of Gen Z men | 2026-08-15 |

### Notes
- Non-Christian religion shares and strict-independent share are survey-based, small, and treated as flat by age (no reliable male age-gradient exists for groups this small).
- Non-smoker values are the complement of past-month cigarette use, slightly male-adjusted.
- Height slider now snaps to the standard height options (fixes off-option values like 61"/63"/65").
- Prior data pack (2026.1) added ACS 2024 refresh + Tier-2 lifestyle filters.

---

## 2026.1 — Released 2026-08-15

### Core refresh

| Dataset | Source | Release | Sample | Last update |
| :--- | :--- | :--- | :--- | :--- |
| **Age distribution** (male 18+) | US Census Bureau, ACS 1-Year Estimates, table B01001 | 2024 | 130,938,715 males | 2026-08-15 |
| **Race / ethnicity** (male 18+) | US Census Bureau, ACS 1-Year Estimates, tables B01001A–I | 2024 | — | 2026-08-15 |
| **Income by age** | US Census Bureau, ACS 1-Year Estimates | 2024 | — | 2026-08-15 |
| **Marital status by age** | US Census Bureau, ACS 1-Year Estimates | 2024 | — | 2026-08-15 |
| **Education** | US Census Bureau, ACS 1-Year Estimates | 2024 | — | 2026-08-15 |
| **Height / BMI** | CDC NHANES | 2021–2023 | — | 2026-08-15 |

### New Tier-2 filters

| Filter | Source | Release | Key estimate | Last update |
| :--- | :--- | :--- | :--- | :--- |
| **Religion** | Pew Research Center, Religious Landscape Study | 2023–24 | 59% of men Christian | 2026-08-15 |
| **Politics** | Pew Research Center, political affiliation survey | April 2024 | 52% of men Republican/lean | 2026-08-15 |
| **No children** | US Census SIPP (P70-162); NSFG | 2014; 2017–19 | 70% of men 25–29 childless | 2026-08-15 |
| **No illicit drug use** | SAMHSA, NSDUH | 2023 | 24.9% of 12+ used past year | 2026-08-15 |
| **No criminal record** | Brennan Center; SEARCH/BJS | 2018 | ~1 in 3 adults has a record | 2026-08-15 |

### Notes
- All distributions are conditioned on age; filters left at "Any" contribute probability 1.0.
- Race/ethnicity categories are mutually exclusive (White = non-Hispanic).
- Prior data pack (pre-2026.1) referenced ACS 2023 and did not include the Tier-2 filters.
