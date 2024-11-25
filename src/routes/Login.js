import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Redux에서 사용자 데이터 가져오기
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Redux 상태에서 사용자 찾기
    const user = users.find((user) => user.id === id && user.password === password);

    if (user) {
      setErrorMessage("");

      // 로컬 스토리지에 로그인 사용자 저장
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      navigate("/profile");
    } else {
      setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" className="login-button">로그인하기</button>
      </form>
    </div>
  );
};

export default Login;
