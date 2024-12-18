import { Direction, PuzzleConfig } from '../../types';

export function validateDirection(direction: Direction): boolean {
  return ['horizontal', 'vertical', 'diagonal'].includes(direction);
}

export function validateWordPlacement(
  word: string,
  gridSize: number,
  direction: Direction,
  x: number,
  y: number
): boolean {
  if (x < 0 || y < 0) return false;
  
  switch (direction) {
    case 'horizontal':
      return x + word.length <= gridSize;
    case 'vertical':
      return y + word.length <= gridSize;
    case 'diagonal':
      return x + word.length <= gridSize && y + word.length <= gridSize;
    default:
      return false;
  }
}

export function validateWord(word: string): boolean {
  return Boolean(word && typeof word === 'string' && word.trim().length > 0);
}

export function validatePuzzleWords(words: string[]): string[] {
  return words.filter(validateWord).map(word => word.trim().toUpperCase());
}