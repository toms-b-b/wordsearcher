import JSZip from 'jszip';
import { PuzzleConfig } from '../../types';
import { generatePuzzle } from '../puzzleGenerator';
import { generatePDF } from '../pdf/generator';

export async function generateZipFile(puzzles: PuzzleConfig[]): Promise<Blob> {
  if (!puzzles || puzzles.length === 0) {
    throw new Error('No puzzles provided for ZIP generation');
  }

  const zip = new JSZip();

  try {
    for (const puzzle of puzzles) {
      // Generate puzzle grid and placed words
      const { grid, placedWords } = generatePuzzle(puzzle);
      
      // Generate puzzle and solution PDFs
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
    throw new Error(`Failed to generate ZIP file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}