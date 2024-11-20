import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import SubmitButton from "../components/SubmitButton";
import Pagination from "../components/Pagination";
import "./css/BoardPage.css";

const ITEMS_PER_PAGE = 12;

const BoardPage = ({ posts, boardType, setPosts }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  const filteredPosts = posts
    .filter((post) => post.boardType === boardType) // 선택된 게시판 필터링
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 작성 날짜 기준으로 정렬

  const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지에 해당하는 게시글
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleWriteClick = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      console.log("글쓰기 페이지로 이동");
      navigate("/board/create");
    } else {
      // 모달 표시
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false); // 모달 닫기
  };

  const placeholders = Array(ITEMS_PER_PAGE - currentPosts.length).fill(null);

  return (
    <div className="board-page">
      <div className="board-content-wrapper">
        <div className="board-header">
          <h2>{boardType === "free" ? "자유 게시판" : "팀원 모집 게시판"}</h2>
          <SubmitButton
            label="글쓰기"
            backgroundColor="#3333ff"
            color="#fff"
            fontSize="1.2em"
            padding="12px 24px"
            onClick={handleWriteClick}
          />
        </div>

        <div className="board-container">
          {currentPosts.map((post) => (
            <BoardCard
              key={post.id}
              post={post}
              loggedInUser={JSON.parse(localStorage.getItem("loggedInUser"))}
            />
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

      {/* 로그인 필요 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>로그인이 필요합니다. 로그인 후 글쓰기를 이용해주세요.</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
