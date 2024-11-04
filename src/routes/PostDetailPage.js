import React from "react";
import { useParams } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import LikeSection from "../components/LikeSection";
import CommentSection from "../components/CommentSection";
import "./css/PostDetailPage.css";

const PostDetailPage = ({ posts }) => {
  // URL의 id 파라미터를 가져와 해당 id의 게시글을 찾음
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id) || String(p.id) === id);

  // 게시글이 없을 경우 메시지를 표시
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="post-detail-page">
      {/* 게시글 제목 */}
      <h2>{post.title}</h2>

      {/* 게시글 내용 */}
      <div className="content-wrapper">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>

      {/* 작성일과 경과 시간 표시 */}
      <div className="date">
        작성일: {new Date(post.createdAt).toLocaleString()} (
        {timeAgo(new Date(post.createdAt))})
      </div>

      {/* 좋아요 섹션과 댓글 섹션 */}
      <LikeSection />
      <CommentSection />
    </div>
  );
};

export default PostDetailPage;
