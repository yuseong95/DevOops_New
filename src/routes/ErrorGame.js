import React, { useEffect, useState, useRef, useMemo, useReducer } from "react";
import { reducer, initState } from "../hooks/useReducer";
import { calculateTodaySetIndex } from "../utils/todaySet";
import { useErrorGameFiles } from "../hooks/useErrorGameFiles";
import { useNavigate } from "react-router-dom";
//import { syncUsers } from "../redux/userActions";
import store from "../redux/store";
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
import ErrorGameRank from "../components/ErrorGameRank";

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

  const todaySetIndex = useMemo(() => calculateTodaySetIndex(), []);
  const { files, fileContent, loadFileContent } =
    useErrorGameFiles(todaySetIndex);

  const [time, setTime] = useState(null); // 소요 시간

  const preRef = useRef(null);
  const navigate = useNavigate();

  const todayAnswers = useMemo(() => files.map((file) => file.answer), [files]);
  const todayComments = useMemo(
    () => files.map((file) => file.comment),
    [files]
  );

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // 비로그인 상태라면 로그인 페이지로 이동
    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const reduxState = store.getState(); // Redux 상태 가져오기
    const currentUser = reduxState.users.find(
      (user) => user.id === loggedInUser.id
    );

    if (currentUser?.errorGameScore !== -1) {
      console.log("사용자는 이미 게임을 완료했습니다.");
      dispatchLocal({ type: "EXPLANATION_MODE" });
    }
  }, [navigate]);

  useEffect(() => {
    Prism.highlightAll();
  }, [fileContent]);

  useEffect(() => {
    if (explanationMode && files.length > 0) {
      loadFileContent(files[explanationIndex]);
    }
  }, [explanationMode, explanationIndex, files, loadFileContent]);

  const handleStart = () => {
    dispatchLocal({ type: "START" });
    loadFileContent(files[0]);
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

      <ErrorGameRank />
    </div>
  );
};

export default ErrorGame;
