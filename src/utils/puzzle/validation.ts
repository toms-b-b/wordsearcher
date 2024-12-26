import { Direction } from '../../types';

export function validateDirection(direction: Direction): boolean {
  return ['horizontal', 'vertical', 'diagonal'].includes(direction);
}

export function validateWordPlacement(
  word: string,
  gridSize: number,
  direction: Direction,
  x: number,
  y: number,
  isBackwards: boolean
): boolean {
  const wordLength = word.length;

  if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) {
    return false;
  }

  switch (direction) {
    case 'horizontal':
      return isBackwards 
        ? x - wordLength + 1 >= 0 
        : x + wordLength <= gridSize;
    case 'vertical':
      return isBackwards 
        ? y - wordLength + 1 >= 0 
        : y + wordLength <= gridSize;
    case 'diagonal':
      return isBackwards 
        ? (x - wordLength + 1 >= 0 && y - wordLength + 1 >= 0)
        : (x + wordLength <= gridSize && y + wordLength <= gridSize);
    default:
      return false;
  }
}

export function validatePuzzleWords(words: string[]): string[] {
  if (!Array.isArray(words)) {
    return [];
  }

  return words
    .map(word => word.trim().toUpperCase())
    .filter(word => {
      // Remove empty strings
      if (!word) return false;

      // Only allow letters
      if (!/^[A-Z]+$/.test(word)) return false;

      // Ensure reasonable word length (2-15 characters)
      if (word.length < 2 || word.length > 15) return false;

      return true;
    });
}