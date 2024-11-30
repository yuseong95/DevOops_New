export const UPDATE_ERRORGAME_SCORE = "UPDATE_ERRORGAME_SCORE";
export const UPDATE_Typing_Game_SCORE = "UPDATE_Typing_Game_SCORE";
export const RESET_SCORES = "RESET_SCORES";
export const SYNC_USERS = "SYNC_USERS";
export const UPDATE_BADGES = "UPDATE_BADGES";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

// 오류찾기 점수 업데이트
export const updateErrorGameScore = (userId, score) => ({
  type: UPDATE_ERRORGAME_SCORE,
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

// 랭킹별 뱃지 업데이트
export const updateBadges = (badgePayload) => ({
  type: UPDATE_BADGES,
  payload: badgePayload,
});

//회원 정보를 수정
export const updateUserInfo = (id, data) => ({
  type: "UPDATE_USER_INFO",
  payload: { id, data },
});
