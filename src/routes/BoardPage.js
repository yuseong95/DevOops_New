import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import SubmitButton from "../components/SubmitButton";
import Pagination from "../components/Pagination";
import dummyUsers from "../data/dummyUsers";
import "./css/BoardPage.css";

const ITEMS_PER_PAGE = 12;

const BoardPage = ({ posts, comments, likes, boardType, setPosts }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showModal, setShowModal] = useState(false);

  const enrichedPosts = posts.map((post) => {
    const authorData = dummyUsers.find((user) => user.name === post.author);

    const savedComments = localStorage.getItem(`comments-${post.id}`);
    let commentCount = 0;
    if (savedComments) {
      try {
        const parsedComments = JSON.parse(savedComments);
        commentCount = parsedComments.reduce((count, comment) => {
          return count + 1 + (comment.replies ? comment.replies.length : 0);
        }, 0);
      } catch (error) {
        console.error("Error parsing comments:", error);
      }
    }

    const storedLikes = localStorage.getItem(`likes_${post.id}`);
    const likeCount = storedLikes ? Number(storedLikes) : post.likeCount || 0;

    return {
      ...post,
      authorProfile:
        authorData?.profileImage || "https://via.placeholder.com/32",
      commentCount,
      likeCount,
    };
  });

  const filteredPosts = enrichedPosts
    .filter((post) => post.boardType === boardType)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
      navigate("/board/create");
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const placeholders = Array(ITEMS_PER_PAGE - currentPosts.length).fill(null);

  return (
    <div className="board-page">
      <div className="board-content-wrapper">
        <div className="board-header">
          <div className="board-title-container">
            <h2>{boardType === "free" ? "자유 게시판" : "팀원 모집 게시판"}</h2>
            <p className="board-subtitle">
              {boardType === "free"
                ? "DevOops에서 하고 싶은 이야기를 마음껏 해봐요!"
                : "DevOops에서 함께 할 팀원을 구해보세요!"}
            </p>
          </div>
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
