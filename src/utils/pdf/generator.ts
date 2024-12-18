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
  if (!puzzle || !grid || !placedWords) {
    throw new Error('Missing required parameters for PDF generation');
  }

  // Create PDF with correct page size
  const doc = new jsPDF({
    unit: 'in',
    format: [puzzle.pageSize.width, puzzle.pageSize.height],
    orientation: puzzle.pageSize.width > puzzle.pageSize.height ? 'l' : 'p'
  });

  try {
    // Calculate dimensions
    const dimensions = calculatePDFDimensions(doc, puzzle, grid.length);

    // Add title
doc.setFont(puzzle.font.value);
doc.setFontSize(puzzle.titleFontSize);

// Calculate the center of the page
const pageWidth = puzzle.pageSize.width; // Width of the PDF page
const centerX = pageWidth / 2; // X-coordinate for centering the text

// Add centered title
doc.text(
  [
    puzzle.title, // First line: puzzle title
    showSolution ? 'Solution' : '' // Second line: "Solution" or empty string
  ].filter(line => line !== ''), // Remove empty lines if showSolution is false
  centerX, // Center the text horizontally
  dimensions.titleStartY,
  { align: 'center' } // Use 'center' alignment
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
      puzzle.wordBankFontSize,
      dimensions,
      puzzle.font.value
    );

    return doc;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}