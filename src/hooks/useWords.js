import { useCallback, useEffect, useState } from 'react';

const useWords = () => {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const fetchCodeText = async () => {
      try {
        const dayOfWeek = new Date().getDay();
        const fileName = `/challengeFile/code${
          dayOfWeek === 0 ? 6 : dayOfWeek - 1
        }.txt`;
        const response = await fetch(fileName);
        const text = await response.text();
        const codeLines = text.split('\n').map((line) => line.trim()); // 공백 제거
        setLines(codeLines);
      } catch (error) {
        console.error('Error fetching code file:', error);
        setLines([]);
      }
    };

    fetchCodeText();
  }, []);

  const nextLine = useCallback(() => {
    setCurrentLineIndex((prevIndex) =>
      prevIndex + 1 < lines.length ? prevIndex + 1 : 0
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
