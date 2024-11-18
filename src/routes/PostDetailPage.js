import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import LikeSection from "../components/LikeSection";
import CommentSection from "../components/CommentSection";
import "./css/PostDetailPage.css";

const PostDetailPage = ({ posts, setPosts, loggedInUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id) || String(p.id) === id);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  // 삭제 핸들러
  const handleDelete = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id)); // 게시글 제거
      navigate(`/board/${post.boardType}`); // 삭제 후 해당 게시판으로 이동
    }
  };

  return (
    <div className="post-detail-page">
      <h2>{post.title}</h2>
      <div className="content-wrapper">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
      <div className="date">
        작성일: {new Date(post.createdAt).toLocaleString()} (
        {timeAgo(new Date(post.createdAt))})
      </div>

      {/* 삭제 버튼 - 로그인 사용자와 작성자가 동일한 경우에만 표시 */}
      {loggedInUser && loggedInUser.id === post.authorId && (
        <button className="delete-button" onClick={handleDelete}>
          삭제
        </button>
      )}

      <LikeSection loggedInUser={loggedInUser} postId={post.id} />
      <CommentSection />
    </div>
  );
};

export default PostDetailPage;
