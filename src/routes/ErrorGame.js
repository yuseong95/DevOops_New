import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import "./css/ErrorGame.css";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-c.min.js";

const ErrorGame = () => {
  const [files, setFiles] = useState([]); // 오늘의 3문제 배열
  const [, /*currentSetIndex*/ setCurrentSetIndex] = useState(0); // 문제 세트의 인덱스(0~6개 3문제씩 총 21문제)
  const [currentFile, setCurrentFile] = useState(0); // 현재 보여지는 문제의 인덱스(0,1,2)
  const [fileContent, setFileContent] = useState(""); // 문제 파일의 내용
  const [userAnswers, setUserAnswers] = useState(["", "", ""]); // user가 입력한 3문제의 답
  const [answers, setAnswers] = useState([]); // 실제 3문제의 답
  const preRef = useRef(null); // 문제 스크롤바 제어

  // 문제 파일 목록 가져오기
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("errorGameFile/errorGame.json");
        if (!response.ok) {
          throw new Error("File fetch error.");
        }

        const data = await response.json();
        setFiles(data);

        // 오늘의 세트 인덱스 계산
        const todaySetIndex = calculateTodaySetIndex();
        setCurrentSetIndex(todaySetIndex);

        // 오늘의 세트 (3문제) 가져오기
        const startIndex = todaySetIndex * 3;
        const currentSet = data.slice(startIndex, startIndex + 3);

        // 현재 세트 파일들 설정
        setFiles(currentSet);

        // 세트의 정답들 설정
        const todaysAnswers = currentSet.map((file) => file.answer);
        setAnswers(todaysAnswers);

        // 세트의 첫 문제 가져오기
        loadFileContent(currentSet[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  // file 내용이 바뀔때마다 코드 하이라이팅
  useEffect(() => {
    Prism.highlightAll();
  }, [fileContent]);

  // 복사 이벤트 방지
  const handleCopy = (event) => {
    event.preventDefault();
    alert("복사는 불가능합니다.");
  };

  const calculateTodaySetIndex = () => {
    const today = new Date();
    const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    return dayNumber % 7;
  };

  const loadFileContent = async (file) => {
    try {
      // 해당 파일 불러오기
      const response = await fetch(`errorGameFile/${file.fileName}`);
      if (!response.ok) {
        throw new Error("File fetch error.");
      }

      const text = await response.text();
      setFileContent(text);

      // 정답 배열에 오늘의 3문제 정답 저장
      setAnswers((prevAnswers) => [...prevAnswers, file.answer]);
    } catch (error) {
      console.error(error);
    }
  };

  // user와 실제 정답 비교 함수
  const checkAnswers = () => {
    const correctCount = userAnswers.reduce(
      (count, answer, index) =>
        answer.trim() === answers[index] ? count + 1 : count,
      0
    );
    alert(`맞은 문제: ${correctCount}개`);
  };

  // "다음" 또는 "제출" 버튼 클릭 핸들러
  const handleNext = () => {
    // 마지막 문제가 아니라면 다음 문제 불러오기
    if (currentFile < 2) {
      const nextIndex = currentFile + 1;
      setCurrentFile(nextIndex);
      loadFileContent(files[nextIndex]);

      // <pre> 스크롤바 맨 위로
      if (preRef.current) {
        preRef.current.scrollTop = 0;
      }
    } else {
      // 마지막 문제이면 정답 확인
      checkAnswers();
    }
  };

  // user의 답 업데이트
  const handleAnswerUpdate = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentFile] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  return (
    <div className="errorGame">
      <div className="top">
        <div className="title">오류/오타가 있는 라인의 숫자를 입력하세요.</div>
        <div className="timer">타이머</div>
      </div>
      <pre
        className="language-java"
        onCopy={handleCopy}
        onCut={handleCopy}
        ref={preRef}
      >
        <code className="language-java">{fileContent}</code>
      </pre>
      <div className="input">
        <input
          type="text"
          className="input-field"
          placeholder="Line Number"
          value={userAnswers[currentFile]}
          onChange={handleAnswerUpdate}
        />
        <button className="input-button" onClick={handleNext}>
          {currentFile < 2 ? "다음" : "제출"}
        </button>
      </div>
    </div>
  );
};

export default ErrorGame;
