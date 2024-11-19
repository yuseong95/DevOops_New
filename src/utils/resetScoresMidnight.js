import store from "../redux/store";
import { resetScores } from "../redux/userActions";

// 자정에 타이핑게임과 오류찾기게임 점수 초기화

export const resetScoresMidnight = () => {
  const now = new Date();
  const midnight = new Date().setHours(24, 0, 0, 0);

  const remainTime = midnight - now; // 자정까지 남은 시간

  setTimeout(() => {
    store.dispatch(resetScores()); // 자정에 RESET_SCORES 액션
    console.log("모든 사용자 점수 초기화.");

    resetScoresMidnight(); // 재귀
  }, remainTime);
};
