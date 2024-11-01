// src/routes/PostCreatePage.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import SelectBoardType from "../components/SelectBoardType"; // 분리된 컴포넌트 import
import SubmitButton from "../components/SubmitButton"; // 분리된 컴포넌트 import
import "./css/PostCreatePage.css";

const PostCreatePage = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("free");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addPost) {
      addPost({ title, content, boardType });
      navigate(`/board/${boardType}`);
    } else {
      console.error("addPost function is not defined");
    }
  };

  return (
    <div className="post-create-page">
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit}>
        <SelectBoardType boardType={boardType} setBoardType={setBoardType} />{" "}
        {/* 게시판 선택 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        <div className="quill-editor">
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="내용을 입력하세요"
          />
        </div>
        <SubmitButton label="작성 완료" onClick={handleSubmit} />{" "}
        {/* 제출 버튼 */}
      </form>
    </div>
  );
};

export default PostCreatePage;
