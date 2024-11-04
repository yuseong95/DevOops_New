// src/App.js

import './App.css';
import { Route, Routes } from 'react-router-dom'; // 'Router'를 사용하지 않고 'Route'와 'Routes'만 가져옴
import { UserProvider } from './context/UserContext'; // UserProvider 올바르게 import
import Header from './components/Header';
import Home from './routes/Home';
import Login from './routes/Login';
import Profile from './routes/Profile';
import ProfileEdit from './routes/ProfileEdit';

function App() {
  return (
    <UserProvider> {/* UserProvider로 App 전체를 감싸 context가 적용 */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
