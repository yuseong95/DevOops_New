import React, { useState } from "react";

import timeAgo from "../utils/timeAgo";
import dummyUsers from "../data/dummyUsers";
import "./css/CommentItem.css";

const CommentItem = ({
  comment,
  setComments,
  replyComment,
  setReplyComment,
  loggedInUser,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const author = dummyUsers.find((user) => user.name === comment.author);

  const handleLike = (commentId, isReply = false, parentCommentId = null) => {
    if (!loggedInUser) {
      setModalMessage("로그인이 필요합니다. 로그인 후 좋아요를 눌러주세요.");
      setShowModal(true);
      return;
    }

    setComments((prevComments) =>
      prevComments.map((c) => {
        if (isReply && c.id === parentCommentId) {
          const targetReply = c.replies.find((reply) => reply.id === commentId);
          if (targetReply?.likedBy?.includes(loggedInUser.id)) {
            setModalMessage("이미 좋아요한 대댓글입니다.");
            setShowModal(true);
            return c;
          }
          return {
            ...c,
            replies: c.replies.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    likes: reply.likes + 1,
                    likedBy: [...(reply.likedBy || []), loggedInUser.id],
                  }
                : reply
            ),
          };
        } else if (!isReply && c.id === commentId) {
          if (c.likedBy?.includes(loggedInUser.id)) {
            setModalMessage("이미 좋아요한 댓글입니다.");
            setShowModal(true);
            return c;
          }
          return {
            ...c,
            likes: c.likes + 1,
            likedBy: [...(c.likedBy || []), loggedInUser.id],
          };
        }
        return c;
      })
    );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleReplySubmit = (e, parentCommentId) => {
    e.preventDefault();
    if (!loggedInUser) {
      setModalMessage("로그인이 필요합니다. 로그인 후 대댓글을 작성해주세요.");
      setShowModal(true);
      return;
    }
    if (replyComment[parentCommentId]?.trim()) {
      const reply = {
        id: Date.now(),
        content: replyComment[parentCommentId],
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
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
      <div className="comment-header">
        <img
          src={author?.profileImage}
          alt={author?.name || "unknown"}
          className="comment-profile-image"
        />
        <div className="comment-author-info">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-dot"> • </span>
          <span className="comment-date">
            {timeAgo(new Date(comment.createdAt))}
          </span>
        </div>
      </div>
      <div className="comment-content" style={{ whiteSpace: "pre-wrap" }}>
        {comment.content}
      </div>
      <div className="comment-footer">
        <div className="comment-actions">
          <button
            className="comment-like-button"
            onClick={() => handleLike(comment.id)}
          >
            ❤️ {comment.likes}
          </button>
          {loggedInUser?.name === comment.author && (
            <button
              className="comment-delete-button"
              onClick={() =>
                window.confirm("이 댓글을 삭제하시겠습니까?") &&
                setComments((prev) => prev.filter((c) => c.id !== comment.id))
              }
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
          {comment.replies.map((reply) => {
            const replyAuthor = dummyUsers.find(
              (user) => user.name === reply.author
            );
            return (
              <li key={reply.id} className="reply-item">
                <div className="reply-header">
                  <img
                    src={replyAuthor?.profileImage}
                    alt={replyAuthor?.name || "unknown"}
                    className="reply-profile-image"
                  />
                  <div className="reply-author-info">
                    <span className="reply-author">{reply.author}</span>
                    <span className="reply-dot"> • </span>
                    <span className="reply-date">
                      {timeAgo(new Date(reply.createdAt))}
                    </span>
                  </div>
                </div>
                <div className="reply-content">{reply.content}</div>
                <div className="reply-footer">
                  <button
                    className="reply-like-button"
                    onClick={() => handleLike(reply.id, true, comment.id)}
                  >
                    ❤️ {reply.likes}
                  </button>
                  {loggedInUser?.name === reply.author && (
                    <button
                      className="reply-delete-button"
                      onClick={() =>
                        window.confirm("이 대댓글을 삭제하시겠습니까?") &&
                        setComments((prev) =>
                          prev.map((c) =>
                            c.id === comment.id
                              ? {
                                  ...c,
                                  replies: c.replies.filter(
                                    (r) => r.id !== reply.id
                                  ),
                                }
                              : c
                          )
                        )
                      }
                    >
                      삭제
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default CommentItem;
