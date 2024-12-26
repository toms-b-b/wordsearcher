import { Direction } from '../../types';

export interface WordCoordinates {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function calculateWordCoordinates(
  startX: number,
  startY: number,
  wordLength: number,
  direction: Direction,
  isBackwards: boolean,
  cellSize: number
): WordCoordinates {
  // Adjust starting positions to cell centers
  const adjustedStartX = startX + (cellSize / 2);
  const adjustedStartY = startY + (cellSize / 2);
  
  let endX: number, endY: number;
  const length = (wordLength - 1) * cellSize;

  switch (direction) {
    case 'horizontal':
      if (isBackwards) {
        endX = adjustedStartX - length;
        endY = adjustedStartY;
      } else {
        endX = adjustedStartX + length;
        endY = adjustedStartY;
      }
      break;
    case 'vertical':
      if (isBackwards) {
        endX = adjustedStartX;
        endY = adjustedStartY - length;
      } else {
        endX = adjustedStartX;
        endY = adjustedStartY + length;
      }
      break;
    case 'diagonal':
      if (isBackwards) {
        endX = adjustedStartX - length;
        endY = adjustedStartY - length;
      } else {
        endX = adjustedStartX + length;
        endY = adjustedStartY + length;
      }
      break;
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }

  return { 
    startX: adjustedStartX, 
    startY: adjustedStartY, 
    endX, 
    endY 
  };
}