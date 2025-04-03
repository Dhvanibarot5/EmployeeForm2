import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleDelete = (id) => {
    const updatedList = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedList);
    localStorage.setItem("employees", JSON.stringify(updatedList));
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setEditEmployee((prev) => ({
        ...prev,
        hobbies: checked ? [...prev.hobbies, value] : prev.hobbies.filter((h) => h !== value),
      }));
    } else {
      setEditEmployee({ ...editEmployee, [name]: value });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp));
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEditEmployee(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-6">
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Employee List</h2>

        {editEmployee ? (
          <form onSubmit={handleEditSubmit} className="mb-4 bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Edit Employee</h3>
            <input
              type="text"
              name="name"
              value={editEmployee.name}
              onChange={handleEditChange}
              required
              className="w-full p-2 border rounded mb-2"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={editEmployee.email}
              onChange={handleEditChange}
              required
              className="w-full p-2 border rounded mb-2"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={editEmployee.password}
              onChange={handleEditChange}
              required
              className="w-full p-2 border rounded mb-2"
              placeholder="Password"
            />

            <div className="mb-2">
              <label className="mr-2">Gender:</label>
              <input type="radio" name="gender" value="Male" checked={editEmployee.gender === "Male"} onChange={handleEditChange} /> Male
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={editEmployee.gender === "Female"}
                onChange={handleEditChange}
                className="ml-2"
              />{" "}
              Female
            </div>

            <div className="mb-2">
              <label className="mr-2">Hobbies:</label>
              <input
                type="checkbox"
                name="hobbies"
                value="Gaming"
                checked={editEmployee.hobbies.includes("Gaming")}
                onChange={handleEditChange}
              />{" "}
              Gaming
              <input
                type="checkbox"
                name="hobbies"
                value="Reading"
                checked={editEmployee.hobbies.includes("Reading")}
                onChange={handleEditChange}
                className="ml-2"
              />{" "}
              Reading
              <input
                type="checkbox"
                name="hobbies"
                value="Traveling"
                checked={editEmployee.hobbies.includes("Traveling")}
                onChange={handleEditChange}
                className="ml-2"
              />{" "}
              Traveling
            </div>

            <input
              type="text"
              name="imageUrl"
              value={editEmployee.imageUrl}
              onChange={handleEditChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Profile Image URL"
            />

            <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-500 mr-2">
              Save
            </button>
            <button type="button" onClick={() => setEditEmployee(null)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Cancel
            </button>
          </form>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-sky-700 text-white">
                  <th className="p-2">Profile</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Password</th>
                  <th className="p-2">Gender</th>
                  <th className="p-2">Hobbies</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b text-center">
                    <td className="p-2">
                      <img src={emp.imageUrl} alt="Profile" className="w-12 h-12 rounded-full mx-auto" />
                    </td>
                    <td className="p-2">{emp.name}</td>
                    <td className="p-2">{emp.email}</td>
                    <td className="p-2">{emp.password}</td>
                    <td className="p-2">{emp.gender}</td>
                    <td className="p-2">{emp.hobbies ? emp.hobbies.join(", ") : "N/A"}</td>
                    <td className="p-2">
                      <button onClick={() => handleEditClick(emp)} className="text-sky-700 px-2">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(emp.id)} className="text-red-600 px-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4">
              {[...Array(Math.ceil(employees.length / itemsPerPage))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? "bg-sky-600 text-white" : "bg-gray-300"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
