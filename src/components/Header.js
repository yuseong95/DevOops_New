import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">DevOops!</Link>
      </div>
      <nav className="header-nav">
        <Link to="/ranking">랭킹</Link>
        <Link to="/challenge">일일챌린지</Link>
        <Link to="/board">게시판</Link>
        <Link to="/promotion">홍보</Link>
      </nav>
      <div className="header-login">
        <Link to="/login">로그인</Link>
      </div>
    </header>
  );
};

export default Header;
