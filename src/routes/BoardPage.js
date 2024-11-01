// src/routes/BoardPage.js
import React from "react";
import { Link } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import SubmitButton from "../components/SubmitButton";
import "./css/BoardPage.css";

const BoardPage = ({ posts, boardType }) => {
  const filteredPosts = posts.filter((post) => post.boardType === boardType);

  return (
    <div className="board-page">
      <div className="board-header">
        <h2>{boardType === "free" ? "자유 게시판" : "팀원 모집 게시판"}</h2>
        <Link to="/board/create">
          <SubmitButton
            label="글쓰기"
            backgroundColor="#3333ff" // 기존의 파란색 스타일 적용
            color="#fff"
          />
        </Link>
      </div>
      <div className="board-container">
        {filteredPosts.map((post) => (
          <BoardCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
