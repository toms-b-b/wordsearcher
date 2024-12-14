import { PuzzleConfig, PuzzleCell, PlacedWord } from '../types';
import { initializeGrid, fillEmptySpaces } from './puzzle/grid';
import { getRandomDirection, getRandomPosition, canPlaceWord, placeWord } from './puzzle/placement';

export function generatePuzzle(config: PuzzleConfig): {
  grid: PuzzleCell[][],
  placedWords: PlacedWord[]
} {
  const size = config.gridSize;
  const grid = initializeGrid(size);
  const words = config.words.sort((a, b) => b.length - a.length);
  const placedWords: PlacedWord[] = [];

  words.forEach((word, wordIndex) => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const direction = getRandomDirection(config.directions);
      const { x, y } = getRandomPosition(size, word.length, direction);
      
      if (canPlaceWord(grid, word, x, y, direction)) {
        placeWord(grid, word, x, y, direction, wordIndex);
        placedWords.push({
          word,
          startX: x,
          startY: y,
          direction,
          index: wordIndex
        });
        placed = true;
      }
      attempts++;
    }
  });

  fillEmptySpaces(grid);
  return { grid, placedWords };
}