import React from 'react';
import { PuzzleCell, PlacedWord } from '../types';

interface PuzzleGridProps {
  grid: PuzzleCell[][];
  fontSize: number;
  font: string;
  placedWords?: PlacedWord[];
  showSolution?: boolean;
}

export function PuzzleGrid({ 
  grid, 
  fontSize, 
  font,
  placedWords,
  showSolution 
}: PuzzleGridProps) {
  return (
    <div className="grid gap-1" style={{
      gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`
    }}>
      {grid.map((row, y) =>
        row.map((cell, x) => {
          const isHighlighted = showSolution && placedWords?.some(word => {
            const isPartOfWord = cell.wordIndices.includes(word.index);
            return isPartOfWord;
          });

          return (
            <div
              key={`${x}-${y}`}
              className={`
                aspect-square flex items-center justify-center border border-gray-300
                ${isHighlighted ? 'bg-yellow-200' : ''}
              `}
              style={{ 
                fontSize: `${fontSize}px`,
                fontFamily: font
              }}
            >
              {cell.letter}
            </div>
          );
        })
      )}
    </div>
  );
}