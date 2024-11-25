import React from "react";
import "./css/PromotionCard.css";

const PromotionCard = ({ promotion, isEvent }) => {
  return (
    <div className={`promotion-card ${isEvent ? "event" : "sponsor"}`}>
      {/* 왼쪽 썸네일 */}
      <div className="card-thumbnail">
        <img src={promotion.thumbnail} alt={promotion.title} />
      </div>

      {/* 오른쪽 정보 */}
      <div className="card-info">
        <h3 className="card-title">{promotion.title}</h3>
        <p className="card-subtitle">{promotion.subtitle}</p>
        <p className="card-description">{promotion.description}</p>

        <div className="card-status">
          <span className="status-badge">{promotion.status}</span>
          {promotion.daysLeft !== null && (
            <span className="days-left">D-{promotion.daysLeft}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
