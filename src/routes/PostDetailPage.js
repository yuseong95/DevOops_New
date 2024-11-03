// src/routes/PostDetailPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import "./css/PostDetailPage.css";

const PostDetailPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id) || String(p.id) === id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postLikes, setPostLikes] = useState(0);
  const [showModal, setShowModal] = useState(false);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const handleLikeClick = () => {
    setShowModal(true); // 로그인 상태를 확인하는 모달 표시
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCommentChange = (e) => {
    const input = e.target.value;
    const newLineCount = (input.match(/\n/g) || []).length;
    if (newLineCount < 5) {
      setNewComment(input);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleCommentLike = (commentId) => {
    setShowModal(true); // 로그인 필요 모달 표시
  };

  return (
    <div className="post-detail-page">
      <h2>{post.title}</h2>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="date">
        작성일: {new Date(post.createdAt).toLocaleString()} (
        {timeAgo(new Date(post.createdAt))})
      </div>

      {/* 좋아요 섹션 */}
      <div className="like-section">
        <button className="like-button" onClick={handleLikeClick}>
          ❤️ 좋아요 {postLikes}
        </button>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>로그인이 필요합니다. 로그인 후 다시 시도해 주세요.</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}

      {/* 댓글 섹션 */}
      <div className="comment-section">
        <h3>댓글 {comments.length}개</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요"
            rows="3"
            maxLength="500"
            className="comment-input"
            style={{ whiteSpace: "pre-wrap" }}
          />
          <button type="submit" className="comment-submit">
            댓글 작성
          </button>
        </form>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div
                className="comment-content"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {comment.content}
              </div>
              <div className="comment-footer">
                <span className="comment-date">
                  {timeAgo(new Date(comment.createdAt))}
                </span>
                <button
                  className="comment-like-button"
                  onClick={() => handleCommentLike(comment.id)}
                >
                  ❤️ {comment.likes}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetailPage;
