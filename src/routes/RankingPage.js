import React from "react";
import "./css/RankingPage.css";
import TypingGameRank from "../components/TypingGameRank";
import ErrorGameRank from "../components/ErrorGameRank";

const RankingPage = () => {
  return (
    <div className="ranking-page">
      {/* 타이핑 랭킹 */}
      <div className="ranking-section">
        <TypingGameRank />
      </div>

      {/* 오류찾기 랭킹 */}
      <div className="ranking-section">
        <ErrorGameRank />
      </div>
    </div>
  );
};

export default RankingPage;
