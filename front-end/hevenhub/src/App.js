import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
