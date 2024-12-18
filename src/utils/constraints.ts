import { PageSize, FontOption } from '../types';
import { MAX_GRID_SIZE } from './constants.ts';

interface GridConstraints {
  maxGridSize: number;
  maxFontSize: number;
  maxWordBankFontSize: number;
  maxTitleFontSize: number;
}

const FONT_SIZE_FACTORS = {
  helvetica: 1,      // Standard font size factor
  times: 0.9,        // Times is slightly more compact
  courier: 1.2,      // Courier takes more space
  arial: 1,          // Arial is similar to Helvetica in size
  georgia: 1.1,      // Georgia is a bit wider and taller than Helvetica
  verdana: 1.05      // Verdana is slightly more spaced out than Helvetica
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
    maxGridSize: Math.min(maxGridSize, MAX_GRID_SIZE), // Cap at 20 for practical purposes
    maxFontSize,
    maxWordBankFontSize,
    maxTitleFontSize
  };
}