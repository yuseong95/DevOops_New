import React, { useState, useEffect } from "react";
import "./css/LikeSection.css";

const LikeSection = ({ loggedInUser, postId, setPosts }) => {
  const [postLikes, setPostLikes] = useState(0);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes_${postId}`);
    const userLikedPostsKey = `likedPosts_${loggedInUser?.id}`;
    const storedLikedPosts =
      JSON.parse(localStorage.getItem(userLikedPostsKey)) || [];

    if (storedLikes) setPostLikes(Number(storedLikes));
    setLikedPosts(storedLikedPosts);
  }, [postId, loggedInUser?.id]);

  const handleLikeClick = () => {
    if (!loggedInUser) {
      setModalMessage("로그인이 필요합니다. 로그인 후 다시 시도해 주세요.");
      setShowModal(true);
      return;
    }

    const userLikedPostsKey = `likedPosts_${loggedInUser.id}`;

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

    localStorage.setItem(`likes_${postId}`, newLikes);

    // posts 상태 업데이트
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likeCount: newLikes } : post
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
