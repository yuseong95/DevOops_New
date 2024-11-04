import React from 'react';
//import { useLocation } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation과 useNavigate를 함께 import

import { badgeIcons, skillIcons } from '../data/mappings'; // 매핑 데이터 가져오기
import './css/Profile.css';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate(); // navigate 변수를 선언하여 사용
  const user = location.state?.user;

  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div className="profile-container">
      {/* 프로필 이미지와 아이디 */}
      <div className="profile-header">
        <img
          src={user.profileImage} // 사용자 프로필 이미지 사용
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-id">{user.id}</h1>
        <button onClick={() => navigate('/profile/edit', {state:{user}})}>정보 수정</button> {/* Edit 버튼 */}
      </div>

      <div className="info-sections">
        {/* 획득 배지 */}
        <div className="badges-section">
          <h3>획득 배지</h3>
          <div className="badges">
            {user.badges.map((badge, index) => (
              <span key={index} className="badge">
                {badgeIcons[badge] || '🏅'} {/* 배지 아이콘 매핑 */}
              </span>
            ))}
          </div>
        </div>

        {/* 스택 아이콘 */}
        <div className="stack-section">
          <h3>스택</h3>
          <div className="stack-icons">
            {user.skills.map((skill, index) => (
              <div key={index} className="stack-icon">
                {skillIcons[skill] ? (
                  <img src={skillIcons[skill]} alt={skill} className="skill-image" />
                ) : (
                  <span>{skill}</span> // 매핑되지 않은 기술은 텍스트로 표시
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub 잔디밭 */}
      <div className="contributions">
        <h3>{user.githubId}의 GitHub Contributions</h3>
        {/* GitHub 잔디밭을 불러오는 컴포넌트 추가 */}
        <img
          src={`https://ghchart.rshah.org/33333/${user.githubId}`}
          alt={`${user.githubId}'s GitHub Contributions`}
          className="contribution-chart"
        />
      </div>
    </div>
  );
};

export default Profile;
