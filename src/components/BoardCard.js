// src/components/BoardCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/BoardCard.css";
import timeAgo from "../utils/timeAgo";

const BoardCard = ({ post }) => (
  <div className="board-card-wrapper">
    <Link to={`/board/post/${post.id}`} className="board-card-link">
      {" "}
      {/* 절대 경로로 수정 */}
      <div className="board-card">
        <h3>{post.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        <div className="card-footer">
          <span>{post.author}</span> • <span>{timeAgo(post.createdAt)}</span>
        </div>
      </div>
    </Link>
  </div>
);

export default BoardCard;
