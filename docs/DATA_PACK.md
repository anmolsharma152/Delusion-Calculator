# DATA PACK 2026.1

> Versioned changelog for the Delusion Calculator's probability distributions.

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
