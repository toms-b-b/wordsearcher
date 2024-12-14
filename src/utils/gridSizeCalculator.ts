import { CSVPuzzle } from '../types';
import { MIN_GRID_SIZE } from './constants';

export function calculateMinGridSize(
  parsedPuzzles: CSVPuzzle[],
  currentGridSize: number,
): { minRequiredSize: number; newGridSize: number } {
  // Find longest word across all puzzles
  const longestWordLength = Math.max(
    ...parsedPuzzles.flatMap(puzzle => 
      puzzle.words.map(word => word.length)
    ),
    0 // Provide default value to prevent invalid array length
  );
  
  // Add buffer space and ensure minimum size
  const minRequiredSize = Math.max(MIN_GRID_SIZE, longestWordLength + 1);
  const newGridSize = Math.max(currentGridSize, minRequiredSize);

  return {
    minRequiredSize,
    newGridSize,
  };
}