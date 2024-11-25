//redux/userReducer.js
import dummyUsers from "../data/dummyUsers";
const initiState = {
  users: dummyUsers.map((user) => ({
    ...user,
    errorGameScore: -1,
    typingGameScore: -1,
  })),
};

const userReducer = (state = initiState, action) => {
  switch (action.type) {
    case "UPDATE_ERRORGAME_SCORE": // 오류찾기게임 점수 업데이트
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userId
            ? {
                ...user,
                errorGameScore: action.payload.score,
              }
            : user
        ),
      };
    case 'UPDATE_Typing_Game_SCORE':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userId
            ? {
                ...user,
                typingGameScore: action.payload.typingGameScore,
              }
            : user
        ),
      };
    case "UPDATE_BADGES": // 게임 랭킹별 뱃지 부여
      return {
        ...state,
        users: state.users.map((user) => {
          const userBadgeData = action.payload.find(
            (badgeInfo) => badgeInfo.userId === user.id
          ); // 뱃지 받을 대상
          if (userBadgeData) {
            return {
              ...user,
              badges: [...(user.badges || []), ...userBadgeData.badges], // 뱃지 부여
            };
          }
          return user;
        }),
      };
    case "RESET_BADGES": // 모든 뱃지 초기화
      return {
        ...state,
        users: state.users.map((user) => ({
          ...user,
          badges: [], // badges를 빈 배열로 초기화
        })),
      };
    case "RESET_SCORES": // 오류찾기, 타이핑 점수 초기화
      return {
        ...state,
        users: state.users.map((user) => ({
          ...user,
          errorGameScore: -1,
          typingGameScore: -1,
        })),
      };
    case "SYNC_USERS": // 사용자목록 업데이트
      return {
        ...state,
        users: action.payload,
      };
      case "UPDATE_USER_INFO":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.data } // 해당 사용자의 정보를 업데이트
            : user
        ),
      };    
    default:
      return state;
  }
};

export default userReducer;
