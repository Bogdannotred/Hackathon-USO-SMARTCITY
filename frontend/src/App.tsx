import ParkingDashboard from "./components/ParkingDashboard";
import "./App.css";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./register";
import InputDesign from "./components/InputDesign";
import PaymentModal from "./ParkingTicketSystem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<ParkingDashboard />} />
        <Route path="/aimodel" element={<InputDesign />} />
        <Route path="/payments" element={<PaymentModal />} />
      </Routes>
    </Router>
  );
}

export default App;
