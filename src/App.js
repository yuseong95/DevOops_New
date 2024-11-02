import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Login from "./routes/Login"; // 로그인 경로 추가
import Profile from "./routes/Profile"; // profile 컴포넌트 불러오기
import BoardRoutes from "./routes/BoardRoutes"; // 게시판 관련 경로

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> */}
        <Route path="/board/*" element={<BoardRoutes />} />
        {/* 게시판 경로 설정 */}
      </Routes>
    </>
  );
}

export default App;
