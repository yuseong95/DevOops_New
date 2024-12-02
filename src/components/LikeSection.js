import React, { useState, useEffect } from "react";
import "./css/LikeSection.css";

const LikeSection = ({ loggedInUser, postId, boardType, setPosts }) => {
  const [postLikes, setPostLikes] = useState(0);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 로컬 스토리지 키 생성
  const likeKey = `likes-${boardType}-${postId}`;
  const userLikedPostsKey = `likedPosts-${boardType}-${loggedInUser?.id}`;

  useEffect(() => {
    const storedLikes = localStorage.getItem(likeKey);
    const storedLikedPosts =
      JSON.parse(localStorage.getItem(userLikedPostsKey)) || [];

    if (storedLikes) setPostLikes(Number(storedLikes));
    setLikedPosts(storedLikedPosts);
  }, [likeKey, userLikedPostsKey]);

  const handleLikeClick = () => {
    if (!loggedInUser) {
      setModalMessage("로그인이 필요합니다. 로그인 후 다시 시도해 주세요.");
      setShowModal(true);
      return;
    }

    if (likedPosts.includes(postId)) {
      setModalMessage("이미 좋아요한 글입니다.");
      setShowModal(true);
      return;
    }

    const newLikes = postLikes + 1;
    setPostLikes(newLikes);

    setLikedPosts((prevLikedPosts) => {
      const updatedLikedPosts = [...prevLikedPosts, postId];
      localStorage.setItem(
        userLikedPostsKey,
        JSON.stringify(updatedLikedPosts)
      );
      return updatedLikedPosts;
    });

    localStorage.setItem(likeKey, newLikes);

    // posts 상태 업데이트
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId && post.boardType === boardType
          ? { ...post, likeCount: newLikes }
          : post
      )
    );
  };

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
