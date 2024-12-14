import React from 'react';

interface WordListProps {
  words: string[];
  fontSize: number;
  font: string;
}

export function WordList({ words, fontSize, font }: WordListProps) {
  return (
    <div 
      className="mt-4 grid grid-cols-3 gap-2" 
      style={{ 
        fontSize: `${fontSize}px`,
        fontFamily: font
      }}
    >
      {words.map((word, index) => (
        <div key={index} className="px-2 py-1">
          {word.toUpperCase()}
        </div>
      ))}
    </div>
  );
}