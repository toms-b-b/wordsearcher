import { Direction, PuzzleCell } from '../../types';
import { validateDirection, validateWordPlacement } from './validation';

interface PlacementPosition {
  x: number;
  y: number;
}

export function getRandomDirection(allowedDirections: Direction[]): Direction {
  const validDirections = allowedDirections.filter(validateDirection);
  if (validDirections.length === 0) {
    throw new Error('No valid directions provided');
  }
  return validDirections[Math.floor(Math.random() * validDirections.length)];
}

export function getRandomPosition(
  size: number,
  wordLength: number,
  direction: Direction
): PlacementPosition {
  let position: PlacementPosition;
  let isValid = false;
  let attempts = 0;
  const maxAttempts = 100;

  while (!isValid && attempts < maxAttempts) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    
    if (validateWordPlacement(Array(wordLength).fill('A').join(''), size, direction, x, y)) {
      position = { x, y };
      isValid = true;
    }
    
    attempts++;
  }

  if (!isValid) {
    throw new Error('Could not find valid position for word placement');
  }

  return position!;
}

export function canPlaceWord(
  grid: PuzzleCell[][],
  word: string,
  startX: number,
  startY: number,
  direction: Direction
): boolean {
  if (!validateWordPlacement(word, grid.length, direction, startX, startY)) {
    return false;
  }

  const directionVectors = {
    horizontal: { x: 1, y: 0 },
    vertical: { x: 0, y: 1 },
    diagonal: { x: 1, y: 1 }
  };
  
  const vector = directionVectors[direction];
  
  return word.split('').every((letter, i) => {
    const x = startX + (i * vector.x);
    const y = startY + (i * vector.y);
    const cell = grid[y]?.[x];
    return cell && (cell.letter === '' || cell.letter === letter.toUpperCase());
  });
}

export function placeWord(
  grid: PuzzleCell[][],
  word: string,
  startX: number,
  startY: number,
  direction: Direction,
  wordIndex: number
): void {
  if (!canPlaceWord(grid, word, startX, startY, direction)) {
    throw new Error(`Cannot place word "${word}" at position (${startX}, ${startY})`);
  }

  const directionVectors = {
    horizontal: { x: 1, y: 0 },
    vertical: { x: 0, y: 1 },
    diagonal: { x: 1, y: 1 }
  };
  
  const vector = directionVectors[direction];
  
  word.split('').forEach((letter, i) => {
    const x = startX + (i * vector.x);
    const y = startY + (i * vector.y);
    grid[y][x] = {
      letter: letter.toUpperCase(),
      isPartOfWord: true,
      position: { x, y },
      wordIndices: [...(grid[y][x]?.wordIndices || []), wordIndex]
    };
  });
}