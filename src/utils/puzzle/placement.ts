import { Direction, PuzzleCell } from '../../types';

export function getRandomDirection(allowedDirections: Direction[]): Direction {
  return allowedDirections[Math.floor(Math.random() * allowedDirections.length)];
}

export function getRandomPosition(size: number, wordLength: number, direction: Direction) {
  const getRange = (max: number) => Math.floor(Math.random() * max);
  
  switch (direction) {
    case 'horizontal':
      return { x: getRange(size - wordLength), y: getRange(size) };
    case 'vertical':
      return { x: getRange(size), y: getRange(size - wordLength) };
    case 'diagonal':
      return { 
        x: getRange(size - wordLength),
        y: getRange(size - wordLength)
      };
  }
}

export function canPlaceWord(
  grid: PuzzleCell[][],
  word: string,
  startX: number,
  startY: number,
  direction: Direction
): boolean {
  const directionVectors = {
    horizontal: { x: 1, y: 0 },
    vertical: { x: 0, y: 1 },
    diagonal: { x: 1, y: 1 }
  };
  
  const vector = directionVectors[direction];
  
  return word.split('').every((letter, i) => {
    const x = startX + (i * vector.x);
    const y = startY + (i * vector.y);
    return grid[y][x].letter === '' || grid[y][x].letter === letter;
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
      wordIndices: [...(grid[y][x].wordIndices || []), wordIndex]
    };
  });
}