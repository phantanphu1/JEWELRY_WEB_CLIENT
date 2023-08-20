import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";
import LoginForm from "./pages/auth/login";
import Home from "./pages/home";
import Voucher from "./pages/voucher";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="voucher" element={<Voucher />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;