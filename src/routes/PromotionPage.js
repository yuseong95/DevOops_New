import React, { useState } from "react";
import PromotionCard from "../components/PromotionCard";
import CodeChallengeEvent from "../images/CodeChallengEvent.png";
import FindError from "../images/FindError.png";
import "./css/PromotionPage.css";

const dummyPromotions = [
  {
    id: 1,
    type: "event", // 이벤트
    title: "당신의 코드 타이핑 실력은? 코드 타이핑에 도전하라!",
    subtitle: "DevOops의 코드 타이핑에 도전하고, 편의점 기프티콘 받자!",
    thumbnail: CodeChallengeEvent,
    description: "제한시간 내에 최대한 정확히 코드를 작성해 보세요!",
    status: "진행 중",
    daysLeft: 20,
    tag: "DevOops 이벤트",
    price: "무료",
  },
  {
    id: 2,
    type: "event", // 이벤트
    title: "코드의 빈틈을 찾아라! 오류 찾기 챌린지!",
    subtitle: "오류 찾기 챌린지에 도전하고, 베스킨라빈스 기프티콘 획득까지?!",
    thumbnail: FindError,
    description: "데이터 분석 전문가가 되는 기회를 잡아보세요.",
    status: "진행 중",
    daysLeft: 14,
    tag: "DevOops 이벤트",
    price: "무료",
  },
  {
    id: 3,
    type: "sponsor", // 스폰서 광고
    title: "클라우드 백엔드 데브코스",
    subtitle: "AWS와 함께하는 백엔드 마스터",
    thumbnail:
      "https://grepp-programmers.s3.amazonaws.com/production/file_resource/7527/Dev_Thumnail_Web_Full_Stack_4th.png",
    description: "AWS와 함께 클라우드 기반의 백엔드 기술을 배우는 최고의 기회!",
    status: "스폰서 광고",
    daysLeft: null, // 기한 없음
    tag: "스폰서",
    price: "유료",
  },
];

const PromotionPage = () => {
  const [promotions, setPromotions] = useState(dummyPromotions);

  return (
    <div className="promotion-page">
      {/* 홍보 게시판 제목 */}
      <header className="promotion-header">
        <h2>홍보 게시판</h2>
        <p>DevOops에서 진행되는 특별한 이벤트들을 확인해보세요!</p>
      </header>

      {/* 프로모션 카드 */}
      <div className="promotion-container">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))}
      </div>
    </div>
  );
};

export default PromotionPage;
