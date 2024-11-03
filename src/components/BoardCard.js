// src/components/BoardCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/BoardCard.css";
import timeAgo from "../utils/timeAgo";

const BoardCard = ({ post }) => (
  <div className="board-card-wrapper">
    <Link to={`/board/post/${post.id}`} className="board-card-link">
      <div className="board-card">
        <h3>{post.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        <div className="card-footer">
          <span>{post.author}</span> •{" "}
          <span>{timeAgo(new Date(post.createdAt))}</span>
          {/* Date 객체로 변환하여 전달 */}
        </div>
      </div>
    </Link>
  </div>
);

export default BoardCard;
