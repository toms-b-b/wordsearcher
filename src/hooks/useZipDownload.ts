import { useState } from 'react';
import { PuzzleConfig } from '../types';
import { generateZipFile } from '../utils/zip/generator';

export function useZipDownload() {
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (puzzles: PuzzleConfig[]) => {
    if (!puzzles || puzzles.length === 0) {
      setError('No puzzles available to download');
      return;
    }

    try {
      const zipBlob = await generateZipFile(puzzles);
      
      // Create and trigger download
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'word-search-puzzles.zip';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Error downloading puzzles: ${errorMessage}`);
      console.error('Download error:', error);
    }
  };

  return { handleDownload, error };
}