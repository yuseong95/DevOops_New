import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import LikeSection from "../components/LikeSection";
import CommentSection from "../components/CommentSection";
import "./css/PostDetailPage.css";

const PostDetailPage = ({ posts, setPosts, loggedInUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id) || String(p.id) === id);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 댓글 불러오기
    if (post) {
      const savedComments = localStorage.getItem(`comments-${post.id}`);
      if (savedComments) {
        try {
          const parsedComments = JSON.parse(savedComments);
          console.log(
            "Loaded Comments for Post ID",
            post.id,
            ":",
            parsedComments
          );
          setComments(Array.isArray(parsedComments) ? parsedComments : []);
        } catch (error) {
          console.error("Error parsing comments from localStorage:", error);
          setComments([]);
        }
      }
    }
  }, [post]);

  useEffect(() => {
    // 댓글 저장: comments가 변경될 때만 로컬 스토리지에 저장
    if (post && comments.length > 0) {
      console.log("Saving Comments for Post ID", post.id, ":", comments);
      localStorage.setItem(`comments-${post.id}`, JSON.stringify(comments));
    }
  }, [comments, post]);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const handleDelete = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
      localStorage.removeItem(`comments-${post.id}`);
      navigate(`/board/${post.boardType}`);
    }
  };

  return (
    <div className="post-detail-page">
      <h2>{post.title}</h2>
      <div className="content-wrapper">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
      <div className="date">
        작성일: {new Date(post.createdAt).toLocaleString()} (
        {timeAgo(new Date(post.createdAt))})
      </div>
      {loggedInUser && loggedInUser.id === post.authorId && (
        <button className="delete-button" onClick={handleDelete}>
          삭제
        </button>
      )}
      <LikeSection loggedInUser={loggedInUser} postId={post.id} />
      <CommentSection
        postId={post.id} // 댓글 저장/불러오기용 ID 전달
        comments={comments}
        setComments={setComments}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default PostDetailPage;
