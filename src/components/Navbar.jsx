import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-sky-700 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Employee Management</h1>
      <div>
        <button
          onClick={() => navigate("/add-employee")}
          className="bg-white text-sky-600 px-4 py-2 rounded mr-4 hover:bg-gray-200"
        >
          Add Employee
        </button>
        <button
          onClick={() => navigate("/view-employees")}
          className="bg-white text-sky-600 px-4 py-2 rounded hover:bg-gray-200"
        >
          View Employees
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
