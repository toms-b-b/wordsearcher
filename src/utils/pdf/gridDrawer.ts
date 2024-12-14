import { jsPDF } from 'jspdf';
import { PuzzleCell, PlacedWord } from '../../types';
import { PDFDimensions } from './dimensions';
import { drawWordHighlight } from './highlighting';

export function drawGrid(
  doc: jsPDF,
  grid: PuzzleCell[][],
  fontSize: number,
  dimensions: PDFDimensions,
  font: string,
): void {
  try {
    doc.setFont(font);
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);
    doc.setLineWidth(0.01);
    
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellX = dimensions.marginInches + (x * dimensions.cellSize);
        const cellY = dimensions.gridStartY + (y * dimensions.cellSize);

        // Draw cell border
        doc.rect(cellX, cellY, dimensions.cellSize, dimensions.cellSize);

        // Center letter in cell
        const textWidth = doc.getStringUnitWidth(cell.letter) * fontSize / doc.internal.scaleFactor;
        const xOffset = (dimensions.cellSize - textWidth) / 2;
        const yOffset = (dimensions.cellSize + fontSize / 72) / 2;

        doc.text(
          cell.letter,
          cellX + xOffset,
          cellY + yOffset,
        );
      });
    });
  } catch (error) {
    console.error('Error drawing grid:', error);
    throw new Error('Failed to draw puzzle grid');
  }
}

export function drawSolutionHighlights(
  doc: jsPDF,
  placedWords: PlacedWord[],
  dimensions: PDFDimensions,
): void {
  try {
    placedWords.forEach((placedWord) => {
      const startX = dimensions.marginInches + (placedWord.startX * dimensions.cellSize);
      const startY = dimensions.gridStartY + (placedWord.startY * dimensions.cellSize);

      drawWordHighlight(
        doc,
        startX,
        startY,
        placedWord.word.length,
        dimensions.cellSize,
        placedWord.direction,
      );
    });
  } catch (error) {
    console.error('Error drawing solution highlights:', error);
    throw new Error('Failed to draw solution highlights');
  }
}