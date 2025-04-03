import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/add-employee" element={<EmployeeForm />} />
        <Route path="/view-employees" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App;
