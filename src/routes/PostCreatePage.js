// src/routes/PostCreatePage.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import SelectBoardType from "../components/SelectBoardType";
import SubmitButton from "../components/SubmitButton";
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

  // Quill 에디터 설정
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "image"], // 링크와 이미지 기능 추가
      ["clean"], // 형식 제거 버튼
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="post-create-page">
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit}>
        <SelectBoardType boardType={boardType} setBoardType={setBoardType} />
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
            modules={modules}
            formats={formats}
          />
        </div>
        <SubmitButton label="작성 완료" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default PostCreatePage;
