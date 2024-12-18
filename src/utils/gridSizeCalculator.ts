import { CSVPuzzle } from '../types';
import { MIN_GRID_SIZE } from './constants';

export function findLongestWordLength(puzzles: CSVPuzzle[]): number {
  return Math.max(
    ...puzzles.flatMap(puzzle => 
      puzzle.words.map(word => word.trim().length)
    ),
    0
  );
}

export function calculateMinGridSize(
  parsedPuzzles: CSVPuzzle[],
  currentGridSize: number,
): { minRequiredSize: number; newGridSize: number } {
  const longestWordLength = findLongestWordLength(parsedPuzzles);
  
  // Add buffer space for diagonal placement and ensure minimum size
  const minRequiredSize = Math.max(MIN_GRID_SIZE, longestWordLength + 2);
  
  // Ensure grid size is never smaller than the minimum required
  const newGridSize = Math.max(currentGridSize, minRequiredSize);

  return {
    minRequiredSize,
    newGridSize,
  };
}