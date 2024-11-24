// PostDetailPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import LikeSection from "../components/LikeSection";
import CommentSection from "../components/CommentSection";
import dummyUsers from "../data/dummyUsers";
import "./css/PostDetailPage.css";

const PostDetailPage = ({ posts, setPosts, loggedInUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  const [comments, setComments] = useState([]);

  // 작성자 정보 매핑
  const author = post && dummyUsers.find((user) => user.id === post.authorId);

  useEffect(() => {
    if (post) {
      const savedComments = localStorage.getItem(`comments-${post.id}`);
      if (savedComments) {
        try {
          setComments(JSON.parse(savedComments));
        } catch (error) {
          console.error("Error parsing comments from localStorage:", error);
          setComments([]);
        }
      }
    }
  }, [post]);

  useEffect(() => {
    if (post && comments.length > 0) {
      localStorage.setItem(`comments-${post.id}`, JSON.stringify(comments));
    }
  }, [comments, post]);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const handleDelete = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
      localStorage.removeItem(`comments-${post.id}`);
      navigate(`/board/${post.boardType}`);
    }
  };

  return (
    <div className="post-detail-page">
      <h2>{post.title}</h2>

      {author && (
        <div className="author-info">
          <img
            src={author.profileImage}
            alt={`${author.name}의 프로필 사진`}
            className="author-profile-image"
          />
          <div className="author-details">
            <span className="author-name">{author.name}</span>
            <span className="author-date">
              {timeAgo(new Date(post.createdAt))}
            </span>
          </div>
        </div>
      )}

      <hr className="post-separator" />

      <div className="content-wrapper">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>

      {loggedInUser?.id === post.authorId && (
        <button className="delete-button" onClick={handleDelete}>
          삭제
        </button>
      )}

      <LikeSection
        loggedInUser={loggedInUser}
        postId={post.id}
        setPosts={setPosts}
      />
      <CommentSection
        postId={post.id}
        comments={comments}
        setComments={setComments}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default PostDetailPage;
