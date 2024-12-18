import { PageSize, FontOption } from '../types';

interface GridConstraints {
  maxGridSize: number;
  maxFontSize: number;
  maxWordBankFontSize: number;
  maxTitleFontSize: number;
}

const FONT_SIZE_FACTORS = {
  helvetica: 1,
  times: 0.9,    // Times is slightly more compact
  courier: 1.2   // Courier takes more space
};

export function calculateConstraints(
  pageSize: PageSize,
  font: FontOption,
  marginInches: number = 0.75
): GridConstraints {
  const fontFactor = FONT_SIZE_FACTORS[font.value as keyof typeof FONT_SIZE_FACTORS] || 1;
  const availableWidth = pageSize.width - (2 * marginInches);
  const availableHeight = pageSize.height - (2 * marginInches);

  // Minimum cell size in inches (based on typical readability)
  const MIN_CELL_SIZE = 0.25;

  // Calculate maximum grid size based on available space
  const maxGridSize = Math.floor(Math.min(
    availableWidth / (MIN_CELL_SIZE * fontFactor),
    availableHeight / (MIN_CELL_SIZE * fontFactor)
  ));

  // Calculate maximum font sizes
  const maxFontSize = Math.floor(MIN_CELL_SIZE * 72 / fontFactor); // Convert to points
  const maxWordBankFontSize = Math.floor(14 / fontFactor);
  const maxTitleFontSize = Math.floor(36 / fontFactor);

  return {
    maxGridSize: Math.min(maxGridSize, 20), // Cap at 20 for practical purposes
    maxFontSize,
    maxWordBankFontSize,
    maxTitleFontSize
  };
}