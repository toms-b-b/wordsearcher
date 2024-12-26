export type Direction = 'horizontal' | 'vertical' | 'diagonal';

export interface PlacedWord {
  word: string;
  startX: number;
  startY: number;
  direction: Direction;
  index: number;
  isBackwards: boolean;
}

export interface PuzzleCell {
  letter: string;
  isPartOfWord: boolean;
  position: { x: number; y: number };
  wordIndices: number[];
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

export interface PuzzleConfig {
  title: string;
  words: string[];
  fontSize: number;
  wordBankFontSize: number;
  titleFontSize: number;
  pageSize: PageSize;
  directions: Direction[];
  allowBackwards: boolean;
  gridSize: number;
  font: FontOption;
}