import { AgeRange, Race, EducationLevel, IncomeBracket } from '../types';

/**
 * Height parameters for adult males in the US (in inches).
 * Source: CDC NHANES 2017-2018
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
 * Male income distribution by age range (US Census Bureau ACS 2023).
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
 * Source: US Census Bureau, 2023.
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
 * Source: CDC NHANES 2017-2020.
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
 * Source: US Census Bureau, 2023.
 */
export const RACE_DISTRIBUTION: Record<Race, number> = {
  [Race.ANY]: 1.0,
  [Race.WHITE]: 0.593,
  [Race.BLACK]: 0.124,
  [Race.HISPANIC]: 0.191,
  [Race.ASIAN]: 0.061,
  [Race.OTHER]: 0.031
};

/**
 * Educational attainment for US adult males.
 * Source: US Census Bureau, 2023.
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
 * Source: US Census Bureau, 2023.
 */
export const AGE_DISTRIBUTION: Record<AgeRange, number> = {
  '18-24': 0.12,
  '25-29': 0.09,
  '30-34': 0.09,
  '35-39': 0.09,
  '40-44': 0.08,
  '45-49': 0.08,
  '50-54': 0.08,
  '55-59': 0.08,
  '60-64': 0.08,
  '65+':   0.21,
};
