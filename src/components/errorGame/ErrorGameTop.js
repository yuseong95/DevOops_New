import React from "react";
import Timer from "./Timer.js";
import "../../routes/css/ErrorGame.css";

// 문제 설명, 타이머
const ErrorGameTop = ({ showQuiz, resultCount, handleTimer }) => {
  return (
    <div className="top">
      <div className="top-title">
        오류/오타가 있는 라인의 숫자를 입력하세요. (10분 초과시 0점)
      </div>
      <div className="timer">
        <Timer
          onStart={showQuiz && resultCount === null}
          onStop={handleTimer}
        />
      </div>
    </div>
  );
};

export default ErrorGameTop;
