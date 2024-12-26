import React from 'react';
import { PDFPreview } from './PDFPreview';
import { PuzzleConfig } from '../types';
import { generatePuzzle } from '../utils/puzzleGenerator';

interface PuzzlePreviewProps {
  puzzle: PuzzleConfig;
}

export function PuzzlePreview({ puzzle }: PuzzlePreviewProps) {
  try {
    const { grid, placedWords } = generatePuzzle(puzzle);
    
    return (
      <div className="space-y-8 overflow-x-auto">
        {/* Puzzle */}
        <PDFPreview
          title={puzzle.title}
          grid={grid}
          words={puzzle.words}
          fontSize={puzzle.fontSize}
          wordBankFontSize={puzzle.wordBankFontSize}
          font={puzzle.font.value}
        />

        {/* Solution */}
        <PDFPreview
          title={puzzle.title}
          grid={grid}
          words={puzzle.words}
          fontSize={puzzle.fontSize}
          wordBankFontSize={puzzle.wordBankFontSize}
          font={puzzle.font.value}
          placedWords={placedWords}
          showSolution={true}
        />
      </div>
    );
  } catch (error) {
    console.error('Error generating puzzle preview:', error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-700">{puzzle.title} - Error</h2>
        <p className="text-red-600">
          Failed to generate puzzle preview: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}