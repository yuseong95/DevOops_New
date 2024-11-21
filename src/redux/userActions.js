export const UPDATE_ERRORGAME_SCORE = "UPDATE_ERRORGAME_SCORE";
export const RESET_SCORES = "RESET_SCORES";
export const SYNC_USERS = "SYNC_USERS";

// 오류찾기 점수 업데이트
export const updateErrorGameScore = (userId, score) => ({
  type: UPDATE_ERRORGAME_SCORE,
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
