// 초기상태
export const initState = {
  showQuiz: false,
  currentFile: 0,
  explanationMode: false,
  explanationIndex: 0,
  userAnswers: ["", "", ""],
  resultCount: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "START": // 게임 시작
      return { ...state, showQuiz: true, currentFile: 0 };
    case "RESULT_COUNT": // 맞은 결과 저장
      return { ...state, resultCount: action.count };
    case "NEXT_QUIZ": // 다음 문제
      return { ...state, currentFile: state.currentFile + 1 };
    case "EXPLANATION_MODE": // 해설 모드
      return { ...state, explanationMode: true, explanationIndex: 0 };
    case "NEXT_EXPLANATION": // 다음 해설
      return { ...state, explanationIndex: state.explanationIndex + 1 };
    case "UPDATE_ANSWER": // 사용자 답 업데이트
      const updatedAnswers = [...state.userAnswers];
      updatedAnswers[state.currentFile] = action.answer;
      return { ...state, userAnswers: updatedAnswers };
    default:
      return state;
  }
};
