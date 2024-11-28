import React from "react";
import { useSelector } from "react-redux";
import "./css/TypingRanking.css";
import { PiRankingBold } from "react-icons/pi";
import { getSortedUsers, getUserRankAndScore } from "../utils/sortRanking";

const TypingGameRank = () => {
  const users = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")); // 현재 로그인한 사용자 가져오기

  // 오류찾기 점수 순으로 정렬
  const sortedErrorGameUsers = getSortedUsers(users, "errorGameScore");

  // 현재 로그인한 사용자의 랭킹과 점수 찾기 (오류찾기 챌린지)
  const { rank: currentErrorGameRank, score: currentErrorGameScore } =
    getUserRankAndScore(
      sortedErrorGameUsers,
      currentUser?.id,
      "errorGameScore"
    );

  return (
    <div className="typing-ranking">
      <h2 className="ranking-title">
        Error &nbsp; <PiRankingBold /> &nbsp; Ranking
      </h2>
      {currentUser && currentErrorGameScore !== null && (
        <p className="current-user-info">
          My: {currentErrorGameScore}점 (현재 {currentErrorGameRank}위)
        </p>
      )}
      <ul className="ranking-list">
        {sortedErrorGameUsers.map((user, index) => (
          <li
            key={user.id}
            className={user.id === currentUser?.id ? "highlight" : ""}
          >
            <span className="rank">{index + 1}</span>
            <span className="name">{user.name}</span>
            <span className="score">
              {user.errorGameScore === -1 ? "-" : user.errorGameScore} 점
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypingGameRank;
