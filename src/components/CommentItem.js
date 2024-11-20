import React from "react";
import timeAgo from "../utils/timeAgo";
import "./css/CommentItem.css";

const CommentItem = ({
  comment,
  setComments,
  replyComment,
  setReplyComment,
  loggedInUser,
}) => {
  const handleDeleteComment = (commentId) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    }
  };

  const handleDeleteReply = (parentCommentId, replyId) => {
    if (window.confirm("이 대댓글을 삭제하시겠습니까?")) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyId
                ),
              }
            : comment
        )
      );
    }
  };

  const handleReplySubmit = (e, parentCommentId) => {
    e.preventDefault();
    if (replyComment[parentCommentId]?.trim()) {
      const reply = {
        id: Date.now(),
        content: replyComment[parentCommentId],
        createdAt: new Date().toISOString(),
        likes: 0,
        author: loggedInUser?.name,
      };
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentCommentId
            ? { ...comment, replies: [...comment.replies, reply] }
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

  return (
    <li className="comment-item">
      <div className="comment-content" style={{ whiteSpace: "pre-wrap" }}>
        {comment.content}
      </div>
      <div className="comment-footer">
        <div className="comment-info">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-dot"> • </span>
          <span className="comment-date">
            {timeAgo(new Date(comment.createdAt))}
          </span>
        </div>
        <div className="comment-actions">
          <button className="comment-like-button">❤️ {comment.likes}</button>
          {loggedInUser?.name === comment.author && (
            <button
              className="comment-delete-button"
              onClick={() => handleDeleteComment(comment.id)}
            >
              삭제
            </button>
          )}
          <button
            className="reply-button"
            onClick={() => setReplyComment({ [comment.id]: "" })}
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
                <div className="reply-info">
                  <span className="reply-author">{reply.author}</span>
                  <span className="reply-dot"> • </span>
                  <span className="reply-date">
                    {timeAgo(new Date(reply.createdAt))}
                  </span>
                </div>
                <div className="reply-actions">
                  <button className="reply-like-button">
                    ❤️ {reply.likes}
                  </button>
                  {loggedInUser?.name === reply.author && (
                    <button
                      className="reply-delete-button"
                      onClick={() => handleDeleteReply(comment.id, reply.id)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentItem;
