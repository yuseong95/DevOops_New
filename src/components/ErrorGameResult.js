import React from "react";
import "./css/ErrorGameResult.css";
import { useNavigate } from "react-router-dom";

const ErrorGameResult = ({ count, onShowExplanation, runningTime }) => {
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>점수:</p>
        <p>맞은 문제: {count}개</p>
        <p>시간: {formatTime(runningTime)}</p>
        <button onClick={onShowExplanation}>해설보기</button>
        <button onClick={goToHome}>메인으로</button>
      </div>
    </div>
  );
};

export default ErrorGameResult;
