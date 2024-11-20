// src/components/BoardCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/BoardCard.css";
import timeAgo from "../utils/timeAgo";

// HTML에서 이미지 태그 제거 함수
const stripImagesFromHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // 모든 이미지 태그 제거
  const images = tempDiv.querySelectorAll("img");
  images.forEach((img) => img.remove());

  return tempDiv.textContent || tempDiv.innerText || ""; // 텍스트만 반환
};

// 게시글 데이터를 받아와 화면에 표시하는 함수형 컴포넌트
// props로 게시글 데이터(post)를 받아와 카드 형태로 출력함.
const BoardCard = ({ post }) => {
  // 이미지 태그가 제거된 내용 생성
  const cleanContent = stripImagesFromHTML(post.content);

  return (
    <div className="board-card-wrapper">
      {/* 게시글의 상세 페이지로 이동하는 링크 설정.
          게시글의 고유 ID를 URL에 포함시켜 각 게시글마다 고유의 링크 생성 */}
      <Link to={`/board/post/${post.id}`} className="board-card-link">
        <div className="board-card">
          {/* 게시글의 제목 */}
          <h3>{post.title}</h3>

          {/* 게시글의 내용 일부를 텍스트로만 표시 */}
          <p>{cleanContent}</p>

          {/* 게시글 작성자와 작성 시간 표시 부분 */}
          <div className="card-footer">
            {/* 게시글 작성자를 나타내는 텍스트 */}
            <span>{post.author}</span> •{" "}
            {/* 게시글 작성 시간을 timeAgo 유틸리티 함수를 이용해 상대적 시간으로 표시.
                Date 객체로 변환한 후 함수에 전달 */}
            <span>{timeAgo(new Date(post.createdAt))}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BoardCard;
