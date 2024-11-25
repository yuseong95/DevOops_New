import React, { useState } from "react";
import questionsData from "../data/typeTest.json";
import "./css/TypeTest.css";

const TypeTest = () => {
  const [isStart, setIsStart] = useState(true); // true면 start, false이면 test 화면
  const [questionIndex, setQuestionIndex] = useState(0); // 현재 질문 인덱스
  const [typeScores, setTypeScores] = useState(Array(8).fill(0)); // 8개의 유형 점수

  // 시작 버튼 누르면 질문 화면으로
  const handleStartClick = () => {
    setIsStart(false);
  };

  // 다음 질문으로
  const handleNextQuestion = (option) => {
    const selectedScores =
      questionsData.questions[questionIndex].options[option].scores;

    // 점수 업데이트
    // userScores는 비동기 -> 변경된 값을 바로 사용할 수 없어서 로컬 변수 updateScores를 만듦
    const updatedScores = [...typeScores];
    selectedScores.forEach((score) => {
      updatedScores[score - 1] += 1; // 해당 유형에 +1점
    });

    // 최신점수 저장
    setTypeScores(updatedScores);

    // 다음 질문으로
    if (questionIndex < questionsData.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      console.log("최종 점수:", updatedScores); // 최종 점수
    }
  };

  return (
    <div className="typetest-container">
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
              {questionsData.questions[questionIndex].question}
            </p>
            <div className="options-box">
              <button // A 선택지
                className="option-button-A"
                onClick={() => handleNextQuestion("A")}
              >
                {questionsData.questions[questionIndex].options.A.text}
              </button>
              <button // B 선택지
                className="option-button-B"
                onClick={() => handleNextQuestion("B")}
              >
                {questionsData.questions[questionIndex].options.B.text}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeTest;
