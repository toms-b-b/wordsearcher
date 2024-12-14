import { PageSize, FontOption } from '../types';

export const PAGE_SIZES: PageSize[] = [
  { width: 6, height: 9, label: '6" x 9"' },
  { width: 8.5, height: 11, label: '8.5" x 11"' }
];

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Helvetica', value: 'helvetica' },
  { label: 'Times', value: 'times' },
  { label: 'Courier', value: 'courier' }
];

export const DIRECTIONS = ['horizontal', 'vertical', 'diagonal'] as const;

export const MIN_GRID_SIZE = 10;
export const MAX_GRID_SIZE = 20;