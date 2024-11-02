// src/routes/BoardPage.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import SubmitButton from "../components/SubmitButton";
import Pagination from "../components/Pagination";
import "./css/BoardPage.css";

const ITEMS_PER_PAGE = 12;

const BoardPage = ({ posts, boardType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 현재 페이지를 가져옴, 기본값은 1페이지
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const filteredPosts = posts.filter((post) => post.boardType === boardType);
  const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(initialPage); // URL에서 페이지 번호가 변경될 때 상태 업데이트
  }, [initialPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`); // 페이지 변경 시 URL을 업데이트
  };

  return (
    <div className="board-page">
      <div className="board-content-wrapper">
        <div className="board-header">
          <h2>{boardType === "free" ? "자유 게시판" : "팀원 모집 게시판"}</h2>
          <Link to="/board/create">
            <SubmitButton
              label="글쓰기"
              backgroundColor="#3333ff"
              color="#fff"
              fontSize="1.2em"
              padding="12px 24px"
            />
          </Link>
        </div>

        <div className="board-container">
          {currentPosts.map((post) => (
            <BoardCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BoardPage;
