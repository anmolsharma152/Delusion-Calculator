/**
 * Formats a decimal proportion as a percentage accurate up to 3 to 4 decimal places.
 */
export function formatPercentage(p: number): string {
  const percentage = p * 100;
  if (percentage <= 0) return '0.0000%';
  if (percentage < 0.0001) return '<0.0001%';
  if (percentage < 1) return `${percentage.toFixed(4)}%`;
  if (percentage < 10) return `${percentage.toFixed(3)}%`;
  return `${percentage.toFixed(2)}%`;
}

/**
 * Formats a probability as a "1 in X" ratio string.
 */
export function formatRatio(p: number): string {
  if (p >= 1) return '1 in 1';
  if (p <= 0) return '0 in 1';
  
  const ratio = 1 / p;
  if (ratio > 1000000) return `1 in ${(ratio / 1000000).toFixed(2)}M`;
  if (ratio > 1000) return `1 in ${Math.round(ratio).toLocaleString()}`;
  return `1 in ${ratio.toFixed(1)}`;
}

/**
 * Formats inches to standard US height string.
 */
export function formatHeight(inches: number): string {
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  return `${feet}'${remainingInches}"`;
}

/**
 * Formats dollar amount into shorthand K/M notation.
 */
export function formatIncome(dollars: number): string {
  if (dollars >= 1000000) {
    return `$${(dollars / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (dollars >= 1000) {
    return `$${Math.round(dollars / 1000)}k`;
  }
  return `$${dollars}`;
}
