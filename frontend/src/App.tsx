import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./register";
import LoginForm from "./login";
import Home from "./home";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<RegisterForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
