import { jsPDF } from 'jspdf';
import { PuzzleConfig, PuzzleCell, PlacedWord } from '../types';
import { calculatePDFDimensions } from './pdfUtils/dimensions';
import { drawGrid, drawSolutionHighlights } from './pdfGridDrawer';
import { drawWordList } from './pdfWordList';

export function generatePDF(
  puzzle: PuzzleConfig,
  grid: PuzzleCell[][],
  placedWords: PlacedWord[],
  showSolution: boolean
): jsPDF {
  try {
    // Create PDF with dimensions in inches
    const doc = new jsPDF({
      unit: 'in',
      format: [puzzle.pageSize.width, puzzle.pageSize.height]
    });

    // Calculate dimensions
    const dimensions = calculatePDFDimensions(doc, puzzle, grid);

    // Add title
    doc.setFont(puzzle.font.value);
    doc.setFontSize(puzzle.titleFontSize);
    doc.text(
      puzzle.title + (showSolution ? ' - Solution' : ''),
      dimensions.marginInches,
      dimensions.marginInches
    );

    // Draw grid
    drawGrid(doc, grid, puzzle.fontSize, dimensions);

    // Add solution highlights if needed
    if (showSolution) {
      drawSolutionHighlights(doc, placedWords, dimensions);
    }

    // Add word list
    drawWordList(
      doc,
      puzzle.words,
      puzzle.fontSize,
      dimensions.wordsStartY,
      dimensions.maxGridWidth,
      showSolution,
      puzzle.font.value
    );

    return doc;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}