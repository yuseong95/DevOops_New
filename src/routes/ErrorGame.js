import React, { useEffect, useState, useRef, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import "./css/ErrorGame.css";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-c.min.js";
import ErrorGameResult from "../components/errorGame/ErrorGameResult";
//import Timer from "../components/Timer";
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

// 오늘의 세트 인덱스 계산 함수
const calculateTodaySetIndex = () => {
  const today = new Date();
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return dayNumber % 7;
};

const ErrorGame = () => {
  const [state, dispatch] = useReducer(reducer, initState);
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

  const preRef = useRef(null); // 문제 스크롤바 제어
  const navigate = useNavigate();

  // 현재날짜에 따라 변하므로 useMemo 사용
  const todaySetIndex = useMemo(() => calculateTodaySetIndex(), []);
  // file이 변경되지 않으면 바뀌지 않으므로 useMemo 사용
  const todayAnswers = useMemo(() => files.map((file) => file.answer), [files]);
  const todayComments = useMemo(
    () => files.map((file) => file.comment),
    [files]
  );

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

        // 오늘의 세트 (3문제) 가져오기
        const startIndex = todaySetIndex * 3;
        const currentSet = data.slice(startIndex, startIndex + 3);

        // 현재 세트 파일들 설정
        setFiles(currentSet);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, [todaySetIndex]);

  // file 내용이 바뀔때마다 코드 하이라이팅
  useEffect(() => {
    Prism.highlightAll();
  }, [fileContent]);

  // 해설 모드가 활성화되고 explanationIndex가 변경될 때마다 load 다시
  useEffect(() => {
    if (explanationMode && files.length > 0) {
      loadFileContent(files[explanationIndex]);
    }
  }, [explanationMode, explanationIndex, files]);

  // 문제풀이 시작, 타이머 시작
  const handleStart = () => {
    dispatch({ type: "START" });
    loadFileContent(files[0]);
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

    dispatch({ type: "RESULT_COUNT", count: correctCount });
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
        dispatch({ type: "NEXT_QUIZ" });
        loadFileContent(files[currentFile + 1]);

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

      if (explanationIndex < 2) {
        dispatch({ type: "NEXT_EXPLANATION" });
        loadFileContent(files[explanationIndex + 1]);
      } else {
        // 마지막 해설을 본 후 "메인으로" 버튼을 누르면 메인 페이지로 이동
        goToHome();
      }
    }
  };

  // user의 답 업데이트
  const handleAnswerUpdate = (event) => {
    dispatch({ type: "UPDATE_ANSWER", answer: event.target.value });
  };

  // 해설 모드로 바꾸기
  const handleExplanationMode = () => {
    dispatch({ type: "EXPLANATION_MODE" });
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
            handleCopy={handleCopy}
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
          handleCopy={handleCopy}
        />
      )}

      {/* 결과 모달창 */}
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
