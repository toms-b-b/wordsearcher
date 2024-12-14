import { jsPDF } from 'jspdf';
import { BORDER_RADIUS } from './dimensions';

export function drawRoundedRect(
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

export function drawDiagonalHighlight(
  doc: jsPDF,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  cellSize: number
): void {
  doc.setLineCap('round');
  doc.line(
    startX + (cellSize / 2),
    startY + (cellSize / 2),
    endX - (cellSize / 2),
    endY - (cellSize / 2)
  );
}