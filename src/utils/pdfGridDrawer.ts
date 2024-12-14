import { jsPDF } from 'jspdf';
import { PuzzleCell, PlacedWord } from '../types';
import { MARGIN } from './pdfStyles';

const BORDER_RADIUS = 5;

export function drawGrid(
  doc: jsPDF,
  grid: PuzzleCell[][],
  fontSize: number,
  startY: number,
  cellSize: number,
  font: string
): void {
  doc.setFont(font);
  doc.setFontSize(fontSize);
  
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      const cellX = MARGIN + (x * cellSize);
      const cellY = startY + (y * cellSize);

      // Draw cell border
      doc.rect(cellX, cellY, cellSize, cellSize);

      // Draw letter
      doc.text(
        cell.letter,
        cellX + (cellSize / 2),
        cellY + (cellSize / 2) + (fontSize / 4),
        { align: 'center' }
      );
    });
  });
}

export function drawSolutionHighlights(
  doc: jsPDF,
  placedWords: PlacedWord[],
  cellSize: number,
  startY: number
): void {
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.5);

  placedWords.forEach((placedWord) => {
    const wordLength = placedWord.word.length;
    const startX = MARGIN + (placedWord.startX * cellSize);
    const wordStartY = startY + (placedWord.startY * cellSize);

    if (placedWord.direction === 'horizontal') {
      drawRoundedRect(doc, startX, wordStartY, wordLength * cellSize, cellSize);
    } else if (placedWord.direction === 'vertical') {
      drawRoundedRect(doc, startX, wordStartY, cellSize, wordLength * cellSize);
    } else {
      // For diagonal words, draw connecting lines with rounded corners
      const endX = startX + (wordLength * cellSize);
      const endY = wordStartY + (wordLength * cellSize);
      drawDiagonalHighlight(doc, startX, wordStartY, endX, endY, cellSize);
    }
  });
}

function drawRoundedRect(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const radius = BORDER_RADIUS;
  
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
  // Draw diagonal line with rounded corners at start and end
  doc.setLineCap('round');
  doc.line(
    startX + (cellSize / 2),
    startY + (cellSize / 2),
    endX - (cellSize / 2),
    endY - (cellSize / 2)
  );
}