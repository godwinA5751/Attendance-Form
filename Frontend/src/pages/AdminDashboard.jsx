import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../utils/auth";
import { Printer, Download, RefreshCcw, LogOut, Trash2  } from "lucide-react";

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

  const exportCSV = () => {
    const headers = ["S/n", "Name", "ID", "Time"];
  
    const rows = records.map((r, i) =>
      [i+1, r.name, r.id, new Date(r.time).toLocaleString()]
    );
  
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
  
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
  };

  const clearAll = async () => {
    const res = await fetch(`${API}/attendance`, {
      method: "DELETE",
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setRecords([]);
      alert(data.message);
    }
  };

  return (
    <div className="adminPage">

      <div className="tableCard">
        <h2>Attendance Records</h2>

        <div className="buttons">
          <button className="refreshBtn" onClick={fetchRecords}>
            <RefreshCcw size={18} />
          </button>
          <button className="refreshBtn" onClick={() => window.print()}>
            <Printer size={18} />
          </button> 
          <button className="refreshBtn" onClick={exportCSV}>
            <Download size={18} />
          </button>
          <button className="logoutBtn" onClick={clearAll}>
            <Trash2 size={18} />
          </button>
          <button
            className="logoutBtn"
            onClick={() => {
              logoutAdmin();
              navigate("/admin-login");
            }}
          >
            <LogOut size={18} />
          </button>
        </div>
        {records.length === 0 ? (
          <div className="emptyState">
            No student record yet.
          </div>
        ) : (
          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Time</th>
                </tr>
            </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.id}</td>
                    <td>{new Date(r.time).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}