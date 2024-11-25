import React, { useState } from "react";
import data from "../data/typeTest.json";
import "./css/TypeTest.css";

const TypeTest = () => {
  const [isStart, setIsStart] = useState(true); // true면 시작 화면, false면 질문 화면
  const [questionIndex, setQuestionIndex] = useState(0); // 현재 질문 인덱스
  const [typeScores, setTypeScores] = useState(Array(8).fill(0)); // 8개의 유형 점수
  const [result, setResult] = useState(null); // 최종 결과

  // 시작 버튼 클릭 -> 질문 화면으로 전환
  const handleStartClick = () => {
    setIsStart(false);
  };

  // 다음 질문으로 이동
  const handleNextQuestion = (option) => {
    const selectedScores = data.questions[questionIndex].options[option].scores;

    // 점수 업데이트
    // userScores는 비동기 -> 변경된 값을 바로 사용할 수 없어서 로컬 변수 updateScores를 만듦
    const updatedScores = [...typeScores];
    selectedScores.forEach((score) => {
      updatedScores[score - 1] += 1; // 해당 유형에 점수 추가
    });

    setTypeScores(updatedScores); // 최신 점수 저장

    // 마지막 질문인지 확인
    if (questionIndex < data.questions.length - 1) {
      setQuestionIndex(questionIndex + 1); // 다음 질문으로 이동
    } else {
      calculateResult(updatedScores); // 최종 결과 계산
      console.log("최종 점수:", updatedScores);
    }
  };

  // 최종 결과 계산 및 유형 매칭
  const calculateResult = (updatedScores) => {
    const maxScore = Math.max(...updatedScores); // 최고 점수 찾기
    const maxIndexes = updatedScores
      .map((score, index) => (score === maxScore ? index : null))
      .filter((index) => index !== null); // 동점일 경우 배열로

    const randomIndex =
      maxIndexes[Math.floor(Math.random() * maxIndexes.length)]; // 배열 중 랜덤
    const typeResult = data.types[randomIndex + 1];

    setResult(typeResult); // 최종 결과 저장
  };

  return (
    <div className="typetest-container">
      <div className="center-box">
        {isStart ? (
          // 시작 화면
          <div className="start-box">
            <p className="start-title">
              나는 어떤 유형의 개발자일까? 어울리는 언어 추천까지!
            </p>
            <button className="test-start-button" onClick={handleStartClick}>
              START
            </button>
          </div>
        ) : result ? (
          // 결과 화면
          <div className="result-box">
            <h2 className="result-title">당신의 개발자 유형은?</h2>
            <p className="result-name">{result.name}</p>
            <img src={require(`../${result.imageURL}`)} alt={result.name} />
            <p className="result-description">{result.description}</p>
            <p className="result-recommended">
              추천 언어: {result.recommended_languages.join(", ")}
            </p>
          </div>
        ) : (
          // 질문 화면
          <div className="test-box">
            <p className="test-title">
              {data.questions[questionIndex].question}
            </p>
            <div className="options-box">
              <button
                className="option-button-A"
                onClick={() => handleNextQuestion("A")}
              >
                {data.questions[questionIndex].options.A.text}
              </button>
              <button
                className="option-button-B"
                onClick={() => handleNextQuestion("B")}
              >
                {data.questions[questionIndex].options.B.text}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeTest;
