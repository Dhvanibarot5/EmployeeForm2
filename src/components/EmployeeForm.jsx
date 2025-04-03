import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    hobbies: [],
    imageUrl: "",
  });

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    if (id) {
      const existingEmployee = storedEmployees.find((emp) => emp.id === parseInt(id));
      if (existingEmployee) setEmployee(existingEmployee);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setEmployee((prev) => ({
        ...prev,
        hobbies: checked ? [...prev.hobbies, value] : prev.hobbies.filter((hobby) => hobby !== value),
      }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];

    if (id) {
      const updatedEmployees = storedEmployees.map((emp) => (emp.id === parseInt(id) ? { ...employee, id: parseInt(id) } : emp));
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    } else {
      const newEmployee = { id: Date.now(), ...employee };
      storedEmployees.push(newEmployee);
      localStorage.setItem("employees", JSON.stringify(storedEmployees));
    }

    navigate("/view-employees");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-6">
      <div className="w-3/4 bg-sky-700 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl text-white font-bold text-center mt-5 mb-10">{id ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={employee.name}
            onChange={handleChange}
            required
            className="p-2 border rounded w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={employee.email}
            onChange={handleChange}
            required
            className="p-2 border rounded w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={employee.password}
            onChange={handleChange}
            required
            className="p-2 border rounded w-full"
          />

          <div className="flex items-center space-x-4">
            <label className="font-medium">Gender:</label>
            <input type="radio" name="gender" value="Male" checked={employee.gender === "Male"} onChange={handleChange} /> Male
            <input type="radio" name="gender" value="Female" checked={employee.gender === "Female"} onChange={handleChange} /> Female
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Hobbies:</label>
            <div className="flex space-x-4">
              <input type="checkbox" name="hobbies" value="Reading" checked={employee.hobbies.includes("Reading")} onChange={handleChange} />
              <label>Reading</label>

              <input type="checkbox" name="hobbies" value="Traveling" checked={employee.hobbies.includes("Traveling")} onChange={handleChange} />
              <label>Traveling</label>

              <input type="checkbox" name="hobbies" value="Gaming" checked={employee.hobbies.includes("Gaming")} onChange={handleChange} />
              <label>Gaming</label>
            </div>
          </div>

          <input
            type="text"
            name="imageUrl"
            placeholder="Enter Profile Image URL"
            value={employee.imageUrl}
            onChange={handleChange}
            required
            className="p-2 border rounded w-full"
          />

          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900">
            {id ? "Update Employee" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
