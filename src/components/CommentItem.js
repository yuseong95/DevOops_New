import React from "react";
import timeAgo from "../utils/timeAgo";
import "./css/CommentItem.css";

const CommentItem = ({
  comment,
  setComments,
  replyComment,
  setReplyComment,
}) => {
  const handleReplySubmit = (e, parentCommentId) => {
    e.preventDefault();
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
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      );
      setReplyComment((prev) => ({ ...prev, [parentCommentId]: undefined }));
    }
  };

  const handleReplyButtonClick = (commentId) => {
    setReplyComment((prev) => ({
      ...prev,
      [commentId]: prev[commentId] === undefined ? "" : undefined,
    }));
  };

  return (
    <li className="comment-item">
      <div className="comment-content" style={{ whiteSpace: "pre-wrap" }}>
        {comment.content}
      </div>
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
