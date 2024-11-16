import React from "react";
import "../../routes/css/ErrorGame.css";

// 답 입력, 제출 버튼
const ErrorGameInput = ({
  showQuiz,
  currentFile,
  userAnswer,
  handleAnswerUpdate,
  handleNext,
}) => {
  return (
    <div className="input-field">
      <input
        type="text"
        className="input-answer"
        placeholder="Line"
        value={userAnswer}
        onChange={handleAnswerUpdate}
        disabled={!showQuiz}
      />
      <button
        className="input-button"
        onClick={handleNext}
        disabled={!showQuiz}
      >
        {currentFile < 2 ? "다음" : "제출"}
      </button>
    </div>
  );
};

export default ErrorGameInput;
