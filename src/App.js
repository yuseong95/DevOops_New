import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Challenge from './routes/Challenge';
import Login from './routes/Login'; // Login 컴포넌트 불러오기
import Profile from './routes/Profile'; // profile 컴포넌트 불러오기

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
