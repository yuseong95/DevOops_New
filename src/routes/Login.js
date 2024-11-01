import React, { useState } from 'react';
import './css/Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 더미 사용자 데이터 배열
  const dummyUsers = [
    { id: 'ckals413', password: '1234' },
    { id: 'ffffff', password: '1234' },
    { id: 'testuser3', password: '123456' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 입력한 id와 password가 더미 데이터 중 하나와 일치하는지 확인
    const user = dummyUsers.find(
      (user) => user.id === id && user.password === password
    );

    if (user) {
      setSuccessMessage('로그인 성공!');
      setErrorMessage('');
    } else {
      setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <div className="links">
          <a href="#">아이디찾기</a>
          <span> | </span>
          <a href="#">비밀번호 찾기</a>
          <span> | </span>
          <a href="#">회원가입</a>
        </div>
        <button type="submit" className="login-button">로그인하기</button>
      </form>
    </div>
  );
};

export default Login;
