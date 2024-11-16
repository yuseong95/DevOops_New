import React, { forwardRef } from "react";
import "../../routes/css/ErrorGame.css";

// 시작 버튼, 문제 코드
const ErrorGameQuiz = forwardRef(
  ({ showQuiz, fileContent, handleStart, handleCopy }, ref) => {
    return (
      <pre
        className="line-numbers"
        onCopy={handleCopy}
        onCut={handleCopy}
        ref={ref}
      >
        {!showQuiz && (
          <button className="start-button" onClick={handleStart}>
            START
          </button>
        )}
        {showQuiz ? <code className="language-java">{fileContent}</code> : ""}
      </pre>
    );
  }
);

export default ErrorGameQuiz;
