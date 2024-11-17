import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import SubmitButton from "../components/SubmitButton";
import Pagination from "../components/Pagination";
import "./css/BoardPage.css";

const ITEMS_PER_PAGE = 12;

const BoardPage = ({ posts, boardType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const filteredPosts = posts.filter((post) => post.boardType === boardType);
  const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
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
      // 로그인 상태라면 글쓰기 페이지로 이동
      navigate("/board/create");
    } else {
      // 로그인 상태가 아니라면 경고 메시지 표시
      alert("로그인이 필요합니다. 로그인 후 이용해주세요.");
    }
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
            onClick={handleWriteClick} // 버튼 클릭 이벤트 핸들러 추가
          />
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
