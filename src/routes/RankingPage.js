import React from "react";
import { useSelector } from "react-redux";
import "./css/RankingPage.css"; // 스타일링 파일

const RankingPage = () => {
  const users = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")); // 현재 로그인한 사용자 가져오기

  // 점수 순으로 정렬
  const sortedUsers = [...users].sort(
    (a, b) => (b.errorGameScore || 0) - (a.errorGameScore || 0)
  );

  // 현재 로그인한 사용자의 랭킹과 점수 찾기
  const currentUserIndex = sortedUsers.findIndex(
    (user) => user.id === currentUser?.id
  );
  const currentUserScore =
    currentUserIndex !== -1
      ? sortedUsers[currentUserIndex].errorGameScore
      : null;

  return (
    <div>
      <h2>오류찾기 랭킹</h2>
      {/* 로그인 상태일 때만 개인 점수 및 랭킹 표시 */}
      {currentUser && currentUserScore !== null && (
        <p>
          My: {currentUserScore}점 (현재 {currentUserIndex + 1}위)
        </p>
      )}

      {/* 랭킹 리스트 */}
      <ul className="ranking-list">
        {sortedUsers.map((user, index) => (
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
  );
};

export default RankingPage;
