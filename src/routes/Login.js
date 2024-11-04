// src/routes/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dummyUsers from '../data/dummyUsers';
import './css/Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = dummyUsers.find(
      (user) => user.id === id && user.password === password
    );

    if (user) {
      setErrorMessage('');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/profile');
    } else {
      setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
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
        <button type="submit" className="login-button">로그인하기</button>
      </form>
    </div>
  );
};

export default Login;
