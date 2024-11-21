import React from "react";
import "../css/ErrorGameResult.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateErrorGameScore } from "../../redux/userActions";

const ErrorGameResult = ({ count, onShowExplanation, runningTime }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatTime = (time) => {
    const minutes = String(Math.floor((time / 60000) % 60));
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    const milliseconds = String((time % 1000) / 10).padStart(2, "0");
    return `${minutes}분 ${seconds}초 ${milliseconds}`;
  };

  // score 계산 함수
  const calculateScore = () => {
    const maxTime = 600000; // 기준 10분(ms단위)
    const score = ((maxTime - runningTime) * count) / 1000;
    return Math.max(0, score); // 최소 점수는 0
  };

  const handleSaveScore = () => {
    const finalScore = calculateScore();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); // 현재 로그인된 사용자 정보

    if (loggedInUser) {
      dispatch(updateErrorGameScore(loggedInUser.id, finalScore)); // Redux 액션 호출
      //console.log(finalScore);
    } else {
      console.error("로그인된 사용자 정보를 찾을 수 없습니다.");
    }
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
          <button
            className="result-button"
            onClick={() => {
              handleSaveScore();
              onShowExplanation();
            }}
          >
            해설보기
          </button>
          <button
            className="result-button"
            onClick={() => {
              handleSaveScore();
              navigate("/ranking");
            }}
          >
            랭킹보기
          </button>
        </p>
      </div>
    </div>
  );
};

export default ErrorGameResult;
