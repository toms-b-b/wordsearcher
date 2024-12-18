import React, { useState, useEffect } from 'react';
import { PuzzleConfig } from '../types';
import { ConfigPanel } from './ConfigPanel';
import { PuzzlePreview } from './PuzzlePreview';
import { useFileUpload } from '../hooks/useFileUpload';
import { useZipDownload } from '../hooks/useZipDownload';
import { PAGE_SIZES, FONT_OPTIONS, MIN_GRID_SIZE } from '../utils/constants';
import { findLongestWordLength } from '../utils/wordUtils';
import { calculateConstraints } from '../utils/constraints';
import { validateConfig } from '../utils/validation';

export function PuzzleGenerator() {
  const [puzzles, setPuzzles] = useState<PuzzleConfig[]>([]);
  const [config, setConfig] = useState<PuzzleConfig>({
    title: '',
    words: [],
    fontSize: 16,
    wordBankFontSize: 14,
    titleFontSize: 24,
    pageSize: PAGE_SIZES[0],
    directions: ['horizontal', 'vertical', 'diagonal'],
    gridSize: MIN_GRID_SIZE,
    font: FONT_OPTIONS[0]
  });

  const { handleFileUpload, error: uploadError } = useFileUpload(config, setPuzzles);
  const { handleDownload, error: downloadError } = useZipDownload();

  const regeneratePuzzles = () => {
    setPuzzles(prev => prev.map(puzzle => ({
      ...puzzle,
      fontSize: config.fontSize,
      wordBankFontSize: config.wordBankFontSize,
      titleFontSize: config.titleFontSize,
      pageSize: config.pageSize,
      directions: config.directions,
      gridSize: config.gridSize,
      font: config.font
    })));
  };

  useEffect(() => {
    if (puzzles.length > 0) {
      const maxWordLength = Math.max(...puzzles.map(puzzle => 
        findLongestWordLength(puzzle.words)
      ));
      const minGridSize = maxWordLength + 1;
      const constraints = calculateConstraints(config.pageSize, config.font);
      
      setConfig(prev => {
        const { config: validatedConfig } = validateConfig({
          ...prev,
          gridSize: Math.max(prev.gridSize, minGridSize)
        }, minGridSize);
        
        return validatedConfig;
      });
    }
  }, [puzzles, config.pageSize, config.font]);

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfigPanel
        config={config}
        minGridSize={Math.max(
          MIN_GRID_SIZE,
          ...puzzles.map(p => findLongestWordLength(p.words) + 1)
        )}
        setConfig={setConfig}
        regeneratePuzzles={regeneratePuzzles}
        handleFileUpload={handleFileUpload}
        handleDownload={() => handleDownload(puzzles)}
        puzzles={puzzles}
      />

      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <p className="text-red-600">{uploadError}</p>
        </div>
      )}

      {downloadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <p className="text-red-600">{downloadError}</p>
        </div>
      )}

      {puzzles.map((puzzle, index) => (
        <PuzzlePreview key={index} puzzle={puzzle} />
      ))}
    </div>
  );
}