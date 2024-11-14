import React from "react";

const ErrorGameExplanation = ({
  fileContent,
  userAnswer,
  correctAnswer,
  comment,
  explanationIndex,
  handleNext,
  handleCopy,
}) => {
  return (
    <>
      <pre className="language-java" onCopy={handleCopy} onCut={handleCopy}>
        <code className="language-java">{fileContent}</code>
      </pre>
      <div className="explanation">
        <p>내 답안: {userAnswer}</p>
        <p>정답: {correctAnswer}</p>
        <p>해설: {comment}</p>
      </div>
      <button className="input-button" onClick={handleNext}>
        {explanationIndex < 2 ? "다음" : "메인으로"}
      </button>
    </>
  );
};

export default ErrorGameExplanation;
