import { jsPDF } from 'jspdf';
import { PuzzleConfig, PuzzleCell } from '../../types';

export const MARGIN_INCHES = 0.5;
export const BORDER_RADIUS = 0.1;

export function calculatePDFDimensions(
  doc: jsPDF,
  puzzle: PuzzleConfig,
  grid: PuzzleCell[][]
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Calculate available space for grid
  const maxGridWidth = pageWidth - (2 * MARGIN_INCHES);
  const cellSize = maxGridWidth / grid.length;
  
  // Calculate vertical positions
  const titleHeight = (puzzle.titleFontSize / 72);
  const gridStartY = MARGIN_INCHES + titleHeight + 0.3;
  const gridHeight = grid.length * cellSize;
  const wordsStartY = gridStartY + gridHeight + 0.5;

  return {
    pageWidth,
    pageHeight,
    maxGridWidth,
    cellSize,
    gridStartY,
    wordsStartY,
    marginInches: MARGIN_INCHES
  };
}