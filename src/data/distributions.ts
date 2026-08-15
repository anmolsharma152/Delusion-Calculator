import { AgeRange, Race, EducationLevel, IncomeBracket, ReligionPreference } from '../types';

/**
 * DATA PACK 2026.2 — Tier-3 filter expansion.
 * Adds non-Christian religions, Independent politics, non-smoker, and straight-orientation filters.
 */
export const DATA_PACK = {
  version: '2026.2',
  released: '2026-08-15',
};

/**
 * Height parameters for adult males in the US (in inches).
 * Source: CDC NHANES 2021-2023 (most recent released cycle)
 */
export const HEIGHT_PARAMS = {
  mean: 69.1,
  stdDev: 2.9
};

/**
 * Pre-computed height percentiles (cumulative percentage below the specified height).
 */
export const HEIGHT_PERCENTILES: Record<number, number> = {
  66: 0.38,
  68: 0.645,
  70: 0.79,
  72: 0.855,
  74: 0.961,
  76: 0.994
};

/**
 * Male income distribution by age range (US Census Bureau ACS 2024).
 * Each bracket: { min, max, percentage (in this bracket), cumulative (at or below max) }
 * Values reflect real age-income correlation: young men earn less, peak 35-54, decline 55+.
 */
export const INCOME_BY_AGE: Record<AgeRange, IncomeBracket[]> = {
  // 18-24: Mostly entry-level, students, part-time. ~5% earn $100k+
  '18-24': [
    { min: 0, max: 15000, percentage: 0.30, cumulative: 0.30 },
    { min: 15000, max: 25000, percentage: 0.18, cumulative: 0.48 },
    { min: 25000, max: 35000, percentage: 0.14, cumulative: 0.62 },
    { min: 35000, max: 50000, percentage: 0.15, cumulative: 0.77 },
    { min: 50000, max: 75000, percentage: 0.12, cumulative: 0.89 },
    { min: 75000, max: 100000, percentage: 0.06, cumulative: 0.95 },
    { min: 100000, max: 150000, percentage: 0.03, cumulative: 0.98 },
    { min: 150000, max: 250000, percentage: 0.015, cumulative: 0.995 },
    { min: 250000, max: 500000, percentage: 0.004, cumulative: 0.999 },
    { min: 500000, max: null, percentage: 0.001, cumulative: 1.000 },
  ],
  // 25-29: Early career. ~12% earn $100k+
  '25-29': [
    { min: 0, max: 15000, percentage: 0.12, cumulative: 0.12 },
    { min: 15000, max: 25000, percentage: 0.10, cumulative: 0.22 },
    { min: 25000, max: 35000, percentage: 0.12, cumulative: 0.34 },
    { min: 35000, max: 50000, percentage: 0.18, cumulative: 0.52 },
    { min: 50000, max: 75000, percentage: 0.22, cumulative: 0.74 },
    { min: 75000, max: 100000, percentage: 0.14, cumulative: 0.88 },
    { min: 100000, max: 150000, percentage: 0.07, cumulative: 0.95 },
    { min: 150000, max: 250000, percentage: 0.03, cumulative: 0.98 },
    { min: 250000, max: 500000, percentage: 0.015, cumulative: 0.995 },
    { min: 500000, max: null, percentage: 0.005, cumulative: 1.000 },
  ],
  // 30-34: Mid-career growth. ~22% earn $100k+
  '30-34': [
    { min: 0, max: 15000, percentage: 0.08, cumulative: 0.08 },
    { min: 15000, max: 25000, percentage: 0.07, cumulative: 0.15 },
    { min: 25000, max: 35000, percentage: 0.09, cumulative: 0.24 },
    { min: 35000, max: 50000, percentage: 0.15, cumulative: 0.39 },
    { min: 50000, max: 75000, percentage: 0.22, cumulative: 0.61 },
    { min: 75000, max: 100000, percentage: 0.17, cumulative: 0.78 },
    { min: 100000, max: 150000, percentage: 0.12, cumulative: 0.90 },
    { min: 150000, max: 250000, percentage: 0.06, cumulative: 0.96 },
    { min: 250000, max: 500000, percentage: 0.03, cumulative: 0.99 },
    { min: 500000, max: null, percentage: 0.01, cumulative: 1.000 },
  ],
  // 35-39: Approaching peak. ~30% earn $100k+
  '35-39': [
    { min: 0, max: 15000, percentage: 0.06, cumulative: 0.06 },
    { min: 15000, max: 25000, percentage: 0.06, cumulative: 0.12 },
    { min: 25000, max: 35000, percentage: 0.07, cumulative: 0.19 },
    { min: 35000, max: 50000, percentage: 0.13, cumulative: 0.32 },
    { min: 50000, max: 75000, percentage: 0.20, cumulative: 0.52 },
    { min: 75000, max: 100000, percentage: 0.18, cumulative: 0.70 },
    { min: 100000, max: 150000, percentage: 0.15, cumulative: 0.85 },
    { min: 150000, max: 250000, percentage: 0.09, cumulative: 0.94 },
    { min: 250000, max: 500000, percentage: 0.04, cumulative: 0.98 },
    { min: 500000, max: null, percentage: 0.02, cumulative: 1.000 },
  ],
  // 40-44: Peak earnings. ~33% earn $100k+
  '40-44': [
    { min: 0, max: 15000, percentage: 0.06, cumulative: 0.06 },
    { min: 15000, max: 25000, percentage: 0.05, cumulative: 0.11 },
    { min: 25000, max: 35000, percentage: 0.06, cumulative: 0.17 },
    { min: 35000, max: 50000, percentage: 0.12, cumulative: 0.29 },
    { min: 50000, max: 75000, percentage: 0.19, cumulative: 0.48 },
    { min: 75000, max: 100000, percentage: 0.19, cumulative: 0.67 },
    { min: 100000, max: 150000, percentage: 0.16, cumulative: 0.83 },
    { min: 150000, max: 250000, percentage: 0.10, cumulative: 0.93 },
    { min: 250000, max: 500000, percentage: 0.045, cumulative: 0.975 },
    { min: 500000, max: null, percentage: 0.025, cumulative: 1.000 },
  ],
  // 45-49: Peak earnings. ~33% earn $100k+
  '45-49': [
    { min: 0, max: 15000, percentage: 0.06, cumulative: 0.06 },
    { min: 15000, max: 25000, percentage: 0.05, cumulative: 0.11 },
    { min: 25000, max: 35000, percentage: 0.06, cumulative: 0.17 },
    { min: 35000, max: 50000, percentage: 0.12, cumulative: 0.29 },
    { min: 50000, max: 75000, percentage: 0.19, cumulative: 0.48 },
    { min: 75000, max: 100000, percentage: 0.19, cumulative: 0.67 },
    { min: 100000, max: 150000, percentage: 0.16, cumulative: 0.83 },
    { min: 150000, max: 250000, percentage: 0.10, cumulative: 0.93 },
    { min: 250000, max: 500000, percentage: 0.045, cumulative: 0.975 },
    { min: 500000, max: null, percentage: 0.025, cumulative: 1.000 },
  ],
  // 50-54: Still strong. ~30% earn $100k+
  '50-54': [
    { min: 0, max: 15000, percentage: 0.07, cumulative: 0.07 },
    { min: 15000, max: 25000, percentage: 0.06, cumulative: 0.13 },
    { min: 25000, max: 35000, percentage: 0.07, cumulative: 0.20 },
    { min: 35000, max: 50000, percentage: 0.13, cumulative: 0.33 },
    { min: 50000, max: 75000, percentage: 0.19, cumulative: 0.52 },
    { min: 75000, max: 100000, percentage: 0.18, cumulative: 0.70 },
    { min: 100000, max: 150000, percentage: 0.15, cumulative: 0.85 },
    { min: 150000, max: 250000, percentage: 0.09, cumulative: 0.94 },
    { min: 250000, max: 500000, percentage: 0.04, cumulative: 0.98 },
    { min: 500000, max: null, percentage: 0.02, cumulative: 1.000 },
  ],
  // 55-59: Slight decline. ~26% earn $100k+
  '55-59': [
    { min: 0, max: 15000, percentage: 0.08, cumulative: 0.08 },
    { min: 15000, max: 25000, percentage: 0.07, cumulative: 0.15 },
    { min: 25000, max: 35000, percentage: 0.08, cumulative: 0.23 },
    { min: 35000, max: 50000, percentage: 0.14, cumulative: 0.37 },
    { min: 50000, max: 75000, percentage: 0.19, cumulative: 0.56 },
    { min: 75000, max: 100000, percentage: 0.18, cumulative: 0.74 },
    { min: 100000, max: 150000, percentage: 0.13, cumulative: 0.87 },
    { min: 150000, max: 250000, percentage: 0.08, cumulative: 0.95 },
    { min: 250000, max: 500000, percentage: 0.035, cumulative: 0.985 },
    { min: 500000, max: null, percentage: 0.015, cumulative: 1.000 },
  ],
  // 60-64: Pre-retirement decline. ~22% earn $100k+
  '60-64': [
    { min: 0, max: 15000, percentage: 0.12, cumulative: 0.12 },
    { min: 15000, max: 25000, percentage: 0.09, cumulative: 0.21 },
    { min: 25000, max: 35000, percentage: 0.09, cumulative: 0.30 },
    { min: 35000, max: 50000, percentage: 0.14, cumulative: 0.44 },
    { min: 50000, max: 75000, percentage: 0.18, cumulative: 0.62 },
    { min: 75000, max: 100000, percentage: 0.16, cumulative: 0.78 },
    { min: 100000, max: 150000, percentage: 0.11, cumulative: 0.89 },
    { min: 150000, max: 250000, percentage: 0.07, cumulative: 0.96 },
    { min: 250000, max: 500000, percentage: 0.03, cumulative: 0.99 },
    { min: 500000, max: null, percentage: 0.01, cumulative: 1.000 },
  ],
  // 65+: Retirement, social security, pensions. ~15% earn $100k+
  '65+': [
    { min: 0, max: 15000, percentage: 0.22, cumulative: 0.22 },
    { min: 15000, max: 25000, percentage: 0.14, cumulative: 0.36 },
    { min: 25000, max: 35000, percentage: 0.11, cumulative: 0.47 },
    { min: 35000, max: 50000, percentage: 0.13, cumulative: 0.60 },
    { min: 50000, max: 75000, percentage: 0.14, cumulative: 0.74 },
    { min: 75000, max: 100000, percentage: 0.11, cumulative: 0.85 },
    { min: 100000, max: 150000, percentage: 0.08, cumulative: 0.93 },
    { min: 150000, max: 250000, percentage: 0.04, cumulative: 0.97 },
    { min: 250000, max: 500000, percentage: 0.02, cumulative: 0.99 },
    { min: 500000, max: null, percentage: 0.01, cumulative: 1.000 },
  ],
};

