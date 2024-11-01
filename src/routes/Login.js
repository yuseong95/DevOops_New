import React, { useState } from 'react';
import './css/Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("ID:", id, "Password:", password);
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
