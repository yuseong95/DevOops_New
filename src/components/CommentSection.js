import React, { useState } from "react";
import Pagination from "./Pagination";
import CommentItem from "./CommentItem";
import "./css/CommentSection.css";

const ITEMS_PER_PAGE = 10; // 페이지당 표시할 댓글 수

const CommentSection = () => {
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [replyComment, setReplyComment] = useState({}); // 대댓글 상태

  // 댓글 입력 변화 시 호출
  const handleCommentChange = (e) => {
    const input = e.target.value;
    const newLineCount = (input.match(/\n/g) || []).length;
    if (newLineCount < 5) {
      // 줄바꿈 제한
      setNewComment(input);
    }
  };

  // 댓글 제출 시 호출
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(), // 댓글 고유 ID
        content: newComment,
        createdAt: new Date().toISOString(), // 생성 시간
        likes: 0, // 좋아요 수 초기화
        replies: [], // 대댓글 배열 초기화
      };
      setComments([...comments, comment]); // 댓글 추가
      setNewComment(""); // 입력 필드 초기화
    }
  };

  // 페이지 변경 시 호출
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 댓글 및 대댓글 개수 계산
  const getTotalCommentCount = () => {
    return comments.reduce((count, comment) => {
      return count + 1 + (comment.replies ? comment.replies.length : 0);
    }, 0);
  };

  // 현재 페이지에 해당하는 댓글들 계산
  const indexOfLastComment = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstComment = indexOfLastComment - ITEMS_PER_PAGE;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalPages = Math.ceil(comments.length / ITEMS_PER_PAGE);

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
    </div>
  );
};

export default CommentSection;
