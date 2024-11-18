import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BoardPage from "./BoardPage";
import PostCreatePage from "./PostCreatePage";
import PostDetailPage from "./PostDetailPage";
import dummyPosts from "../data/dummyPosts";

function BoardRoutes() {
  const loadPosts = () => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : dummyPosts;
  };

  const [posts, setPosts] = useState(loadPosts);

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

  // 로그인된 사용자 정보 로드
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

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
      <Route
        path="post/:id"
        element={
          <PostDetailPage
            posts={posts}
            setPosts={setPosts}
            loggedInUser={loggedInUser} // 로그인 사용자 정보 전달
          />
        }
      />
    </Routes>
  );
}

export default BoardRoutes;
