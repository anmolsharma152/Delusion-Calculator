# Data Strategy & Methodology

The Delusion Calculator relies on real-world statistics to calculate the probability of a user finding their "ideal" partner in the United States. 

## Data Sources

| Source | Data Provided | Reliability |
| :--- | :--- | :--- |
| US Census ACS (2023) | Age, Income by Age, Marital Status by Age, Race, Education | High (Gold Standard) |
| CDC NHANES (2021-2023) | Height distribution, Obesity rates by age/gender | High (Clinical measurements) |
| BLS | High-end income brackets | Medium (Supplement to Census) |

## Age-Conditional Probabilities

A naive approach multiplies independent probabilities (P(Height) * P(Income)). However, income, marital status, and obesity are highly correlated with **Age**. 

Our methodology uses **Age as the base index**.
P(Match) = P(Age Range) * P(Height) * P(Income | Age) * P(Not Married | Age) * P(Not Obese | Age) * P(Race)

## Mathematical Methodology

- **Height**: Normally distributed. We use a Normal Cumulative Distribution Function (CDF) with Mean = 5'9" (69 inches) and StdDev = 2.9 inches for US Men.
- **Income**: Empirical data grouped into brackets. We interpolate between brackets to get a precise percentile.
- **Independence Assumption**: For simplicity, we assume Height and Income are independent variables, though minor correlations exist in reality.

## Phase 1 vs Phase 2 Data Approach

- **Phase 1**: Static JSON files compiled manually from Census/CDC reports. Fast, 0-latency.
- **Phase 2**: Automated scraping/API integration to pull the latest ACS 1-year estimates annually.

## Key Statistics (US Men)

### Height Distribution (Mean: 5'9", SD: 2.9")
- ≥ 6'0": ~14.5%
- ≥ 6'2": ~3.9%
- ≥ 6'4": ~0.8%

### Income (Example: Ages 25-34)
- ≥ $50k: ~45%
- ≥ $100k: ~12%
- ≥ $200k: ~1.5%

### Marital Status (Ages 25-34)
- Unmarried (Single, Divorced): ~65%

### Obesity Rates (CDC BMI > 30)
- Men 20-39: ~40%
- Men 40-59: ~46%

## Known Limitations and Assumptions

1. **Self-reporting bias**: Income is often self-reported in Census data.
2. **Missing Intersections**: The tool does not account for the intersectionality of every trait (e.g., the specific obesity rate of 6'4" Asian men making $200k). It relies on macro age-adjusted probabilities.
3. **Location agnostic**: Data is national US average. Miami averages differ vastly from Boise, Idaho.

## Data Update Schedule

- **Census ACS**: Updated annually in September.
- **NHANES**: Updated bi-annually.
- Data files in `/src/data/` should be reviewed every January.
