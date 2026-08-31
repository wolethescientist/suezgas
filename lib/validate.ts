/**
 * Enough validation for two forms, and no more. Both run entirely in the
 * browser now — there is no server endpoint behind them to defend, so this is
 * about catching a typo before the customer's mail app opens, not about trust.
 */

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Nigerian numbers arrive as 080…, 23480…, +23480… — accept the lot, reject prose. */
export function isPhone(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
