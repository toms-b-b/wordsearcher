import { jsPDF } from 'jspdf';
import { PDFDimensions } from './dimensions';

export function drawWordList(
  doc: jsPDF,
  words: string[],
  fontSize: number,
  dimensions: PDFDimensions,
  font: string
): void {
  try {
    doc.setFont(font);
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);

    const wordsPerColumn = Math.ceil(words.length / 3);
    const columnWidth = dimensions.maxGridWidth / 3;
    const lineHeight = fontSize / 72 + 0.1; // Add some padding between lines

    words.forEach((word, index) => {
      const column = Math.floor(index / wordsPerColumn);
      const row = index % wordsPerColumn;
      
      const x = dimensions.marginInches + (column * columnWidth);
      const y = dimensions.wordsStartY + (row * lineHeight);
      
      // Check if word will fit on page, if not start new column
      if (y + lineHeight > dimensions.pageHeight - dimensions.marginInches) {
        return; // Skip words that won't fit
      }
      
      doc.text(
        word.toUpperCase(),
        x,
        y
      );
    });
  } catch (error) {
    console.error('Error drawing word list:', error);
    throw new Error('Failed to draw word list');
  }
}