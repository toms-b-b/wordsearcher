import { jsPDF } from 'jspdf';
import { Direction } from '../../types';
import { WordCoordinates, calculateWordCoordinates } from './coordinates';

const LINE_WIDTH = 0.03; // Increased line width
const OVAL_RATIO = 1.5; // Increased oval height ratio
const STEPS = 36;

interface Point {
  x: number;
  y: number;
}

function generateOvalPoints(
  coords: WordCoordinates,
  cellSize: number,
  direction: Direction,
  isBackwards: boolean
): Point[] {
  const points: Point[] = [];
  
  // Adjust center point based on direction and backwards status
  const center = {
    x: (coords.startX + coords.endX) / 2,
    y: (coords.startY + coords.endY) / 2
  };

  // Calculate width with extra padding
  const width = Math.sqrt(
    Math.pow(coords.endX - coords.startX, 2) +
    Math.pow(coords.endY - coords.startY, 2)
  ) + (cellSize * 0.5); // Increased padding

  // Adjust height based on direction
  const height = cellSize * OVAL_RATIO;

  // Calculate rotation angle based on direction and backwards status
  let angle = Math.atan2(
    coords.endY - coords.startY,
    coords.endX - coords.startX
  );

  // Adjust angle for backwards placement
  if (isBackwards) {
    if (direction === 'vertical') {
      angle += Math.PI;
    } else if (direction === 'diagonal') {
      angle += Math.PI;
    }
  }

  // Generate oval points with adjusted parameters
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * 2 * Math.PI;
    const x = (width / 2) * Math.cos(t);
    const y = (height / 2) * Math.sin(t);
    
    // Apply rotation with direction-specific adjustments
    const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
    const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);
    
    points.push({
      x: center.x + rotatedX,
      y: center.y + rotatedY
    });
  }
  
  return points;
}

function drawOval(doc: jsPDF, points: Point[]): void {
  if (points.length < 2) return;

  doc.setDrawColor(0);
  doc.setLineWidth(LINE_WIDTH);
  doc.setLineCap('round');
  doc.setLineJoin('round');

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
  isBackwards: boolean = false
): void {
  const coords = calculateWordCoordinates(
    startX,
    startY,
    wordLength,
    direction,
    isBackwards,
    cellSize
  );

  const points = generateOvalPoints(coords, cellSize, direction, isBackwards);
  drawOval(doc, points);
}