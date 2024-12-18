import { PuzzleConfig } from '../types';
import { MIN_GRID_SIZE } from './constants';
import { calculateConstraints } from './constraints';

export function validateGridSize(size: number, minRequired: number = MIN_GRID_SIZE, maxAllowed?: number): number {
  if (isNaN(size) || !Number.isFinite(size)) {
    return minRequired;
  }
  
  // Ensure integer and within bounds
  const validSize = Math.max(Math.floor(size), minRequired);
  return maxAllowed ? Math.min(validSize, maxAllowed) : validSize;
}

export function validateFontSize(
  size: number,
  maxSize: number,
  defaultSize: number = 16
): number {
  if (isNaN(size) || !Number.isFinite(size)) {
    return defaultSize;
  }
  
  // Ensure integer and within bounds
  return Math.min(Math.max(Math.floor(size), 8), maxSize);
}

export function validateTitle(title: string, maxLength: number = 50): string {
  return title.trim().slice(0, maxLength);
}

export function validateConfig(
  config: Partial<PuzzleConfig>,
  minGridSize: number
): { config: PuzzleConfig; errors: string[] } {
  const errors: string[] = [];
  const constraints = calculateConstraints(config.pageSize!, config.font!);
  
  let validatedConfig = { ...config } as PuzzleConfig;

  // Validate title
  if (!config.title?.trim()) {
    errors.push('Title is required');
  }
  validatedConfig.title = validateTitle(config.title || '');

  // Validate words
  if (!Array.isArray(config.words) || config.words.length === 0) {
    errors.push('At least one word is required');
  }

  // Validate grid size
  validatedConfig.gridSize = validateGridSize(
    config.gridSize!,
    minGridSize,
    constraints.maxGridSize
  );

  // Validate font sizes
  validatedConfig.fontSize = validateFontSize(
    config.fontSize!,
    constraints.maxFontSize
  );
  
  validatedConfig.wordBankFontSize = validateFontSize(
    config.wordBankFontSize!,
    constraints.maxWordBankFontSize,
    14
  );
  
  validatedConfig.titleFontSize = validateFontSize(
    config.titleFontSize!,
    constraints.maxTitleFontSize,
    24
  );

  return { config: validatedConfig, errors };
}