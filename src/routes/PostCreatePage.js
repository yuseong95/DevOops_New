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
  const [showModal, setShowModal] = useState(false); // 취소 확인 모달
  const [showTitleModal, setShowTitleModal] = useState(false); // 제목 비어 있음 모달
  const navigate = useNavigate();

  // 로그인된 사용자 정보 가져오기
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (title.trim() === "") {
      // 제목이 비어 있는 경우
      setShowTitleModal(true);
      return;
    }

    if (addPost) {
      const newPost = {
        title,
        content,
        boardType,
        author: loggedInUser.name, // 작성자 이름 추가
        authorId: loggedInUser.id, // 작성자 ID 추가
        createdAt: new Date().toISOString(),
      };
      addPost(newPost);
      navigate(`/board/${boardType}`);
    } else {
      console.error("addPost function is not defined");
    }
  };

  const handleCancel = () => {
    setShowModal(true);
  };

  const confirmCancel = () => {
    setShowModal(false);
    navigate(`/board/${boardType}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowTitleModal(false); // 제목 모달 닫기
  };

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
          <button type="submit" className="submit-button">
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

      {/* 제목 비어 있음 모달 */}
      {showTitleModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>제목을 입력해야 글을 작성할 수 있습니다.</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreatePage;
