import React from "react";
import timeAgo from "../utils/timeAgo";
import "./css/CommentItem.css";

const CommentItem = ({
  comment,
  setComments,
  replyComment,
  setReplyComment,
}) => {
  // 대댓글 제출 핸들러
  const handleReplySubmit = (e, parentCommentId) => {
    e.preventDefault(); // 기본 제출 방지
    if (replyComment[parentCommentId]?.trim()) {
      const reply = {
        id: Date.now(),
        content: replyComment[parentCommentId],
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentCommentId
            ? { ...comment, replies: [...comment.replies, reply] } // 대댓글 추가
            : comment
        )
      );
      setReplyComment((prev) => {
        const updatedReplyComment = { ...prev };
        delete updatedReplyComment[parentCommentId];
        return updatedReplyComment;
      });
    }
  };

  // 대댓글 작성 버튼 클릭 핸들러
  const handleReplyButtonClick = (commentId) => {
    setReplyComment((prev) => ({
      ...prev,
      [commentId]: prev[commentId] === undefined ? "" : undefined, // 입력창 토글
    }));
  };

  return (
    <li className="comment-item">
      {/* 댓글 본문 */}
      <div className="comment-content" style={{ whiteSpace: "pre-wrap" }}>
        {comment.content}
      </div>
      {/* 댓글 하단 (작성 시간, 좋아요, 대댓글 버튼) */}
      <div className="comment-footer">
        <span className="comment-date">
          {timeAgo(new Date(comment.createdAt))}
        </span>
        <div className="comment-actions">
          <button className="comment-like-button">❤️ {comment.likes}</button>
          <button
            className="reply-button"
            onClick={() => handleReplyButtonClick(comment.id)}
          >
            대댓글 작성
          </button>
        </div>
      </div>

      {/* 대댓글 입력 폼 */}
      {replyComment[comment.id] !== undefined && (
        <form
          onSubmit={(e) => handleReplySubmit(e, comment.id)}
          className="reply-form"
        >
          <textarea
            value={replyComment[comment.id]}
            onChange={(e) =>
              setReplyComment((prev) => ({
                ...prev,
                [comment.id]: e.target.value,
              }))
            }
            placeholder="대댓글을 입력하세요"
            rows="2"
            maxLength="300"
            className="reply-input"
          />
          <button type="submit" className="reply-submit">
            대댓글 작성
          </button>
        </form>
      )}

      {/* 대댓글 목록 */}
      {comment.replies.length > 0 && (
        <ul className="reply-list">
          {comment.replies.map((reply) => (
            <li key={reply.id} className="reply-item">
              <div className="reply-content">{reply.content}</div>
              <div className="reply-footer">
                <span className="reply-date">
                  {timeAgo(new Date(reply.createdAt))}
                </span>
                <button className="reply-like-button">❤️ {reply.likes}</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentItem;
