import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux 상태 가져오기
import timeAgo from "../utils/timeAgo";
import LikeSection from "../components/LikeSection";
import CommentSection from "../components/CommentSection";
import "./css/PostDetailPage.css";

const PostDetailPage = ({ posts, setPosts, loggedInUser }) => {
  const users = useSelector((state) => state.users); // Redux에서 사용자 정보 가져오기
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // `location.state`에서 boardType을 가져오거나 기본값 설정
  const boardType = location.state?.boardType || "free";

  // 게시글 필터링
  const post = useMemo(() => {
    return posts.find((p) => p.id === Number(id) && p.boardType === boardType);
  }, [id, boardType, posts]);

  const [comments, setComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Redux에서 작성자 정보 매핑
  const author = post && users.find((user) => user.id === post.authorId);

  useEffect(() => {
    if (post) {
      const savedComments = localStorage.getItem(
        `comments-${boardType}-${post.id}`
      );
      if (savedComments) {
        try {
          setComments(JSON.parse(savedComments));
        } catch (error) {
          console.error("Error parsing comments from localStorage:", error);
          setComments([]);
        }
      }
    }
  }, [post, boardType]);

  useEffect(() => {
    if (post && comments.length > 0) {
      localStorage.setItem(
        `comments-${boardType}-${post.id}`,
        JSON.stringify(comments)
      );
    }
  }, [comments, post, boardType]);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  // 게시글 삭제 처리
  const confirmDelete = () => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
    localStorage.removeItem(`comments-${boardType}-${post.id}`);
    navigate(`/board/${boardType}`);
    setShowDeleteModal(false);
  };

  return (
    <div className="post-detail-page">
      <h2>{post.title}</h2>

      {/* 작성자 정보 표시 */}
      {author && (
        <div className="author-info">
          <img
            src={author.profileImage}
            alt={`${author.name}의 프로필 사진`}
            className="author-profile-image"
          />
          <div className="author-details">
            <span className="author-name">{author.name}</span>
            <span className="author-date">
              {timeAgo(new Date(post.createdAt))}
            </span>
          </div>
        </div>
      )}

      <hr className="post-separator" />

      {/* 게시글 내용 */}
      <div className="content-wrapper">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>

      {/* 게시글 삭제 버튼 */}
      {loggedInUser?.id === post.authorId && (
        <button
          className="delete-button"
          onClick={() => setShowDeleteModal(true)}
        >
          삭제
        </button>
      )}

      {/* 좋아요 섹션 */}
      <LikeSection
        loggedInUser={loggedInUser}
        postId={post.id}
        boardType={boardType} // boardType 전달
        setPosts={setPosts}
      />

      {/* 댓글 섹션 */}
      <CommentSection
        postId={post.id}
        boardType={boardType} // 올바른 boardType 전달
        comments={comments}
        setComments={setComments}
        loggedInUser={loggedInUser}
      />

      {/* 삭제 모달 */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // 모달 외부 클릭 방지
          >
            <p>정말로 이 게시글을 삭제하시겠습니까?</p>
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={() => setShowDeleteModal(false)} // 모달 닫기
              >
                취소
              </button>
              <button
                className="confirm-button"
                onClick={confirmDelete} // 삭제 확정
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
