// src/routes/PostDetailPage.js
import React from "react";
import { useParams } from "react-router-dom";
import PostContent from "../components/PostContent"; // 분리된 컴포넌트 import
import "./css/PostDetailPage.css";

const PostDetailPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id, 10));

  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="post-detail-page">
      <h2>{post.title}</h2>
      <PostContent content={post.content} /> {/* 게시글 내용 표시 */}
    </div>
  );
};

export default PostDetailPage;
