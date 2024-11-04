import React, { useState } from "react";
import "./css/LikeSection.css";

const LikeSection = () => {
  const [postLikes, setPostLikes] = useState(0); // 좋아요 수 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  // 좋아요 버튼 클릭 시 모달 표시
  const handleLikeClick = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="like-section">
      <button className="like-button" onClick={handleLikeClick}>
        ❤️ 좋아요 {postLikes}
      </button>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>로그인이 필요합니다. 로그인 후 다시 시도해 주세요.</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeSection;
