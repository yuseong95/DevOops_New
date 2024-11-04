import React from "react";
import "./css/SubmitButton.css";

// 제출 버튼 컴포넌트.
const SubmitButton = ({
  label, // 버튼에 표시될 텍스트
  backgroundColor, // 버튼의 배경색
  color, // 버튼 텍스트 색상
  fontSize = "1em", // 폰트 크기 (기본값: 1em)
  padding = "10px 20px", // 버튼 패딩 (기본값: 10px 20px)
  onClick, // 클릭 시 호출되는 함수
}) => (
  <button
    className="submit-button"
    style={{ backgroundColor, color, fontSize, padding }}
    onClick={onClick}
  >
    {label}
  </button>
);

export default SubmitButton;
