// src/routes/PostCreatePage.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import SelectBoardType from "../components/SelectBoardType";
import "./css/PostCreatePage.css";

const PostCreatePage = ({ addPost }) => {
  // 제목, 내용, 게시판 종류, 모달 표시 상태를 위한 state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("free");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 게시글 작성 제출 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (addPost) {
      const newPost = {
        title,
        content,
        boardType,
        createdAt: new Date().toISOString(), // 작성 시간 추가
      };
      addPost(newPost); // 게시글 추가 함수 호출
      navigate(`/board/${boardType}`); // 해당 게시판으로 이동
    } else {
      console.error("addPost function is not defined");
    }
  };

  // 작성 취소 시 모달 표시 함수
  const handleCancel = () => {
    setShowModal(true);
  };

  // 모달의 "확인" 클릭 시 게시글 작성 취소
  const confirmCancel = () => {
    setShowModal(false);
    navigate(`/board/${boardType}`);
  };

  // 모달 닫기 함수
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
      ["link", "image"],
      ["clean"],
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
        {/* 게시판 종류 선택 */}
        <SelectBoardType boardType={boardType} setBoardType={setBoardType} />
        {/* 제목 입력 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        {/* 내용 입력 에디터 */}
        <div className="quill-editor">
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="내용을 입력하세요"
            modules={modules}
            formats={formats}
          />
        </div>
        {/* 작성 취소, 완료 버튼 */}
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
