import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);

  // 드롭다운을 열기 위한 조건 설정
  const updateDropdownVisibility = () => {
    setIsDropdownVisible(buttonHovered || menuHovered);
  };

  // 버튼에 마우스 진입 시
  const handleButtonEnter = () => {
    setButtonHovered(true);
    setIsDropdownVisible(true);
  };

  // 버튼에서 마우스 떠날 시
  const handleButtonLeave = () => {
    setButtonHovered(false);
    updateDropdownVisibility();
  };

  // 드롭다운 메뉴에 마우스 진입 시
  const handleMenuEnter = () => {
    setMenuHovered(true);
    setIsDropdownVisible(true);
  };

  // 드롭다운 메뉴에서 마우스 떠날 시
  const handleMenuLeave = () => {
    setMenuHovered(false);
    updateDropdownVisibility();
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">DevOops!</Link>
      </div>
      <nav className="header-nav">
        <Link to="/ranking">랭킹</Link>
        <Link to="/challenge">일일챌린지</Link>

        {/* 드롭다운 메뉴 */}
        <div
          className="dropdown"
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
        >
          <span className="dropdown-link">게시판</span>
          {isDropdownVisible && (
            <div
              className="dropdown-content"
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            >
              <Link
                to="/board/free"
                onClick={() => setIsDropdownVisible(false)}
              >
                자유 게시판
              </Link>
              <Link
                to="/board/team"
                onClick={() => setIsDropdownVisible(false)}
              >
                팀원 모집 게시판
              </Link>
            </div>
          )}
        </div>

        <Link to="/promotion">홍보</Link>
      </nav>
      <div className="header-login">
        <Link to="/login">로그인</Link>
      </div>
    </header>
  );
};

export default Header;
