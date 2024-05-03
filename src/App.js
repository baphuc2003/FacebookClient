import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./containers/Auth/Login/Login";
import Signup from "./containers/Auth/Signup/Signup";
import VerifyEmailRegister from "./containers/Auth/VerifyEmail/VerifyEmailRegister";
import Home from "./containers/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/verify-your-email" element={<VerifyEmailRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
