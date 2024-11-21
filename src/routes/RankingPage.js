import React from 'react';
import { useSelector } from 'react-redux';
import './css/RankingPage.css'; // 스타일링 파일

const RankingPage = () => {
  const users = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser')); // 현재 로그인한 사용자 가져오기

  // 오류찾기 점수 순으로 정렬
  const sortedErrorGameUsers = [...users].sort(
    (a, b) => (b.errorGameScore || 0) - (a.errorGameScore || 0)
  );

  // 타이핑 챌린지 점수 순으로 정렬
  const sortedTypingGameUsers = [...users].sort(
    (a, b) => (b.typingGameScore || 0) - (a.typingGameScore || 0)
  );

  // 현재 로그인한 사용자의 랭킹과 점수 찾기 (오류찾기)
  const currentErrorGameIndex = sortedErrorGameUsers.findIndex(
    (user) => user.id === currentUser?.id
  );
  const currentErrorGameScore =
    currentErrorGameIndex !== -1
      ? sortedErrorGameUsers[currentErrorGameIndex].errorGameScore
      : null;

  // 현재 로그인한 사용자의 랭킹과 점수 찾기 (타이핑 챌린지)
  const currentTypingGameIndex = sortedTypingGameUsers.findIndex(
    (user) => user.id === currentUser?.id
  );
  const currentTypingGameScore =
    currentTypingGameIndex !== -1
      ? sortedTypingGameUsers[currentTypingGameIndex].typingGameScore
      : null;

  return (
    <div className="ranking-page">
      {/* 오류찾기 랭킹 */}
      <div className="ranking-section">
        <h2>오류찾기 랭킹</h2>
        {currentUser && currentErrorGameScore !== null && (
          <p>
            My: {currentErrorGameScore}점 (현재 {currentErrorGameIndex + 1}위)
          </p>
        )}
        <ul className="ranking-list">
          {sortedErrorGameUsers.map((user, index) => (
            <li
              key={user.id}
              className={user.id === currentUser?.id ? 'highlight' : ''}
            >
              {index + 1}. {user.name} :{' '}
              {user.errorGameScore === -1 ? '-' : user.errorGameScore} 점
            </li>
          ))}
        </ul>
      </div>

      {/* 타이핑 챌린지 랭킹 */}
      <div className="ranking-section">
        <h2>타이핑 챌린지 랭킹</h2>
        {currentUser && currentTypingGameScore !== null && (
          <p>
            My: {currentTypingGameScore}점 (현재 {currentTypingGameIndex + 1}위)
          </p>
        )}
        <ul className="ranking-list">
          {sortedTypingGameUsers.map((user, index) => (
            <li
              key={user.id}
              className={user.id === currentUser?.id ? 'highlight' : ''}
            >
              {index + 1}. {user.name} :{' '}
              {user.typingGameScore === -1 ? '-' : user.typingGameScore} 점
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RankingPage;
