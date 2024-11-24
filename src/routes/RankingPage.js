import React from "react";
import { useSelector } from "react-redux";
import "./css/RankingPage.css"; // 스타일링 파일
import { getSortedUsers, getUserRankAndScore } from "../utils/rankingBadge";

const RankingPage = () => {
  const users = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")); // 현재 로그인한 사용자 가져오기

  // 오류찾기와 타이핑게임 점수 정렬
  const sortedErrorGameUsers = getSortedUsers(users, "errorGameScore");
  const sortedTypingGameUsers = getSortedUsers(users, "typingGameScore");

  // 현재 로그인한 사용자의 랭킹과 점수 찾기 (오류찾기)
  const { rank: currentErrorGameRank, score: currentErrorGameScore } =
    getUserRankAndScore(sortedErrorGameUsers, currentUser?.id);
  const { rank: currentTypingGameRank, score: currentTypingGameScore } =
    getUserRankAndScore(sortedTypingGameUsers, currentUser?.id);

  return (
    <div className="ranking-page">
      {/* 오류찾기 랭킹 */}
      <div className="ranking-section">
        <h2>오류찾기 랭킹</h2>
        {currentUser && currentErrorGameScore !== null && (
          <p>
            My: {currentErrorGameScore}점 (현재 {currentErrorGameRank}위)
          </p>
        )}
        <ul className="ranking-list">
          {sortedErrorGameUsers.map((user, index) => (
            <li
              key={user.id}
              className={user.id === currentUser?.id ? "highlight" : ""}
            >
              {index + 1}. {user.name} :{" "}
              {user.errorGameScore === -1 ? "-" : user.errorGameScore} 점
            </li>
          ))}
        </ul>
      </div>

      {/* 타이핑 챌린지 랭킹 */}
      <div className="ranking-section">
        <h2>타이핑 챌린지 랭킹</h2>
        {currentUser && currentTypingGameScore !== null && (
          <p>
            My: {currentTypingGameScore}점 (현재 {currentTypingGameRank}위)
          </p>
        )}
        <ul className="ranking-list">
          {sortedTypingGameUsers.map((user, index) => (
            <li
              key={user.id}
              className={user.id === currentUser?.id ? "highlight" : ""}
            >
              {index + 1}. {user.name} :{" "}
              {user.typingGameScore === -1 ? "-" : user.typingGameScore} 점
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RankingPage;
