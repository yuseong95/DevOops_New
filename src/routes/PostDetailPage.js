// src/routes/PostDetailPage.js
import React from "react";
import { useParams } from "react-router-dom";
import timeAgo from "../utils/timeAgo"; // timeAgo 함수 임포트
import "./css/PostDetailPage.css"; // CSS 파일 임포트

const PostDetailPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id) || String(p.id) === id);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="post-detail-page">
      <h2>{post.title}</h2>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="date">
        {/* 절대적 날짜 */}
        작성일:{" "}
        {post.createdAt
          ? new Date(post.createdAt).toLocaleString()
          : "날짜 정보 없음"}
        <br />
        {/* 상대적 시간 표시 */}(
        {post.createdAt ? timeAgo(new Date(post.createdAt)) : "알 수 없음"})
      </div>
    </div>
  );
};

export default PostDetailPage;
