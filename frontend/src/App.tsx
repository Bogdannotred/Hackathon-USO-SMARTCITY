import ParkingDashboard from "./components/ParkingDashboard";
import "./App.css";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from "./register"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/home" element={<ParkingDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;