// src/routes/PostDetailPage.js
import React from "react";
import { useParams } from "react-router-dom";

const PostDetailPage = ({ posts }) => {
  const { id } = useParams();

  // id가 숫자 또는 문자열일 수 있으므로 일치하는지 확인
  const post = posts.find((p) => p.id === Number(id) || String(p.id) === id);

  console.log("PostDetailPage - id:", id); // 디버깅용 콘솔 로그
  console.log("PostDetailPage - post:", post); // 디버깅용 콘솔 로그

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      <small>작성일: {new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default PostDetailPage;
