import React, { useState, useEffect } from "react";
import "./css/LikeSection.css";

const LikeSection = ({ loggedInUser, postId }) => {
  const [postLikes, setPostLikes] = useState(0); // 좋아요 수 상태
  const [likedPosts, setLikedPosts] = useState([]); // 좋아요 누른 게시글 ID 추적
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

  // 좋아요 카운트 복원 (LocalStorage에서 가져오기)
  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes_${postId}`);
    const storedLikedPosts =
      JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (storedLikes) setPostLikes(Number(storedLikes));
    setLikedPosts(storedLikedPosts);
  }, [postId]);

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    if (!loggedInUser) {
      // 로그인되지 않은 경우
      setModalMessage("로그인이 필요합니다. 로그인 후 다시 시도해 주세요.");
      setShowModal(true);
      return;
    }

    if (likedPosts.includes(postId)) {
      // 이미 좋아요를 누른 경우
      setModalMessage("이미 좋아요한 글입니다.");
      setShowModal(true);
      return;
    }

    // 좋아요 추가
    const newLikes = postLikes + 1;
    setPostLikes(newLikes);
    setLikedPosts((prevLikedPosts) => {
      const updatedLikedPosts = [...prevLikedPosts, postId];
      // LocalStorage에 저장
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
      return updatedLikedPosts;
    });

    // 좋아요 수를 LocalStorage에 저장
    localStorage.setItem(`likes_${postId}`, newLikes);
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
            <p>{modalMessage}</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeSection;
