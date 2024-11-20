import React, { useState } from "react";
import Pagination from "./Pagination";
import CommentItem from "./CommentItem";
import "./css/CommentSection.css";

const ITEMS_PER_PAGE = 10;

const CommentSection = ({ postId, comments, setComments, loggedInUser }) => {
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [replyComment, setReplyComment] = useState({});
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

  const handleCommentChange = (e) => {
    const input = e.target.value;
    const newLineCount = (input.match(/\n/g) || []).length;
    if (newLineCount < 5) {
      setNewComment(input);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      setModalMessage("로그인이 필요합니다. 로그인 후 댓글을 작성해주세요.");
      setShowModal(true); // 모달 표시
      return;
    }
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: [],
        author: loggedInUser.name, // 작성자 정보 추가
      };
      const updatedComments = [...comments, comment];
      setComments(updatedComments); // 상태 업데이트
      setNewComment("");

      // 로컬 스토리지에 즉시 저장
      localStorage.setItem(
        `comments-${postId}`,
        JSON.stringify(updatedComments)
      );
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getTotalCommentCount = () => {
    return comments.reduce((count, comment) => {
      return count + 1 + (comment.replies ? comment.replies.length : 0);
    }, 0);
  };

  const indexOfLastComment = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstComment = indexOfLastComment - ITEMS_PER_PAGE;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalPages = Math.ceil(comments.length / ITEMS_PER_PAGE);

  const closeModal = () => setShowModal(false);

  return (
    <div className="comment-section">
      <h3>댓글 {getTotalCommentCount()}개</h3>
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
        {currentComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            setComments={setComments}
            replyComment={replyComment}
            setReplyComment={setReplyComment}
            loggedInUser={loggedInUser}
          />
        ))}
      </ul>
      {comments.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* 로그인 요구 모달 */}
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

export default CommentSection;
