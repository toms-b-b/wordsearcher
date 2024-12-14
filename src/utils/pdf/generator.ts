import { jsPDF } from 'jspdf';
import { PuzzleConfig, PuzzleCell, PlacedWord } from '../../types';
import { calculatePDFDimensions } from './dimensions';
import { drawGrid, drawSolutionHighlights } from './gridDrawer';
import { drawWordList } from './wordList';

export function generatePDF(
  puzzle: PuzzleConfig,
  grid: PuzzleCell[][],
  placedWords: PlacedWord[],
  showSolution: boolean
): jsPDF {
  try {
    // Create PDF with correct page size
    const doc = new jsPDF({
      unit: 'in',
      format: [puzzle.pageSize.width, puzzle.pageSize.height],
      orientation: puzzle.pageSize.width > puzzle.pageSize.height ? 'l' : 'p'
    });

    // Calculate dimensions
    const dimensions = calculatePDFDimensions(doc, puzzle, grid.length);

    // Add title
    doc.setFont(puzzle.font.value);
    doc.setFontSize(puzzle.titleFontSize);
    doc.text(
      puzzle.title + (showSolution ? ' - Solution' : ''),
      dimensions.marginInches,
      dimensions.titleStartY
    );

    // Draw the base grid
    drawGrid(doc, grid, puzzle.fontSize, dimensions, puzzle.font.value);

    // Add solution highlights if needed
    if (showSolution) {
      drawSolutionHighlights(doc, placedWords, dimensions);
    }

    // Add word list
    drawWordList(
      doc,
      puzzle.words,
      puzzle.fontSize,
      dimensions,
      puzzle.font.value
    );

    return doc;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF for puzzle "${puzzle.title}": ${error.message}`);
  }
}