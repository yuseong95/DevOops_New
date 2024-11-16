import React from "react";
import "../css/ErrorGameResult.css";
import { useNavigate } from "react-router-dom";

const ErrorGameResult = ({ count, onShowExplanation, runningTime }) => {
  const maxTime = 600000; // 기준 10분(ms단위)
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/"); // 메인페이지로 이동
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor((time / 60000) % 60));
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    const milliseconds = String((time % 1000) / 10).padStart(2, "0");
    return `${minutes}분 ${seconds}초 ${milliseconds}`;
  };

  // score 계산 함수
  const calculateScore = () => {
    const score = ((maxTime - runningTime) * count) / 1000;
    return Math.max(0, score); // 최소 점수는 0
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="result-text">
          <span className="label">SCORE: </span>
          <span className="value">{calculateScore()}</span>
        </p>
        <p className="result-text">
          <span className="label">ANSWER: </span>
          <span className="value">{count} / 3</span>
        </p>
        <p className="result-text">
          <span className="label">TIME: </span>
          <span className="value">{formatTime(runningTime)}</span>
        </p>
        <p>
          <button className="result-button" onClick={onShowExplanation}>
            해설보기
          </button>
          <button className="result-button" onClick={goToHome}>
            메인으로
          </button>
        </p>
      </div>
    </div>
  );
};

export default ErrorGameResult;
