import JSZip from 'jszip';
import { PuzzleConfig, PuzzleCell, PlacedWord } from '../../types';
import { generatePDF } from '../pdf/generator';

interface PuzzleData {
  config: PuzzleConfig;
  grid: PuzzleCell[][];
  placedWords: PlacedWord[];
}

export async function generateZipFile(puzzles: PuzzleData[]): Promise<Blob> {
  const zip = new JSZip();

  try {
    for (const { config, grid, placedWords } of puzzles) {
      // Generate puzzle and solution PDFs
      const puzzlePDF = generatePDF(config, grid, placedWords, false);
      const solutionPDF = generatePDF(config, grid, placedWords, true);
      
      // Create safe filename
      const safeName = config.title
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
    throw new Error(`Failed to generate puzzle files: ${error.message}`);
  }
}