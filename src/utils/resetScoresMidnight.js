import store from "../redux/store";
import { resetScores, updateBadges } from "../redux/userActions";
import { getSortedUsers } from "../utils/sortRanking";

// 자정에 타이핑게임과 오류찾기게임 점수 초기화
const resetScoresMidnight = () => {
  // 1. 사용자 데이터 가져오기
  const users = store.getState().users;

  // 2. 점수 기준 정렬
  const sortedUsers = getSortedUsers(users, "typingGameScore");
  const sortedErrorUsers = getSortedUsers(users, "errorGameScore");

  // 3. 상위 3명에게 뱃지 부여
  const typingBadges = sortedUsers.slice(0, 3).map((user, index) => {
    // 타이핑
    let badgeType = null;
    if (index === 0) badgeType = "Typing1"; // 1위
    if (index === 1) badgeType = "Typing2"; // 2위
    if (index === 2) badgeType = "Typing3"; // 3위

    return {
      userId: user.id,
      badges: [badgeType], // 매칭된 뱃지 부여
    };
  });

  const errorBadges = sortedErrorUsers.slice(0, 3).map((user, index) => {
    // 오류찾기
    let badgeType = null;
    if (index === 0) badgeType = "Error1";
    if (index === 1) badgeType = "Error2";
    if (index === 2) badgeType = "Error3";

    return {
      userId: user.id,
      badges: [badgeType],
    };
  });

  const allBadges = [...typingBadges, ...errorBadges];

  // Redux에 업데이트
  allBadges.forEach((badgeInfo) => {
    store.dispatch(updateBadges([badgeInfo])); // 각 사용자에게 개별적으로 추가
  });
  console.log("뱃지 부여:", allBadges);

  // 4. 점수 초기화
  store.dispatch(resetScores());
  console.log("모든 사용자 점수 초기화");
};

// 1분마다 현재 시간을 확인 -> 자정에 실행
export const scheduleMidnightReset = () => {
  const intervalId = setInterval(() => {
    const now = new Date();

    if (
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0
    ) {
      resetScoresMidnight(); // 뱃지부여 & 점수리셋
      clearInterval(intervalId);
      console.log("자정 작업 완료");
    }
  }, 1000); // 1초마다 확인
};