/**
 * Marital status distribution by age.
 * Source: US Census Bureau, ACS 2024.
 */
export const MARITAL_BY_AGE: Record<AgeRange, { neverMarried: number, married: number, divorced: number, widowed: number }> = {
  '18-24': { neverMarried: 0.90, married: 0.08, divorced: 0.02, widowed: 0.00 },
  '25-29': { neverMarried: 0.70, married: 0.25, divorced: 0.05, widowed: 0.00 },
  '30-34': { neverMarried: 0.45, married: 0.45, divorced: 0.10, widowed: 0.00 },
  '35-39': { neverMarried: 0.25, married: 0.60, divorced: 0.14, widowed: 0.01 },
  '40-44': { neverMarried: 0.18, married: 0.65, divorced: 0.16, widowed: 0.01 },
  '45-49': { neverMarried: 0.15, married: 0.65, divorced: 0.18, widowed: 0.02 },
  '50-54': { neverMarried: 0.12, married: 0.65, divorced: 0.20, widowed: 0.03 },
  '55-59': { neverMarried: 0.10, married: 0.65, divorced: 0.21, widowed: 0.04 },
  '60-64': { neverMarried: 0.08, married: 0.65, divorced: 0.22, widowed: 0.05 },
  '65+':   { neverMarried: 0.05, married: 0.60, divorced: 0.20, widowed: 0.15 },
};

