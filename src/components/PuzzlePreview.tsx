import React from 'react';
import { PuzzleGrid } from './PuzzleGrid';
import { WordList } from './WordList';
import { PuzzleConfig } from '../types';
import { generatePuzzle } from '../utils/puzzleGenerator';

interface PuzzlePreviewProps {
  puzzle: PuzzleConfig;
}

export function PuzzlePreview({ puzzle }: PuzzlePreviewProps) {
  try {
    const { grid, placedWords } = generatePuzzle(puzzle);
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">{puzzle.title}</h2>
        <div className="max-w-2xl mx-auto">
          <PuzzleGrid 
            grid={grid} 
            fontSize={puzzle.fontSize} 
            font={puzzle.font.value} 
          />
          <WordList 
            words={puzzle.words} 
            fontSize={puzzle.fontSize}
            wordBankFontSize={puzzle.wordBankFontSize}
            font={puzzle.font.value}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error generating puzzle preview:', error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-red-700">{puzzle.title} - Error</h2>
        <p className="text-red-600">
          Failed to generate puzzle preview: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}