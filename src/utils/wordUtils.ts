export function findLongestWordLength(words: string[]): number {
  return Math.max(...words.map(word => word.trim().length), 0);
}