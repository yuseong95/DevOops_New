import React, { useReducer } from "react";
import data from "../data/typeTest.json";
import "./css/TypeTest.css";

// 초기 상태 정의
const initialState = {
  isStart: true, // true면 시작 화면, false면 질문 화면
  questionIndex: 0, // 현재 질문 인덱스
  typeScores: Array(8).fill(0), // 8개의 유형 점수 초기화
  result: null, // 최종 결과
};

// 리듀서함수
const reducer = (state, action) => {
  switch (action.type) {
    case "START_TEST": // 테스트 시작
      return { ...state, isStart: false };
    case "ANSWER_QUESTION": // 질문에 답변 선택
      // 점수 업데이트
      const updatedScores = [...state.typeScores];
      action.payload.scores.forEach((score) => {
        updatedScores[score - 1] += 1; // 해당 유형에 점수 추가
      });

      // 마지막 질문인지 확인
      const isLastQuestion = state.questionIndex >= data.questions.length - 1;

      if (isLastQuestion) {
        // 최종 점수 로그 출력
        console.log("최종점수: ", updatedScores);
      }

      return isLastQuestion
        ? {
            ...state,
            typeScores: updatedScores,
            result: calculateResult(updatedScores), // 최종 결과 계산
          }
        : {
            ...state,
            typeScores: updatedScores,
            questionIndex: state.questionIndex + 1, // 다음 질문으로 이동
          };
    default:
      return state;
  }
};

// 최종 결과 계산 및 유형 매칭
const calculateResult = (updatedScores) => {
  const maxScore = Math.max(...updatedScores); // 최고 점수 찾기
  const maxIndexes = updatedScores
    .map((score, index) => (score === maxScore ? index : null))
    .filter((index) => index !== null); // 동점일 경우 배열로

  const randomIndex = maxIndexes[Math.floor(Math.random() * maxIndexes.length)]; // 배열 중 랜덤
  return data.types[randomIndex + 1]; // 유형 정보 반환
};

const TypeTest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="typetest-container">
      <div className="center-box">
        {state.isStart ? (
          // 시작 화면
          <div className="start-box">
            <p className="start-title">
              나는 어떤 유형의 개발자일까? 어울리는 언어 추천까지!
            </p>
            <button
              className="test-start-button"
              onClick={() => dispatch({ type: "START_TEST" })} // 시작 버튼 클릭 -> 질문 화면으로 전환
            >
              START
            </button>
          </div>
        ) : state.result ? (
          // 결과 화면
          <div className="result-box">
            <h2 className="result-title">
              ======= 당신은 어떤 개발자? =======
            </h2>
            <p className="result-name">{state.result.name}</p>
            <img
              className="result-image"
              src={require(`../${state.result.imageURL}`)} // 결과 이미지 출력
              alt={state.result.name}
            />
            <p className="result-description">{state.result.description}</p>
            <p className="result-name">
              추천 언어: {state.result.recommended_languages.join(", ")}
            </p>
          </div>
        ) : (
          // 질문 화면
          <div className="test-box">
            <div className="question-counter">
              {/* 현재 문제 번호 표시 */}
              {state.questionIndex + 1} / {data.questions.length}
            </div>
            <p className="test-title">
              {data.questions[state.questionIndex].question} {/* 질문 출력 */}
            </p>
            <div className="options-box">
              {/* 옵션 버튼 */}
              {["A", "B"].map((option) => (
                <button
                  key={option}
                  className={`option-button-${option}`}
                  onClick={() =>
                    dispatch({
                      type: "ANSWER_QUESTION",
                      payload: {
                        scores:
                          data.questions[state.questionIndex].options[option]
                            .scores, // 선택된 옵션의 점수
                      },
                    })
                  }
                >
                  {
                    data.questions[state.questionIndex].options[option]
                      .text /* 옵션 텍스트 출력 */
                  }
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeTest;
