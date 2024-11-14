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
        <p>SCORE: {calculateScore()}</p>
        <p>ANSWER: {count} / 3</p>
        <p>TIME: {formatTime(runningTime)}</p>
        <button onClick={onShowExplanation}>해설보기</button>
        <button onClick={goToHome}>메인으로</button>
      </div>
    </div>
  );
};

export default ErrorGameResult;
