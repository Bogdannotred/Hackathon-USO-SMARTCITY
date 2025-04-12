import ParkingDashboard from "./components/ParkingDashboard";
import "./App.css";
import LoginForm from "./login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from "./register"
import InputDesign from "./components/InputDesign"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/home" element={<ParkingDashboard/>} />
        <Route path="/payments" element={<InputDesign/>} />
      </Routes>
    </Router>
  );
}

export default App;