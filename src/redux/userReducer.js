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
    case "UPDATE_Typing_Game_SCORE":
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
      const updatedUsers = state.users.map((user) => {
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
      });

      // 현재 로그인된 사용자 동기화
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser) {
        const updatedLoggedInUser = updatedUsers.find(
          (user) => user.id === loggedInUser.id
        );
        if (updatedLoggedInUser) {
          // localStorage에 최신 사용자 정보 저장
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(updatedLoggedInUser)
          );
        }
      }

      return {
        ...state,
        users: updatedUsers, // Redux 상태 업데이트
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