/**
 * Obesity rates (BMI >= 30) for males by age.
 * Source: CDC NHANES 2021-2023.
 */
export const OBESITY_BY_AGE: Record<AgeRange, { notObese: number }> = {
  '18-24': { notObese: 0.70 },
  '25-29': { notObese: 0.65 },
  '30-34': { notObese: 0.60 },
  '35-39': { notObese: 0.55 },
  '40-44': { notObese: 0.50 },
  '45-49': { notObese: 0.50 },
  '50-54': { notObese: 0.50 },
  '55-59': { notObese: 0.50 },
  '60-64': { notObese: 0.55 },
  '65+':   { notObese: 0.60 },
};

/**
 * US Adult Male Race Distribution.
 * Source: US Census Bureau, ACS 2024 1-Year Estimates (B01001 race tables, male 18+).
 * Mutually exclusive categories computed from B01001H (White alone, non-Hispanic),
 * B01001B (Black), B01001I (Hispanic/Latino), B01001D (Asian), and combined
 * B01001E (NHPI), B01001C (Am Indian), B01001F (Some Other), B01001G (Two+) -> OTHER.
 */
export const RACE_DISTRIBUTION: Record<Race, number> = {
  [Race.ANY]: 1.0,
  [Race.WHITE]: 0.513,
  [Race.BLACK]: 0.098,
  [Race.HISPANIC]: 0.161,
  [Race.ASIAN]: 0.054,
  [Race.OTHER]: 0.175
};

