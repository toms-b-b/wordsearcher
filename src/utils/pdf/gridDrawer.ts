import { jsPDF } from 'jspdf';
import { PuzzleCell, PlacedWord } from '../../types';
import { PDFDimensions } from './dimensions';

const BORDER_RADIUS = 0.05; // in inches

export function drawGrid(
  doc: jsPDF,
  grid: PuzzleCell[][],
  fontSize: number,
  dimensions: PDFDimensions,
  font: string
): void {
  try {
    doc.setFont(font);
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);
    doc.setLineWidth(0.01); // Thinner lines for grid
    
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
          cellY + yOffset
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
  dimensions: PDFDimensions
): void {
  try {
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.02); // Thicker lines for highlights

    placedWords.forEach((placedWord) => {
      const wordLength = placedWord.word.length;
      const startX = dimensions.marginInches + (placedWord.startX * dimensions.cellSize);
      const startY = dimensions.gridStartY + (placedWord.startY * dimensions.cellSize);

      switch (placedWord.direction) {
        case 'horizontal':
          drawRoundedRect(
            doc,
            startX - 0.05,
            startY - 0.05,
            (wordLength * dimensions.cellSize) + 0.1,
            dimensions.cellSize + 0.1
          );
          break;
        case 'vertical':
          drawRoundedRect(
            doc,
            startX - 0.05,
            startY - 0.05,
            dimensions.cellSize + 0.1,
            (wordLength * dimensions.cellSize) + 0.1
          );
          break;
        case 'diagonal':
          const endX = startX + (wordLength * dimensions.cellSize);
          const endY = startY + (wordLength * dimensions.cellSize);
          drawDiagonalHighlight(doc, startX, startY, endX, endY, dimensions.cellSize);
          break;
      }
    });
  } catch (error) {
    console.error('Error drawing solution highlights:', error);
    throw new Error('Failed to draw solution highlights');
  }
}

function drawRoundedRect(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const radius = BORDER_RADIUS;
  
  // Draw the rounded rectangle using bezier curves
  doc.lines(
    [
      [width - 2 * radius, 0],
      [radius, 0, radius, 0, width, 0],
      [0, height - 2 * radius],
      [0, radius, 0, height, 0, height],
      [-width + 2 * radius, 0],
      [-radius, 0, -width, 0, -width, 0],
      [0, -height + 2 * radius],
      [0, -radius, 0, -height, 0, -height]
    ],
    x + radius,
    y + radius
  );
}

function drawDiagonalHighlight(
  doc: jsPDF,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  cellSize: number
): void {
  doc.setLineCap('round');
  doc.setLineWidth(0.03); // Slightly thicker for diagonal lines
  doc.line(
    startX + (cellSize / 2),
    startY + (cellSize / 2),
    endX - (cellSize / 2),
    endY - (cellSize / 2)
  );
}