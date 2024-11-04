// src/routes/BoardRoutes.js
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BoardPage from "./BoardPage";
import PostCreatePage from "./PostCreatePage";
import PostDetailPage from "./PostDetailPage";
import dummyPosts from "../data/dummyPosts";

function BoardRoutes() {
  // 로컬 스토리지에서 게시글 데이터 불러오기 함수
  const loadPosts = () => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : dummyPosts; // 로컬 스토리지에 저장된 게시글이 없으면 더미 데이터를 사용
  };

  const [posts, setPosts] = useState(loadPosts); // 게시글 데이터를 상태로 관리

  // 게시글 변경 시 로컬 스토리지에 데이터를 업데이트하는 useEffect 훅
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts)); // 상태가 변경되면 로컬 스토리지에 저장
  }, [posts]);

  // 새로운 게시글을 추가하는 함수
  const addPost = (newPost) => {
    const fullPost = {
      id: Date.now(), // 고유한 ID 생성
      ...newPost, // 전달받은 게시글 내용 병합
    };
    setPosts((prevPosts) => [fullPost, ...prevPosts]); // 새로운 게시글을 기존 배열의 앞에 추가
  };

  return (
    <Routes>
      {/* 자유 게시판 라우트 */}
      <Route
        path="free"
        element={<BoardPage posts={posts} boardType="free" />}
      />
      {/* 팀원 모집 게시판 라우트 */}
      <Route
        path="team"
        element={<BoardPage posts={posts} boardType="team" />}
      />
      {/* 게시글 작성 페이지 라우트 */}
      <Route path="create" element={<PostCreatePage addPost={addPost} />} />
      {/* 게시글 상세 페이지 라우트 */}
      <Route path="post/:id" element={<PostDetailPage posts={posts} />} />
    </Routes>
  );
}

export default BoardRoutes;
