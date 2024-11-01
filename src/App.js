import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Login from './routes/Login'; // Login 컴포넌트 불러오기

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* /login 경로 설정 */}
      </Routes>
    </>
  );
}

export default App;
