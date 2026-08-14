# Data Strategy & Mathematical Methodology

> **Project: The Delusion Calculator**

---

## 1. Data Sources Overview

| Dataset | Provider | Cycle | Data Extracted |
| :--- | :--- | :--- | :--- |
| **ACS 1-Year Estimates** | US Census Bureau | 2023 | Income distributions by age, marital status by age, race, education, age population shares. |
| **NHANES** | CDC | 2021–2023 | Measured height percentiles ($\mu = 69.1\text{ in}$, $\sigma = 2.9\text{ in}$), adult male obesity (BMI $\geq 30$). |
| **Current Population Survey** | BLS | 2023 | Male labor force participation and wage cross-tabulations. |

---

## 2. Mathematical Methodology

### Age-Conditional Joint Probability Formula

$$\boxed{P(\text{Match}) = P(\text{Age}) \times P(\text{Race}) \times P(\text{Height} \geq H) \times P(\text{Not Obese} \mid \text{Age}) \times P(\text{Income} \geq I \mid \text{Age}) \times P(\text{Single} \mid \text{Age}) \times P(\text{Edu} \geq E)}$$

### Continuous Height Modeling (Normal CDF)

Adult male height follows a continuous normal distribution:

$$P(\text{Height} \geq H) = 1 - \Phi\left(\frac{H - 69.1}{2.9}\right) = \frac{1}{2}\left[1 - \text{erf}\left(\frac{H - 69.1}{2.9\sqrt{2}}\right)\right]$$

### Empirical Income Interpolation by Age Group

Income thresholds are interpolated linearly between empirical bracket bounds derived from the US Census ACS tables:

$$P(\text{Income} \geq I) = \sum_{a \in \text{AgeRanges}} w_a \cdot \text{Interpolate}(I, \text{IncomeBrackets}_a)$$

where $w_a$ is the proportion of the adult male population represented by age bracket $a$.

---

## 3. Cat Lady Meter Scoring System (0–5 Scale)

| Score | Match Percentage | Tier | Label | Catchphrase |
| :---: | :--- | :--- | :--- | :--- |
| **0** | $> 30.0\%$ | `GROUNDED` | "She's Grounded" | *"Not bad. Any last thoughts?"* |
| **1** | $10.0\% - 30.0\%$ | `REASONABLE` | "Reasonable" | *"Alright, there's hope."* |
| **2** | $3.0\% - 10.0\%$ | `SELECTIVE` | "Getting Picky" | *"What do you bring to the table?"* |
| **3** | $0.5\% - 3.0\%$ | `PICKY` | "Needle in a Haystack" | *"Make it make sense!"* |
| **4** | $0.05\% - 0.5\%$ | `UNICORN_HUNTER` | "Unicorn Hunter" | *"Be serious!"* |
| **5** | $< 0.05\%$ | `DELUSIONAL` | "Future Cat Lady 🐱" | *"BE SERIOUS! This man doesn't exist!"* |
