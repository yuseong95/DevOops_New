import React, { forwardRef } from "react";

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
            시작
          </button>
        )}
        {showQuiz ? (
          <code className="language-java">{fileContent}</code>
        ) : (
          "READY?"
        )}
      </pre>
    );
  }
);

export default ErrorGameQuiz;
