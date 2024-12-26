import { Direction, PuzzleCell } from '../../types';
import { validateDirection, validateWordPlacement } from './validation';

interface PlacementPosition {
  x: number;
  y: number;
}

export function getRandomDirection(
  allowedDirections: Direction[],
  allowBackwards: boolean
): { direction: Direction; isBackwards: boolean } {
  const validDirections = allowedDirections.filter(validateDirection);
  if (validDirections.length === 0) {
    throw new Error('No valid directions provided');
  }

  const direction = validDirections[Math.floor(Math.random() * validDirections.length)];
  const isBackwards = allowBackwards && Math.random() < 0.5;

  return { direction, isBackwards };
}

export function getRandomPosition(
  size: number,
  wordLength: number,
  direction: Direction,
  isBackwards: boolean
): PlacementPosition {
  let x: number, y: number;
  let isValid = false;
  let attempts = 0;
  const maxAttempts = 100;

  while (!isValid && attempts < maxAttempts) {
    switch (direction) {
      case 'horizontal':
        x = isBackwards 
          ? Math.floor(Math.random() * (size - wordLength)) + wordLength 
          : Math.floor(Math.random() * (size - wordLength));
        y = Math.floor(Math.random() * size);
        break;
      case 'vertical':
        x = Math.floor(Math.random() * size);
        y = isBackwards
          ? Math.floor(Math.random() * (size - wordLength)) + wordLength
          : Math.floor(Math.random() * (size - wordLength));
        break;
      case 'diagonal':
        if (isBackwards) {
          x = Math.floor(Math.random() * (size - wordLength)) + wordLength;
          y = Math.floor(Math.random() * (size - wordLength)) + wordLength;
        } else {
          x = Math.floor(Math.random() * (size - wordLength));
          y = Math.floor(Math.random() * (size - wordLength));
        }
        break;
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
    
    if (validateWordPlacement('A'.repeat(wordLength), size, direction, x, y, isBackwards)) {
      isValid = true;
      break;
    }
    
    attempts++;
  }

  if (!isValid) {
    throw new Error('Could not find valid position for word placement');
  }

  return { x, y };
}

export function canPlaceWord(
  grid: PuzzleCell[][],
  word: string,
  startX: number,
  startY: number,
  direction: Direction,
  isBackwards: boolean
): boolean {
  if (!validateWordPlacement(word, grid.length, direction, startX, startY, isBackwards)) {
    return false;
  }

  const directionVectors = {
    horizontal: { x: isBackwards ? -1 : 1, y: 0 },
    vertical: { x: 0, y: isBackwards ? -1 : 1 },
    diagonal: { x: isBackwards ? -1 : 1, y: isBackwards ? -1 : 1 }
  };
  
  const vector = directionVectors[direction];
  const wordToPlace = isBackwards ? word.split('').reverse().join('') : word;
  
  return wordToPlace.split('').every((letter, i) => {
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
  isBackwards: boolean,
  wordIndex: number
): void {
  if (!canPlaceWord(grid, word, startX, startY, direction, isBackwards)) {
    throw new Error(`Cannot place word "${word}" at position (${startX}, ${startY})`);
  }

  const directionVectors = {
    horizontal: { x: isBackwards ? -1 : 1, y: 0 },
    vertical: { x: 0, y: isBackwards ? -1 : 1 },
    diagonal: { x: isBackwards ? -1 : 1, y: isBackwards ? -1 : 1 }
  };
  
  const vector = directionVectors[direction];
  const wordToPlace = isBackwards ? word.split('').reverse().join('') : word;
  
  wordToPlace.split('').forEach((letter, i) => {
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