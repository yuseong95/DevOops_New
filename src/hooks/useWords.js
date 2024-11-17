// useWords.js
import { useCallback, useEffect, useState } from 'react';

const useWords = () => {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const fetchCodeText = async () => {
      try {
        const response = await fetch('/challengeFile/code.txt');
        const text = await response.text();
        const codeLines = text.split('\n');
        setLines(codeLines);
      } catch (error) {
        console.error('Error fetching code.txt:', error);
        setLines([]);
      }
    };

    fetchCodeText();
  }, []);

  const nextLine = useCallback(() => {
    setCurrentLineIndex(
      (prevIndex) => (prevIndex + 1 < lines.length ? prevIndex + 1 : 0) // 마지막 줄이면 처음으로
    );
  }, [lines.length]);

  const resetLines = useCallback(() => {
    setCurrentLineIndex(0);
  }, []);

  const currentLine = lines[currentLineIndex] || '';
  const nextLineText = lines[(currentLineIndex + 1) % lines.length] || '';

  return { currentLine, nextLineText, nextLine, resetLines };
};

export default useWords;
