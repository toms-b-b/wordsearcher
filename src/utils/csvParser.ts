import { CSVPuzzle } from '../types';

export function parseCSV(content: string): CSVPuzzle[] {
  const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
  const puzzles: CSVPuzzle[] = [];
  let currentPuzzle: CSVPuzzle | null = null;

  lines.forEach(line => {
    if (line.startsWith('Title:')) {
      if (currentPuzzle) {
        puzzles.push(currentPuzzle);
      }
      currentPuzzle = {
        title: line.replace('Title:', '').trim(),
        words: []
      };
    } else if (currentPuzzle) {
      currentPuzzle.words.push(...line.split(',').map(word => word.trim()));
    }
  });

  if (currentPuzzle) {
    puzzles.push(currentPuzzle);
  }

  return puzzles;
}