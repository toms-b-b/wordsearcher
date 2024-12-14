import { jsPDF } from 'jspdf';

export const MARGIN = 40;
export const CELL_PADDING = 2;

export const WORD_COLORS = [
  '#FFD700', // Gold
  '#FF69B4', // Hot Pink
  '#98FB98', // Pale Green
  '#87CEEB', // Sky Blue
  '#DDA0DD', // Plum
  '#F0E68C', // Khaki
  '#E6E6FA', // Lavender
  '#FFA07A', // Light Salmon
  '#00CED1', // Dark Turquoise
  '#FFA500', // Orange
];

export function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function setColor(doc: jsPDF, color: string) {
  const { r, g, b } = hexToRgb(color);
  doc.setFillColor(r, g, b);
  doc.setDrawColor(r, g, b);
}

export function setTextColor(doc: jsPDF, color: string) {
  const { r, g, b } = hexToRgb(color);
  doc.setTextColor(r, g, b);
}