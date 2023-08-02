import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";
import LoginForm from "./pages/auth/login";
import Home from "./pages/home";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;