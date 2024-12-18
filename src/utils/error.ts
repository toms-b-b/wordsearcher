export class PuzzleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PuzzleError';
  }
}

export function handleError(error: unknown): string {
  if (error instanceof PuzzleError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return `An error occurred: ${error.message}`;
  }
  
  return 'An unexpected error occurred';
}