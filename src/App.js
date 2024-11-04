import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Login from './routes/Login'; // Login 컴포넌트 불러오기
import Profile from './routes/Profile'; // profile 컴포넌트 불러오기
import ProfileEdit from './routes/ProfileEdit'; // ProfileEdit 컴포넌트 추가

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/profile/edit" element={<ProfileEdit />} /> {/* ProfileEdit 경로 추가 */}


        {/* <Route path="/" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
