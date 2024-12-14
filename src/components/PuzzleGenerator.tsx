import React, { useState } from 'react';
import { PuzzleConfig } from '../types';
import { parseCSV } from '../utils/csvParser';
import { generateZipFile } from '../utils/zip/generator';
import { generatePuzzle } from '../utils/puzzleGenerator';
import { PuzzleGrid } from './PuzzleGrid';
import { WordList } from './WordList';
import { ConfigPanel } from './ConfigPanel';
import { PAGE_SIZES, FONT_OPTIONS, MIN_GRID_SIZE } from '../utils/constants';

export function PuzzleGenerator() {
  const [puzzles, setPuzzles] = useState<PuzzleConfig[]>([]);
  const [generatedPuzzles, setGeneratedPuzzles] = useState<{
    grid: any[][];
    placedWords: any[];
  }[]>([]);
  
  const [config, setConfig] = useState({
    fontSize: 16,
    titleFontSize: 24,
    pageSize: PAGE_SIZES[0],
    directions: ['horizontal', 'vertical', 'diagonal'] as const,
    gridSize: MIN_GRID_SIZE,
    font: FONT_OPTIONS[0]
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const parsedPuzzles = parseCSV(content);
      
      if (parsedPuzzles.length === 0) {
        throw new Error('No valid puzzles found in the CSV file');
      }
      
      // Calculate minimum grid size based on longest word
      const longestWordLength = Math.max(
        ...parsedPuzzles.flatMap(p => p.words.map(w => w.length))
      );
      const minGridSize = Math.max(MIN_GRID_SIZE, longestWordLength + 1);
      
      setConfig(prev => ({
        ...prev,
        gridSize: Math.max(prev.gridSize, minGridSize)
      }));

      const newPuzzles = parsedPuzzles.map(p => ({
        ...p,
        fontSize: config.fontSize,
        titleFontSize: config.titleFontSize,
        pageSize: config.pageSize,
        directions: config.directions,
        gridSize: Math.max(config.gridSize, minGridSize),
        font: config.font
      }));
      
      setPuzzles(newPuzzles);
      const newGeneratedPuzzles = newPuzzles.map(puzzle => generatePuzzle(puzzle));
      setGeneratedPuzzles(newGeneratedPuzzles);
    } catch (error) {
      console.error('Error processing file:', error);
      alert(`Error processing file: ${error.message}`);
    }
  };

  const handleDownload = async () => {
    if (puzzles.length === 0) {
      alert('Please upload a CSV file first');
      return;
    }

    try {
      const puzzleData = puzzles.map((config, index) => ({
        config,
        grid: generatedPuzzles[index].grid,
        placedWords: generatedPuzzles[index].placedWords
      }));

      const zipBlob = await generateZipFile(puzzleData);
      
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'word_search_puzzles.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating puzzles:', error);
      alert(`Failed to generate puzzles: ${error.message}`);
    }
  };

  const regeneratePuzzles = () => {
    if (puzzles.length === 0) return;
    
    const newPuzzles = puzzles.map(p => ({
      ...p,
      fontSize: config.fontSize,
      titleFontSize: config.titleFontSize,
      pageSize: config.pageSize,
      directions: config.directions,
      gridSize: config.gridSize,
      font: config.font
    }));
    
    setPuzzles(newPuzzles);
    const newGeneratedPuzzles = newPuzzles.map(puzzle => generatePuzzle(puzzle));
    setGeneratedPuzzles(newGeneratedPuzzles);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ConfigPanel
          config={config}
          setConfig={setConfig}
          regeneratePuzzles={regeneratePuzzles}
          handleFileUpload={handleFileUpload}
          handleDownload={handleDownload}
          puzzles={puzzles}
        />

        {generatedPuzzles.map((generated, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 
              className="text-2xl font-bold mb-6" 
              style={{ 
                fontSize: `${puzzles[index].titleFontSize}px`,
                fontFamily: puzzles[index].font.label
              }}
            >
              {puzzles[index].title}
            </h2>
            <PuzzleGrid 
              grid={generated.grid} 
              fontSize={puzzles[index].fontSize}
              font={puzzles[index].font.label}
            />
            <WordList 
              words={puzzles[index].words} 
              fontSize={puzzles[index].fontSize}
              font={puzzles[index].font.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}