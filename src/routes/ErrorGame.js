import React, { useEffect, useState, useRef, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import "./css/ErrorGame.css";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-c.min.js";
import ErrorGameResult from "../components/errorGame/ErrorGameResult";
import ErrorGameTop from "../components/errorGame/ErrorGameTop";
import ErrorGameQuiz from "../components/errorGame/ErrorGameQuiz";
import ErrorGameInput from "../components/errorGame/ErrorGameInput";
import ErrorGameExplanation from "../components/errorGame/ErrorGameExplanation";

// 초기 상태
const initState = {
  showQuiz: false, // 문제 보이기
  currentFile: 0, // 현재 보여지는 문제의 인덱스(0,1,2)
  explanationMode: false, // 해설 모드 (초기값 false)
  explanationIndex: 0, // 현재 보여지는 해설의 인덱스(0,1,2)
  userAnswers: ["", "", ""], // user가 입력한 3문제의 답
  resultCount: null, // 맞은 문제 수
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START": // 게임 시작
      return { ...state, showQuiz: true, currentFile: 0 };
    case "RESULT_COUNT": // 맞을 결과 저장
      return { ...state, resultCount: action.count };
    case "NEXT_QUIZ": // 다음 문제
      return { ...state, currentFile: state.currentFile + 1 };
    case "EXPLANATION_MODE": // 해설 모드
      return { ...state, explanationMode: true, explanationIndex: 0 };
    case "NEXT_EXPLANATION": // 다음 해설
      return { ...state, explanationIndex: state.explanationIndex + 1 };
    case "UPDATE_ANSWER": // 사용자 답 업데이트
      const updatedAnswers = [...state.userAnswers];
      updatedAnswers[state.currentFile] = action.answer;
      return { ...state, userAnswers: updatedAnswers };
    default:
      return state;
  }
};

const calculateTodaySetIndex = () => {
  const today = new Date();
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return dayNumber % 7;
};

const ErrorGame = () => {
  const [state, dispatchLocal] = useReducer(reducer, initState);
  const {
    showQuiz,
    currentFile,
    explanationMode,
    explanationIndex,
    userAnswers,
    resultCount,
  } = state;

  const [files, setFiles] = useState([]); // 오늘의 3문제 배열
  const [fileContent, setFileContent] = useState("READY"); // 문제 파일의 내용
  const [time, setTime] = useState(null); // 소요 시간

  const preRef = useRef(null);
  const navigate = useNavigate();

  const todaySetIndex = useMemo(() => calculateTodaySetIndex(), []);
  const todayAnswers = useMemo(() => files.map((file) => file.answer), [files]);
  const todayComments = useMemo(
    () => files.map((file) => file.comment),
    [files]
  );

  useEffect(() => {
    // 비로그인 상태라면 로그인 페이지로 이동
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  // 문제 파일 목록 가져오기
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("errorGameFile/errorGame.json");
        if (!response.ok) {
          throw new Error("File fetch error.");
        }

        const data = await response.json();
        const startIndex = todaySetIndex * 3;
        const currentSet = data.slice(startIndex, startIndex + 3);
        setFiles(currentSet);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, [todaySetIndex]);

  useEffect(() => {
    Prism.highlightAll();
  }, [fileContent]);

  useEffect(() => {
    if (explanationMode && files.length > 0) {
      loadFileContent(files[explanationIndex]);
    }
  }, [explanationMode, explanationIndex, files]);

  const handleStart = () => {
    dispatchLocal({ type: "START" });
    loadFileContent(files[0]);
  };

  const loadFileContent = async (file) => {
    try {
      const response = await fetch(`errorGameFile/${file.fileName}`);
      if (!response.ok) {
        throw new Error("File fetch error.");
      }

      const text = await response.text();
      setFileContent(text);
    } catch (error) {
      console.error(error);
    }
  };

  // user와 실제 정답 비교 함수
  const checkAnswers = () => {
    const correctCount = userAnswers.reduce(
      (count, answer, index) =>
        answer.trim() === todayAnswers[index] ? count + 1 : count,
      0
    );

    dispatchLocal({ type: "RESULT_COUNT", count: correctCount });
  };

  const handleNext = () => {
    if (!explanationMode) {
      if (currentFile < 2) {
        dispatchLocal({ type: "NEXT_QUIZ" });
        loadFileContent(files[currentFile + 1]);

        if (preRef.current) {
          preRef.current.scrollTop = 0;
        }
      } else {
        checkAnswers();
      }
    } else {
      if (explanationIndex < 2) {
        dispatchLocal({ type: "NEXT_EXPLANATION" });
        loadFileContent(files[explanationIndex + 1]);
      } else {
        navigate("/ranking");
      }
    }
  };

  const handleAnswerUpdate = (event) => {
    dispatchLocal({ type: "UPDATE_ANSWER", answer: event.target.value });
  };

  const handleExplanationMode = () => {
    dispatchLocal({ type: "EXPLANATION_MODE" });
  };

  const handleTimer = (time) => {
    setTime(time);
  };

  return (
    <div className="errorGame">
      <ErrorGameTop
        showQuiz={showQuiz}
        resultCount={resultCount}
        handleTimer={handleTimer}
      />
      {!explanationMode ? (
        <>
          <ErrorGameQuiz
            showQuiz={showQuiz}
            fileContent={fileContent}
            handleStart={handleStart}
            ref={preRef}
          />
          <ErrorGameInput
            showQuiz={showQuiz}
            currentFile={currentFile}
            userAnswer={userAnswers[currentFile]}
            handleAnswerUpdate={handleAnswerUpdate}
            handleNext={handleNext}
          />
        </>
      ) : (
        <ErrorGameExplanation
          fileContent={fileContent}
          userAnswer={userAnswers[explanationIndex]}
          correctAnswer={todayAnswers[explanationIndex]}
          comment={todayComments[explanationIndex]}
          explanationIndex={explanationIndex}
          handleNext={handleNext}
        />
      )}

      {resultCount !== null && !explanationMode && (
        <ErrorGameResult
          count={resultCount}
          onShowExplanation={handleExplanationMode}
          runningTime={time}
        />
      )}
    </div>
  );
};

export default ErrorGame;