/**
 * Educational attainment for US adult males.
 * Source: US Census Bureau, ACS 2024 1-Year Estimates.
 */
export const EDUCATION_LEVELS = [
  { level: EducationLevel.ANY, percentage: 1.0, cumulativeAtOrAbove: 1.0 },
  { level: EducationLevel.HIGH_SCHOOL, percentage: 0.26, cumulativeAtOrAbove: 0.88 },
  { level: EducationLevel.SOME_COLLEGE, percentage: 0.27, cumulativeAtOrAbove: 0.62 },
  { level: EducationLevel.BACHELORS, percentage: 0.22, cumulativeAtOrAbove: 0.35 },
  { level: EducationLevel.MASTERS, percentage: 0.09, cumulativeAtOrAbove: 0.13 },
  { level: EducationLevel.DOCTORATE, percentage: 0.04, cumulativeAtOrAbove: 0.04 },
];

/**
 * Population distribution across age ranges for adult males.
 * Source: US Census Bureau, ACS 2024 1-Year Estimates (B01001, male 18+, N = 130,938,715).
 */
export const AGE_DISTRIBUTION: Record<AgeRange, number> = {
  '18-24': 0.122,
  '25-29': 0.086,
  '30-34': 0.092,
  '35-39': 0.090,
  '40-44': 0.087,
  '45-49': 0.077,
  '50-54': 0.078,
  '55-59': 0.075,
  '60-64': 0.081,
  '65+':   0.211,
};

/**
 * Share of adult men identifying as Christian, by age.
 * Source: Pew Research Center, Religious Landscape Study 2023-24.
 * National average for men: 59% Christian (women: 66%; all adults: 62%).
 * Age gradient interpolated from RLS cohort data (younger cohorts less religious).
 */
export const RELIGION_CHRISTIAN_BY_AGE: Record<AgeRange, number> = {
  '18-24': 0.46,
  '25-29': 0.48,
  '30-34': 0.51,
  '35-39': 0.54,
  '40-44': 0.57,
  '45-49': 0.60,
  '50-54': 0.63,
  '55-59': 0.66,
  '60-64': 0.68,
  '65+':   0.72,
};

/**
 * Share of adult men identifying as Republican / lean Republican, by age.
 * Source: Pew Research Center, 2024 Political Affiliation Survey (April 2024).
 * National average for men: 52% Republican/lean, 46% Democratic/lean.
 * Age gradient interpolated from Pew cohort tables (younger adults lean Democratic).
 */
export const POLITICS_REPUBLICAN_BY_AGE: Record<AgeRange, number> = {
  '18-24': 0.34,
  '25-29': 0.36,
  '30-34': 0.42,
  '35-39': 0.47,
  '40-44': 0.50,
  '45-49': 0.53,
  '50-54': 0.55,
  '55-59': 0.56,
  '60-64': 0.56,
  '65+':   0.53,
};

/**
 * Share of adult men identifying as a strict Independent (no party lean), by age.
 * Source: Pew Research Center, 2024 Political Affiliation Survey (April 2024).
 * ~7% of adults say "no lean / refused" to both party-lean follow-ups; strict pure
 * independents (excludes leaners) are roughly 4% of men. Values are flat by age
 * because Pew does not publish a reliable male age-gradient for this small group.
 */
export const POLITICS_INDEPENDENT_BY_AGE: Record<AgeRange, number> = {
  '18-24': 0.04,
  '25-29': 0.04,
  '30-34': 0.04,
  '35-39': 0.04,
  '40-44': 0.04,
  '45-49': 0.04,
  '50-54': 0.04,
  '55-59': 0.04,
  '60-64': 0.04,
  '65+':   0.04,
};

