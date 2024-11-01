// src/App.js
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import BoardPage from "./routes/BoardPage";
import PostCreatePage from "./routes/PostCreatePage";
import PostDetailPage from "./routes/PostDetailPage";
import dummyPosts from "./data/dummyPosts"; // 더미 데이터 import

function App() {
  const [posts, setPosts] = useState(dummyPosts); // 초기값을 더미 데이터로 설정

  const addPost = (newPost) => {
    const fullPost = {
      id: Date.now(),
      ...newPost,
    };
    setPosts((prevPosts) => [...prevPosts, fullPost]);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/board/free"
          element={<BoardPage posts={posts} boardType="free" />}
        />
        <Route
          path="/board/team"
          element={<BoardPage posts={posts} boardType="team" />}
        />
        <Route
          path="/board/create"
          element={<PostCreatePage addPost={addPost} />}
        />
        <Route path="/post/:id" element={<PostDetailPage posts={posts} />} />
      </Routes>
    </>
  );
}

export default App;
