import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import "./css/ErrorGame.css";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-c.min.js";
import ErrorGameResult from "../components/ErrorGameResult";
//import Timer from "../components/Timer";

const ErrorGame = () => {
  const [files, setFiles] = useState([]); // 오늘의 3문제 배열
  const [, /*currentSetIndex*/ setCurrentSetIndex] = useState(0); // 문제 세트의 인덱스(0~6개 3문제씩 총 21문제)
  const [currentFile, setCurrentFile] = useState(0); // 현재 보여지는 문제의 인덱스(0,1,2)
  const [fileContent, setFileContent] = useState(""); // 문제 파일의 내용
  const [userAnswers, setUserAnswers] = useState(["", "", ""]); // user가 입력한 3문제의 답
  const [answers, setAnswers] = useState([]); // 실제 3문제의 답
  const [comments, setComments] = useState([]); // 문제 해설

  const [resultCount, setResultCount] = useState(null); // 맞은 문제 수
  const [explanationMode, setExplanationMode] = useState(false); // 해설 모드 (초기값 false)
  const [explanationIndex, setExplanationIndex] = useState(0); // 현재 보여지는 해설의 인덱스(0,1,2)
  const preRef = useRef(null); // 문제 스크롤바 제어
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/"); // 메인페이지로 이동
  };

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

        // 세트의 정답, 해설들 설정
        const todayAnswers = currentSet.map((file) => file.answer);
        const todayComments = currentSet.map((file) => file.comment);
        setAnswers(todayAnswers);
        setComments(todayComments);

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
      //setAnswers((prevAnswers) => [...prevAnswers, file.answer]);
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

    //alert(`맞은 문제: ${correctCount}개`);
    setResultCount(correctCount);
  };

  // 복사 이벤트 방지
  const handleCopy = (event) => {
    event.preventDefault();
    alert("복사는 불가능합니다.");
  };

  // "다음" 또는 "제출" 버튼 클릭 핸들러
  const handleNext = () => {
    // 문제풀이 모드일 경우
    if (!explanationMode) {
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
    } else {
      // 해설 모드일 경우

      // 해설 모드
      if (explanationIndex < 2) {
        setExplanationIndex((prevIndex) => prevIndex + 1);
        loadFileContent(files[explanationIndex + 1]);

        // <pre> 스크롤바 맨 위로
        if (preRef.current) {
          preRef.current.scrollTop = 0;
        }
      } else {
        // 마지막 해설을 본 후 "메인으로" 버튼을 누르면 메인 페이지로 이동
        goToHome();
      }
    }
  };

  // user의 답 업데이트
  const handleAnswerUpdate = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentFile] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  // 해설 모드로 바꾸기
  const handleExplanationMode = () => {
    setExplanationMode(true);
    setExplanationIndex(0);
  };

  return (
    <div className="errorGame">
      <div className="top">
        <div className="title">오류/오타가 있는 라인의 숫자를 입력하세요.</div>
        <div className="timer">{/* <Timer /> */}</div>
      </div>
      {!explanationMode && (
        <>
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
            <button
              className="input-button"
              onClick={handleNext}
              count={resultCount}
            >
              {currentFile < 2 ? "다음" : "제출"}
            </button>
          </div>
        </>
      )}

      {/* 결과 모달창 */}
      {resultCount !== null && !explanationMode && (
        <ErrorGameResult
          count={resultCount}
          onShowExplanation={handleExplanationMode}
        />
      )}

      {/* 해설 보기 모드 */}
      {explanationMode && (
        <>
          <pre
            className="language-java"
            onCopy={handleCopy}
            onCut={handleCopy}
            ref={preRef}
          >
            <code className="language-java">{fileContent}</code>
          </pre>

          <div className="explanation">
            <p>내 답안: {userAnswers[explanationIndex]}</p>
            <p>정답: {answers[explanationIndex]}</p>
            <p>해설: {comments[explanationIndex]}</p>
          </div>
          <button className="input-button" onClick={handleNext}>
            {explanationIndex < 2 ? "다음" : "메인으로"}
          </button>
        </>
      )}
    </div>
  );
};

export default ErrorGame;