/**
 * Share of US adult men who identify as a non-Christian religion.
 * Source: Pew Research Center, Religious Landscape Study 2023-24.
 * National figures (all adults): 1.7% Jewish, 1.2% Muslim, 1.1% Buddhist, 0.9% Hindu.
 * Male shares are ~flat by age (Pew publishes no reliable male age-gradient for
 * groups this small), so values are treated as age-invariant.
 */
export const RELIGION_NON_CHRISTIAN_SHARE: Partial<Record<ReligionPreference, number>> = {
  [ReligionPreference.JEWISH]: 0.017,
  [ReligionPreference.MUSLIM]: 0.012,
  [ReligionPreference.HINDU]: 0.009,
  [ReligionPreference.BUDDHIST]: 0.011,
};

/**
 * Share of adult men who did NOT smoke cigarettes in the past month, by age.
 * Source: SAMHSA, NSDUH 2023 (detailed table 2.4B, past-month cigarette use).
 * Past-month smoking (all adults): 18-25 = 10.6%, 30-34 = 17.0%, 35-39 = 19.8%,
 * 40-44 = 19.4%, 45-49 = 19.9%, 50-54 = 18.5%, 55-59 = 16.3%, 60-64 = 16.9%,
 * 65+ = 9.2%. Values here are the complement (non-smoker), slightly male-adjusted.
 */
export const NONSMOKER_BY_AGE: Record<AgeRange, number> = {
  '18-24': 0.89,
  '25-29': 0.86,
  '30-34': 0.83,
  '35-39': 0.80,
  '40-44': 0.81,
  '45-49': 0.80,
  '50-54': 0.82,
  '55-59': 0.84,
  '60-64': 0.83,
  '65+':   0.91,
};

/**
 * Share of adult men identifying as heterosexual / straight, by age.
 * Source: Gallup, 2024 LGBTQ+ Identification (men; 6% of men identify LGBTQ+ overall).
 * Age gradient: Gen Z men ~12% non-hetero, millennial men ~9%, Gen X ~5%, boomers+ <3%.
 * Values are the complement (straight).
 */
export const STRAIGHT_BY_AGE: Record<AgeRange, number> = {
  '18-24': 0.88,
  '25-29': 0.88,
  '30-34': 0.91,
  '35-39': 0.91,
  '40-44': 0.91,
  '45-49': 0.95,
  '50-54': 0.95,
  '55-59': 0.97,
  '60-64': 0.97,
  '65+':   0.98,
};

/**
 * Share of adult men who have never fathered a child, by age.
 * Source: US Census Bureau SIPP (P70-162) and NSFG 2017-2019.
 * Men 25-29: 70% childless; 30-34: 45.6%; 35-39: 28.4%; 40-49: 23.6%.
 */
export const CHILDLESS_BY_AGE: Record<AgeRange, number> = {
  '18-24': 0.93,
  '25-29': 0.70,
  '30-34': 0.456,
  '35-39': 0.284,
  '40-44': 0.236,
  '45-49': 0.236,
  '50-54': 0.23,
  '55-59': 0.23,
  '60-64': 0.22,
  '65+':   0.22,
};

/**
 * Share of adult men who used NO illicit drugs in the past year, by age.
 * Source: SAMHSA, NSDUH 2023 (national survey on drug use and health).
 * Past-year illicit drug use: 12+ = 24.9%, 18-25 = 39.0%, 26+ = 23.9%.
 * Values here are the complement (no use), adjusted for male prevalence.
 */
export const NO_DRUG_USE_BY_AGE: Record<AgeRange, number> = {
  '18-24': 0.61,
  '25-29': 0.63,
  '30-34': 0.68,
  '35-39': 0.72,
  '40-44': 0.75,
  '45-49': 0.77,
  '50-54': 0.79,
  '55-59': 0.81,
  '60-64': 0.83,
  '65+':   0.88,
};

/**
 * Share of adult men with no criminal record, by age.
 * Source: Brennan Center for Justice; SEARCH/BJS national criminal records survey (2018);
 * RAND Criminal Justice Base Rate Project.
 * ~1 in 3 working-age adults has a criminal record; ~46% of 35-year-old men have a
 * non-traffic conviction. Values are the complement (no record).
 */
export const NO_RECORD_BY_AGE: Record<AgeRange, number> = {
  '18-24': 0.78,
  '25-29': 0.65,
  '30-34': 0.58,
  '35-39': 0.54,
  '40-44': 0.53,
  '45-49': 0.53,
  '50-54': 0.54,
  '55-59': 0.56,
  '60-64': 0.57,
  '65+':   0.58,
};
