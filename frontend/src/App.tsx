import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./register";
import LoginForm from "./login";
import Header from "./components/Header";

import { User } from "./components/types.ts";

const user: User = {
  name: "1",
  email: "John Doe",
  avatar: "dabudavwdhwav"
}
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<RegisterForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Header user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
