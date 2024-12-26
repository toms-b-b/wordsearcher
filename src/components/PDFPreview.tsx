import React from 'react';
import { PuzzleGrid } from './PuzzleGrid';
import { WordList } from './WordList';
import { PuzzleConfig } from '../types';

interface PDFPreviewProps {
  title: string;
  grid: any[][];
  words: string[];
  fontSize: number;
  wordBankFontSize: number;
  font: string;
  placedWords?: any[];
  showSolution?: boolean;
}

export function PDFPreview({
  title,
  grid,
  words,
  fontSize,
  wordBankFontSize,
  font,
  placedWords,
  showSolution
}: PDFPreviewProps) {
  return (
    <div className="bg-white p-8 shadow-lg rounded-lg" style={{ 
      width: '8.5in',
      minHeight: '11in',
      margin: '0 auto'
    }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">
          {title}
          {showSolution ? ' - Solution' : ''}
        </h2>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <PuzzleGrid 
          grid={grid} 
          fontSize={fontSize} 
          font={font}
          placedWords={placedWords}
          showSolution={showSolution}
        />
        
        {!showSolution && (
          <div className="mt-8">
            <WordList 
              words={words} 
              fontSize={fontSize}
              wordBankFontSize={wordBankFontSize}
              font={font}
            />
          </div>
        )}
      </div>
    </div>
  );
}