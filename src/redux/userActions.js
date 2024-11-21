export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_Typing_Game_SCORE = 'UPDATE_Typing_Game_SCORE';
export const RESET_SCORES = 'RESET_SCORES';
export const SYNC_USERS = 'SYNC_USERS';

// 점수 업데이트
export const updateScore = (userId, score) => ({
  type: UPDATE_SCORE,
  payload: { userId, score },
});

// 타이핑 챌린지 점수 업데이트
export const updateTypingGameScore = (userId, typingGameScore) => ({
  type: UPDATE_Typing_Game_SCORE,
  payload: { userId, typingGameScore },
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
