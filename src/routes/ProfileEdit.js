import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../redux/userActions';
import './css/ProfileEdit.css';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 리덕스에서 현재 로그인한 사용자 가져오기
  const loggedInUser = useSelector((state) =>
    state.users.find((user) => user.id === JSON.parse(localStorage.getItem('loggedInUser')).id)
  );

  const [userInfo, setUserInfo] = useState(loggedInUser || {
    id: '',
    email: '',
    password: '',
    name: '',
    profileImage: '',
  });

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

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


    // 디스패치 전에 콘솔 로그로 데이터 확인
    console.log("Dispatching updateUserInfo with:", userInfo);  

    // 리덕스 상태 업데이트
    dispatch(updateUserInfo(userInfo.id, userInfo));

    // 로컬 스토리지 업데이트
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
