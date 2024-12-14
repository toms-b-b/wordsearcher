import { jsPDF } from 'jspdf';
import { PuzzleConfig } from '../../types';

export interface PDFDimensions {
  pageWidth: number;
  pageHeight: number;
  marginInches: number;
  maxGridWidth: number;
  cellSize: number;
  gridStartY: number;
  wordsStartY: number;
  titleStartY: number;
}

export function calculatePDFDimensions(
  doc: jsPDF,
  puzzle: PuzzleConfig,
  gridSize: number
): PDFDimensions {
  // Fixed margin in inches
  const marginInches = 0.75;
  
  // Get page dimensions
  const pageWidth = puzzle.pageSize.width;
  const pageHeight = puzzle.pageSize.height;
  
  // Calculate available space for grid
  const maxGridWidth = pageWidth - (2 * marginInches);
  
  // Calculate cell size based on grid size
  const cellSize = maxGridWidth / gridSize;
  
  // Calculate vertical spacing
  const titleStartY = marginInches + (puzzle.titleFontSize / 72);
  const gridStartY = titleStartY + 0.5; // 0.5 inch gap after title
  const gridHeightInches = gridSize * cellSize;
  const wordsStartY = gridStartY + gridHeightInches + 0.5; // 0.5 inch gap after grid

  return {
    pageWidth,
    pageHeight,
    marginInches,
    maxGridWidth,
    cellSize,
    gridStartY,
    wordsStartY,
    titleStartY
  };
}