import { useState } from 'react';
import { PuzzleConfig } from '../types';
import { parseCSV } from '../utils/csvParser';
import { findLongestWordLength } from '../utils/wordUtils';

export function useFileUpload(
  config: PuzzleConfig,
  setPuzzles: (puzzles: PuzzleConfig[]) => void
) {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const parsedPuzzles = parseCSV(content);
      
      // Find the longest word across all puzzles
      const maxWordLength = Math.max(...parsedPuzzles.map(puzzle => 
        findLongestWordLength(puzzle.words)
      ));
      
      const minGridSize = maxWordLength + 1;
      
      setPuzzles(parsedPuzzles.map(puzzle => ({
        ...config,
        title: puzzle.title,
        words: puzzle.words,
        gridSize: Math.max(config.gridSize, minGridSize)
      })));
      
      setError(null);
    } catch (error) {
      setError('Error reading file: ' + (error instanceof Error ? error.message : 'Unknown error'));
      console.error('File upload error:', error);
    }
  };

  return { handleFileUpload, error };
}