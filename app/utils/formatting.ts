/**
 * German number and currency formatting utilities
 * Handles German decimal notation (comma as decimal separator)
 */

/**
 * Formats a number with German decimal notation (comma instead of dot)
 */
export const formatGermanNumber = (
  num: number,
  decimals: number = 1
): string => {
  return num.toFixed(decimals).replace(".", ",");
};

/**
 * Parses a German-formatted number string (with comma) or English format (with dot) to a JavaScript number
 */
export const parseGermanNumber = (value: string): number => {
  // Handle both German (comma) and English (dot) decimal notation
  // First check if it contains a comma (German format)
  if (value.includes(",")) {
    const normalizedValue = value.replace(",", ".");
    return parseFloat(normalizedValue);
  }
  // Otherwise treat as English format with dot
  return parseFloat(value);
};

/**
 * Formats dimensions with German notation for display
 */
export const formatGermanDimensions = (
  height: number,
  width: number,
  depth: number
): string => {
  return `${formatGermanNumber(height)}m × ${formatGermanNumber(
    width
  )}m × ${formatGermanNumber(depth)}m`;
};
