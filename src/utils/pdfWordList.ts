import { jsPDF } from 'jspdf';

export function drawWordList(
  doc: jsPDF,
  words: string[],
  fontSize: number,
  startY: number,
  maxGridWidth: number,
  showSolution: boolean,
  font: string
): void {
  doc.setFont(font);
  doc.setFontSize(fontSize);
  doc.setTextColor(0, 0, 0);

  const wordsPerColumn = Math.ceil(words.length / 3);
  const columnWidth = maxGridWidth / 3;

  words.forEach((word, index) => {
    const column = Math.floor(index / wordsPerColumn);
    const row = index % wordsPerColumn;
    
    doc.text(
      word.toUpperCase(),
      0.5 + (column * columnWidth),
      startY + (row * (fontSize / 72 + 0.2))
    );
  });
}