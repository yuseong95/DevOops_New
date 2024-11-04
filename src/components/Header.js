// src/components/Header.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/login');
  };

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
      <div className="header-user">
        {user ? (
          <div className="header-profile">
            <img src={user.profileImage} alt="Profile" className="header-profile-image" />
            <span>{user.name}님</span>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
