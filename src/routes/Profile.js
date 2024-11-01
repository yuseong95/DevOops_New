import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/Profile.css';

const Profile = () => {
  const location = useLocation();
  const user = location.state?.user;

  // 사용자가 로그인하지 않은 경우 처리
  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div className="profile-container">
      {/* 프로필 이미지와 아이디 */}
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-id">{user.id}</h1>
      </div>

      <div className="info-sections">
        {/* 획득 배지 */}
        <div className="badges-section">
          <h3>획득 배지</h3>
          <div className="badges">
            {user.badges.map((badge, index) => (
              <span key={index} className="badge">{badge}</span>
            ))}
          </div>
        </div>

        {/* 스택 아이콘 */}
        <div className="stack-section">
          <h3>스택</h3>
          <div className="stack-icons">
            {user.skills.map((skill, index) => (
              <span key={index} className="stack-icon">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub 잔디밭 */}
      <div className="contributions">
        <h3>{user.githubId}의 GitHub Contributions</h3>
        {/* GitHub 잔디밭을 불러오는 컴포넌트 추가 */}
      </div>
    </div>
  );
};

export default Profile;
