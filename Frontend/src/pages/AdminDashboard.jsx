import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../utils/auth";

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  
  const fetchRecords = async () => {
    try {
      const res = await fetch(`${API}/attendance`);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.log("Error fetching:", err);
    }
  };
  
  useEffect(() => {
    setTimeout(() => fetchRecords(), 2000);
  }, []);

  return (
    <div className="adminPage">

      <div className="tableCard">
        <h2>Attendance Records</h2>

        <button className="refreshBtn" onClick={fetchRecords}>
          Refresh
        </button>

        <button
          className="logoutBtn"
          onClick={() => {
            logoutAdmin();
            navigate("/admin-login");
          }}
        >
          Logout
        </button>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.id}</td>
                <td>{new Date(r.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}