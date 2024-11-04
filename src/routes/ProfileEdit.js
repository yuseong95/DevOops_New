// src/routes/ProfileEdit.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ProfileEdit.css';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    profileImage: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUserInfo(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (userInfo.password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
    alert('회원 정보가 저장되었습니다.');
    navigate('/profile');
  };

  return (
    <div className="profile-edit-container">
      <h2>회원 정보 수정</h2>
      <div className="profile-section">
        <div className="profile-header">
          <img src={userInfo.profileImage} alt="Profile" className="profile-image" />
          <h3>{userInfo.name} 님</h3>
        </div>
      </div>

      <div className="info-section">
        <h4>로그인 정보</h4>
        <div className="info-item">
          <label>아이디</label>
          <span>{userInfo.id}</span>
        </div>
        <div className="info-item">
          <label>이메일</label>
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div className="info-item">
          <label>비밀번호</label>
          <input
            type="password"
            value={userInfo.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
        </div>
      </div>

      <div className="info-section">
        <h4>개인 정보</h4>
        <div className="info-item">
          <label>이름</label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div className="info-item">
          <label>프로필 이미지 URL</label>
          <input
            type="text"
            value={userInfo.profileImage}
            onChange={(e) => handleChange('profileImage', e.target.value)}
          />
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>저장</button>
    </div>
  );
};

export default ProfileEdit;
