import { jsPDF } from 'jspdf';
import { Direction } from '../../types';

const LINE_WIDTH = 0.02; // inches
const OVAL_RATIO = 1.2; // ratio of cell size for oval height
const STEPS = 36; // number of steps to approximate the oval

interface Point {
  x: number;
  y: number;
}

function generateOvalPoints(
  center: Point,
  width: number,
  height: number,
  rotation: number = 0,
): Point[] {
  const points: Point[] = [];
  
  for (let i = 0; i <= STEPS; i += 1) {
    const angle = (i / STEPS) * 2 * Math.PI;
    const x = (width / 2) * Math.cos(angle);
    const y = (height / 2) * Math.sin(angle);
    
    // Apply rotation
    const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation);
    const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation);
    
    points.push({
      x: center.x + rotatedX,
      y: center.y + rotatedY,
    });
  }
  
  return points;
}

function drawOval(
  doc: jsPDF,
  points: Point[],
): void {
  if (points.length < 2) return;

  const segments = points.slice(1).map((point, index) => {
    const prev = points[index];
    return [point.x - prev.x, point.y - prev.y];
  });

  doc.lines(segments, points[0].x, points[0].y);
}

export function drawWordHighlight(
  doc: jsPDF,
  startX: number,
  startY: number,
  wordLength: number,
  cellSize: number,
  direction: Direction,
): void {
  doc.setDrawColor(0);
  doc.setLineWidth(LINE_WIDTH);
  doc.setLineCap('round');
  doc.setLineJoin('round');

  const totalLength = wordLength * cellSize;

  switch (direction) {
    case 'horizontal': {
      const center = {
        x: startX + (totalLength / 2),
        y: startY + (cellSize / 2),
      };
      const width = totalLength + (cellSize * 0.2);
      const height = cellSize * OVAL_RATIO;
      const points = generateOvalPoints(center, width, height);
      drawOval(doc, points);
      break;
    }
    case 'vertical': {
      const center = {
        x: startX + (cellSize / 2),
        y: startY + (totalLength / 2),
      };
      const width = cellSize * OVAL_RATIO;
      const height = totalLength + (cellSize * 0.2);
      const points = generateOvalPoints(center, width, height);
      drawOval(doc, points);
      break;
    }
    case 'diagonal': {
      const angle = Math.PI / 4; // 45 degrees
      const diagonalLength = Math.sqrt(2) * totalLength;
      const center = {
        x: startX + (totalLength / 2),
        y: startY + (totalLength / 2),
      };
      const width = diagonalLength + (cellSize * 0.2);
      const height = cellSize * OVAL_RATIO;
      const points = generateOvalPoints(center, width, height, angle);
      drawOval(doc, points);
      break;
    }
    default:
      break;
  }
}