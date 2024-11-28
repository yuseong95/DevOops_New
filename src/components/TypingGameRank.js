import React from "react";
import { useSelector } from "react-redux";
import "./css/TypingRanking.css";
import { PiRankingBold } from "react-icons/pi";
import { getSortedUsers, getUserRankAndScore } from "../utils/sortRanking";

const TypingGameRank = () => {
  const users = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")); // 현재 로그인한 사용자 가져오기

  // 타이핑 챌린지 점수 순으로 정렬
  const sortedTypingGameUsers = getSortedUsers(users, "typingGameScore");

  // 현재 로그인한 사용자의 랭킹과 점수 찾기 (타이핑 챌린지)
  const { rank: currentTypingGameRank, score: currentTypingGameScore } =
    getUserRankAndScore(
      sortedTypingGameUsers,
      currentUser?.id,
      "typingGameScore"
    );

  return (
    <div className="typing-ranking">
      <h2 className="ranking-title">
        Typing &nbsp; <PiRankingBold /> &nbsp; Ranking
      </h2>
      {currentUser && currentTypingGameScore !== null && (
        <p className="current-user-info">
          My: {currentTypingGameScore}점 (현재 {currentTypingGameRank}위)
        </p>
      )}
      <ul className="ranking-list">
        {sortedTypingGameUsers.map((user, index) => (
          <li
            key={user.id}
            className={user.id === currentUser?.id ? "highlight" : ""}
          >
            <span className="rank">{index + 1}</span>
            <span className="name">{user.name}</span>
            <span className="score">
              {user.typingGameScore === -1 ? "-" : user.typingGameScore} 점
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypingGameRank;
