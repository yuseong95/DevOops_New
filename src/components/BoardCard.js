import React from "react";
import { Link } from "react-router-dom";
import "./css/BoardCard.css";
import timeAgo from "../utils/timeAgo";

const stripImagesFromHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html; // HTML 문자열을 div의 innerHTML로 설정
  const images = tempDiv.querySelectorAll("img"); // 모든 img 태그를 선택
  images.forEach((img) => img.remove()); // img 태그 제거
  return tempDiv.textContent || tempDiv.innerText || ""; // 텍스트만 반환
};

const BoardCard = ({ post }) => {
  const cleanContent = stripImagesFromHTML(post.content); // 게시글 내용에서 이미지 제거

  return (
    <div className="board-card-wrapper">
      <Link to={`/board/post/${post.id}`} className="board-card-link">
        <div className="board-card">
          <h3>{post.title}</h3>
          <p>{cleanContent}</p>
          <div className="card-footer">
            <div className="card-left">
              <img
                src={post.authorProfile}
                alt={`${post.author} 프로필`}
                className="board-card-profile"
              />
              <span>{post.author}</span>
              <span className="card-dot"> • </span>
              <span>{timeAgo(new Date(post.createdAt))}</span>
            </div>
            <div className="card-right">
              <span className="comment-count">💬 {post.commentCount || 0}</span>
              <span className="like-count">❤️ {post.likeCount || 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BoardCard;
