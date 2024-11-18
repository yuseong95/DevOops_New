import { useState, useEffect } from "react";

export const useErrorGameFiles = (todaySetIndex) => {
  const [files, setFiles] = useState([]); // 오늘의 3문제 배열
  const [fileContent, setFileContent] = useState("READY"); // 문제 파일의 내용

  // 문제 파일 목록 가져오기
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("errorGameFile/errorGame.json");
        if (!response.ok) throw new Error("File fetch error.");

        const data = await response.json();
        const startIndex = todaySetIndex * 3;
        setFiles(data.slice(startIndex, startIndex + 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, [todaySetIndex]);

  const loadFileContent = async (file) => {
    try {
      const response = await fetch(`errorGameFile/${file.fileName}`);
      if (!response.ok) throw new Error("File fetch error.");
      setFileContent(await response.text());
    } catch (error) {
      console.error(error);
    }
  };

  return { files, fileContent, loadFileContent };
};
