import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Challenge from './routes/Challenge';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </>
  );
}

export default App;
