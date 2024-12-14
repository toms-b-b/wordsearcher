import React from 'react';
import { PuzzleCell } from '../types';

interface PuzzleGridProps {
  grid: PuzzleCell[][];
  fontSize: number;
  font: string;
}

export function PuzzleGrid({ grid, fontSize, font }: PuzzleGridProps) {
  return (
    <div className="grid gap-1" style={{
      gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`
    }}>
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className="aspect-square flex items-center justify-center border border-gray-300"
            style={{ 
              fontSize: `${fontSize}px`,
              fontFamily: font
            }}
          >
            {cell.letter}
          </div>
        ))
      )}
    </div>
  );
}