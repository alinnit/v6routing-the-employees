import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./Pages/Home"
import EmployeesList from "./Pages/EmployeesList"
import PromotedPage from "./Pages/PromotedPage"

function App() {
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/list"> Employees </Link>
        <Link to="/promote"> Promoted </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<EmployeesList />} />
        <Route path="/promote" element={<PromotedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
