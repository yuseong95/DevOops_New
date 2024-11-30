import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/ranking" className="footer-link">
            랭킹
          </Link>
          <Link to="/challenge" className="footer-link">
            오늘의 챌린지
          </Link>
          <Link to="/findError" className="footer-link">
            오류 찾기
          </Link>
          <Link to="/board/free" className="footer-link">
            자유 게시판
          </Link>
          <Link to="/board/team" className="footer-link">
            팀원 모집
          </Link>
        </div>
        <p className="footer-text">
          © {new Date().getFullYear()} DevOops. All Rights Reserved.
        </p>
        <div className="footer-credits">
          <span> 5조_포크 / 김동혁, 김서희, 나유성, 임차민</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
