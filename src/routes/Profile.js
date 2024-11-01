import React from 'react';
import './css/Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      {/* 프로필 이미지와 아이디 */}
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-id">아이디</h1>
      </div>

      <div className="info-sections">
        {/* 획득 배지 */}
        <div className="badges-section">
          <h3>획득 배지</h3>
          <div className="badges">
            <span className="badge">🛡️</span>
            <span className="badge">🛡️</span>
            <span className="badge">🛡️</span>
            <span className="badge">🛡️</span>
            <span className="badge">🛡️</span>
          </div>
        </div>

        {/* 스택 아이콘 */}
        <div className="stack-section">
          <h3>스택</h3>
          <div className="stack-icons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg"
              alt="C"
              className="stack-icon"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/Java_programming_language_logo.svg"
              alt="Java"
              className="stack-icon"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png"
              alt="Kotlin"
              className="stack-icon"
            />
          </div>
        </div>
      </div>

      {/* GitHub 잔디밭 */}
      <div className="contributions">
        <h3>GitHub Contributions</h3>
        {/* GitHub 잔디밭을 불러오는 컴포넌트 추가 */}
      </div>
    </div>
  );
};

export default Profile;
