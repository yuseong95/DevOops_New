import React from "react";
import "./css/ErrorGameResult.css";
import { useNavigate } from "react-router-dom";

const ErrorGameResult = ({ count, onShowExplanation }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/"); // 메인페이지로 이동
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>점수:</p>
        <p>맞은 문제: {count}개</p>
        <p>소요 시간:</p>
        <button onClick={onShowExplanation}>해설보기</button>
        <button onClick={goToHome}>메인으로</button>
      </div>
    </div>
  );
};

export default ErrorGameResult;
