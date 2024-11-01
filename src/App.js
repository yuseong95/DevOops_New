import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import ErrorGame from "./routes/ErrorGame";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findError" element={<ErrorGame />} />
      </Routes>
    </>
  );
}

export default App;
