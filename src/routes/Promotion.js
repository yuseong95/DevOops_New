import React, { useState } from "react";
import "./css/Promotion.css"; // CSS 파일 분리

const Promotion = () => {
  const [isStart, setIsStart] = useState(true); // start-box 표시

  const handleStartClick = () => {
    setIsStart(false); // start-box 숨기고 test-box 표시
  };

  return (
    <div className="promotion-container">
      {/* 중앙 박스 */}
      <div className="center-box">
        {isStart ? (
          <div className="start-box">
            <p className="start-title">
              나는 어떤 유형의 개발자일까? 어울리는 언어 추천까지!
            </p>
            <button className="test-start-button" onClick={handleStartClick}>
              START
            </button>
          </div>
        ) : (
          <div className="test-box">
            <p className="test-title">
              테스트를 시작합니다! 질문이 여기에 표시됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotion;
