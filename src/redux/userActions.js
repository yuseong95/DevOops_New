export const UPDATE_SCORE = "UPDATE_SCORE";
export const RESET_SCORES = "RESET_SCORES";
export const SYNC_USERS = "SYNC_USERS";

// 점수 업데이트
export const updateScore = (userId, score) => ({
  type: UPDATE_SCORE,
  payload: { userId, score },
});

// 점수 초기화
export const resetScores = () => ({
  type: RESET_SCORES,
});

// 사용자 업데이트
export const syncUsers = (users) => ({
  type: SYNC_USERS,
  payload: users,
});
