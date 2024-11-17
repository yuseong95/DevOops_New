export const UPDATE_SCORE = "UPDATE_SCORE";
export const RESET_SCORES = "RESET_SCORES";

// 점수 업데이트
export const updateScore = (userId, score) => ({
  type: UPDATE_SCORE,
  payload: { userId, score },
});

// 점수 초기화
export const resetScores = () => ({
  type: RESET_SCORES,
});
