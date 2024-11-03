import React from "react";
import { useParams } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import LikeSection from "../components/LikeSection";
import CommentSection from "../components/CommentSection";
import "./css/PostDetailPage.css";

const PostDetailPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id) || String(p.id) === id);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

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

      <LikeSection />
      <CommentSection />
    </div>
  );
};

export default PostDetailPage;
