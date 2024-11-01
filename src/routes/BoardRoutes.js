// src/routes/BoardRoutes.js
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BoardPage from "./BoardPage";
import PostCreatePage from "./PostCreatePage";
import PostDetailPage from "./PostDetailPage";
import dummyPosts from "../data/dummyPosts"; // 더미 데이터 import

function BoardRoutes() {
  // 로컬 스토리지에서 데이터 로드 또는 기본 더미 데이터 사용
  const loadPosts = () => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : dummyPosts;
  };

  const [posts, setPosts] = useState(loadPosts);

  // 게시글이 추가되거나 수정될 때 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    const fullPost = {
      id: Date.now(),
      ...newPost,
    };
    setPosts((prevPosts) => [fullPost, ...prevPosts]);
  };

  console.log("BoardRoutes - posts:", posts); // 추가된 코드

  return (
    <Routes>
      <Route
        path="free"
        element={<BoardPage posts={posts} boardType="free" />}
      />
      <Route
        path="team"
        element={<BoardPage posts={posts} boardType="team" />}
      />
      <Route path="create" element={<PostCreatePage addPost={addPost} />} />
      <Route path="post/:id" element={<PostDetailPage posts={posts} />} />
    </Routes>
  );
}

export default BoardRoutes;
