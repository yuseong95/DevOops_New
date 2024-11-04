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

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1; // 현재 페이지 URL 쿼리에서 가져옴

  const [currentPage, setCurrentPage] = useState(initialPage);

  const filteredPosts = posts.filter((post) => post.boardType === boardType); // 선택한 게시판 유형의 게시글 필터링
  const indexOfLastPost = currentPage * ITEMS_PER_PAGE; // 마지막 게시글 인덱스
  const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE; // 첫 게시글 인덱스
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지의 게시글 추출
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE); // 전체 페이지 수 계산

  useEffect(() => {
    setCurrentPage(initialPage); // URL이 변경되면 페이지 상태 업데이트
  }, [initialPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 변경 핸들러
    navigate(`?page=${pageNumber}`);
  };

  const placeholders = Array(ITEMS_PER_PAGE - currentPosts.length).fill(null); // 빈 카드 생성

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
          {placeholders.map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="board-card placeholder"
            ></div>
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
