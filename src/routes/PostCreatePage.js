// src/routes/PostCreatePage.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import SelectBoardType from "../components/SelectBoardType";
import "./css/PostCreatePage.css";

const PostCreatePage = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("free");
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addPost) {
      const newPost = {
        title,
        content,
        boardType,
        createdAt: new Date().toISOString(), // 현재 날짜와 시간 추가
      };
      addPost(newPost);
      navigate(`/board/${boardType}`);
    } else {
      console.error("addPost function is not defined");
    }
  };

  const handleCancel = () => {
    setShowModal(true); // 모달 열기
  };

  const confirmCancel = () => {
    setShowModal(false);
    navigate(`/board/${boardType}`);
  };

  const closeModal = () => {
    setShowModal(false);
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
        <div className="button-container">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            작성 완료
          </button>
        </div>
      </form>

      {/* 취소 확인 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>글 작성을 취소하시겠습니까? 작성 중인 내용은 사라집니다.</p>
            <div className="modal-buttons">
              <button onClick={closeModal}>취소</button>
              <button onClick={confirmCancel}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreatePage;
