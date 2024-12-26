import { PageSize, FontOption, Direction } from '../types';

export const PAGE_SIZES: PageSize[] = [
  { width: 6, height: 9, label: '6" x 9"' },
  { width: 8.5, height: 11, label: '8.5" x 11"' }
];

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Helvetica', value: 'helvetica' },
  { label: 'Times', value: 'times' },
  { label: 'Courier', value: 'courier' },
  { label: 'Arial', value: 'arial' }, 
  { label: 'Georgia', value: 'georgia' }, 
  { label: 'Verdana', value: 'verdana' }
];

export const BASE_DIRECTIONS: Direction[] = ['horizontal', 'vertical', 'diagonal'];

export const MIN_GRID_SIZE = 10;
export const MAX_GRID_SIZE = 25;