import React from "react";
import "../../routes/css/ErrorGame.css";

const ErrorGameExplanation = ({
  fileContent,
  userAnswer,
  correctAnswer,
  comment,
  explanationIndex,
  handleNext,
  handleCopy,
}) => {
  // 버튼 텍스트
  const buttonText = explanationIndex < 2 ? "다음" : "랭킹보기";

  return (
    <>
      <pre className="language-java" onCopy={handleCopy} onCut={handleCopy}>
        <code className="language-java">{fileContent}</code>
      </pre>
      <div className="explanation">
        <p>
          <span className="label">나의 답: </span>
          <span className="value">{userAnswer || "-"}</span>
        </p>
        <p>
          <span className="label">정답: </span>
          <span className="value">{correctAnswer}</span>
        </p>
        <p>
          <span className="label">해설: </span>
          <span className="value">{comment}</span>
        </p>
      </div>
      <button className="input-button" onClick={handleNext}>
        {buttonText}
      </button>
    </>
  );
};

export default ErrorGameExplanation;
