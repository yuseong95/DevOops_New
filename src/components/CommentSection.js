import React, { useState } from "react";
import timeAgo from "../utils/timeAgo";
import Pagination from "./Pagination";
import CommentItem from "./CommentItem";
import "./css/CommentSection.css";

const ITEMS_PER_PAGE = 10;

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [replyComment, setReplyComment] = useState({});

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
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment("");
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
