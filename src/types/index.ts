export interface PuzzleConfig {
  title: string;
  words: string[];
  fontSize: number;
  titleFontSize: number;
  pageSize: PageSize;
  directions: Direction[];
  gridSize: number;
  font: FontOption;
}

export interface PageSize {
  width: number;
  height: number;
  label: string;
}

export interface FontOption {
  label: string;
  value: string;
}

export type Direction = 'horizontal' | 'vertical' | 'diagonal';

export interface PuzzleCell {
  letter: string;
  isPartOfWord: boolean;
  position: { x: number; y: number };
  wordIndices: number[];
}

export interface PlacedWord {
  word: string;
  startX: number;
  startY: number;
  direction: Direction;
  index: number;
}