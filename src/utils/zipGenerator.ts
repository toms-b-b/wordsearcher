import JSZip from 'jszip';
import { PuzzleConfig } from '../types';
import { generatePDF } from './pdfGenerator';
import { generatePuzzle } from './puzzleGenerator';

export async function generateZipFile(puzzles: PuzzleConfig[]): Promise<Blob> {
  const zip = new JSZip();

  try {
    for (const puzzle of puzzles) {
      // Generate puzzle and solution
      const { grid, placedWords } = generatePuzzle(puzzle);
      
      // Generate PDFs
      const puzzlePDF = generatePDF(puzzle, grid, placedWords, false);
      const solutionPDF = generatePDF(puzzle, grid, placedWords, true);
      
      // Create safe filename
      const safeName = puzzle.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
      
      // Add files to zip
      zip.file(
        `puzzle_${safeName}.pdf`,
        puzzlePDF.output('arraybuffer')
      );
      zip.file(
        `solution_${safeName}.pdf`,
        solutionPDF.output('arraybuffer')
      );
    }

    return await zip.generateAsync({ type: 'blob' });
  } catch (error) {
    console.error('Error generating ZIP file:', error);
    throw new Error('Failed to generate puzzle files');
  }
}