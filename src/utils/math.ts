import { IncomeBracket } from '../types';

/**
 * Error function implementation for normal distribution CDF.
 */
export function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

/**
 * Normal cumulative distribution function.
 */
export function normalCDF(x: number, mean: number, stdDev: number): number {
  return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linearly interpolate the percentage of people earning at or above a threshold.
 */
export function interpolateIncome(threshold: number, brackets: IncomeBracket[]): number {
  if (threshold <= 0) return 1.0;
  
  let lowerBracket: IncomeBracket | null = null;
  let upperBracket: IncomeBracket | null = null;
  
  for (let i = 0; i < brackets.length; i++) {
    const b = brackets[i];
    if (b.max === null || threshold <= b.max) {
      if (threshold >= b.min) {
        lowerBracket = brackets[Math.max(0, i - 1)] || b;
        upperBracket = b;
        break;
      }
    }
  }

  if (!upperBracket) return 0.0;
  
  const min = upperBracket.min;
  const max = upperBracket.max;
  
  if (max === null) {
    // If unbounded, just return an estimate of the very top
    return 1 - upperBracket.cumulative + (upperBracket.percentage * 0.5);
  }
  
  const range = max - min;
  const offset = threshold - min;
  const fraction = offset / range;
  
  // Percent below threshold
  const belowThreshold = upperBracket.cumulative - upperBracket.percentage + (fraction * upperBracket.percentage);
  
  // Return percent at or above threshold
  return clamp(1.0 - belowThreshold, 0, 1);
}
