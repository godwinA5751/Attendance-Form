import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../utils/auth";
import { Printer, Download, RefreshCcw, LogOut, Trash2, Loader } from "lucide-react";

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("attendance");
  
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const key =
      view === "attendance"
        ? "attendanceRecord"
        : "complainRecord";
  
    const cached = localStorage.getItem(key);
  
    if (cached) {
      setTimeout(() => setRecords(JSON.parse(cached)), 0);
    }
  }, [view]);
  
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setRecords([]);
  
      const res = await fetch(`${API}/attendance`);
      const data = await res.json();
  
      setRecords(data);
      localStorage.setItem("attendanceRecord", JSON.stringify(data));
    } catch (err) {
      console.log("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComplain = async () => {
    try {
      setLoading(true);
      setRecords([]); // clear attendance data
  
      const res = await fetch(`${API}/complain`);
      const data = await res.json();
  
      setRecords(data);
      localStorage.setItem("complainRecord", JSON.stringify(data));
    } catch (err) {
      console.log("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchAttendance(), 0);
  }, []);
  
  const clearAll = async () => {
    const endpoint =
      view === "attendance"
        ? `${API}/attendance`
        : `${API}/complain`;
  
    const cacheKey =
      view === "attendance"
        ? "attendanceRecord"
        : "complainRecord";
  
    const res = await fetch(endpoint, {
      method: "DELETE",
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setRecords([]);
      localStorage.removeItem(cacheKey);
      alert(data.message);
    }
  };
  
  const triggerBounce = (btnName) => {
    setActiveBtn(btnName);
  
    setTimeout(() => {
      setActiveBtn(null);
    }, 300);
  };
  
  const exportCSV = () => {
    const headers =
      view === "attendance"
        ? ["S/n", "Name", "ID", "Time"]
        : ["S/n", "Name", "ID", "Complain", "Time"];
  
    const rows = records.map((r, i) =>
      view === "attendance"
        ? [
            i + 1,
            r.name,
            r.id,
            new Date(r.time).toLocaleString(),
          ]
        : [
            i + 1,
            r.name,
            r.id,
            `"${r.complain}"`,
            new Date(r.time).toLocaleString(),
          ]
    );
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
  
    link.setAttribute("href", encodedUri);
  
    link.setAttribute(
      "download",
      view === "attendance"
        ? "attendance.csv"
        : "complains.csv"
    );
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="adminPage">
      <div className="tableCard">
        <h2>Attendance Records</h2>

        <div className="functions">
          <div className="buttons">
            <button
              className="refreshBtn"
              onClick={() => {
                triggerBounce("refresh");
            
                if (view === "attendance") {
                  fetchAttendance();
                } else {
                  fetchComplain();
                }
              }}
            >
              <RefreshCcw
                size={18}
                className={activeBtn === "refresh" ? "rotate" : ""}
              />
            </button>
            <button
              className="refreshBtn"
              onClick={() => {
                triggerBounce("print");
                setTimeout(() => {
                      window.print();
                    }, 300);
              
              }}
            >
              <Printer
                size={18}
                className={activeBtn === "print" ? "bounce" : ""}
              />
            </button>
            <button
              className="refreshBtn"
              onClick={() => {
                triggerBounce("export");
                exportCSV();
              }}
            >
              <Download
                size={18}
                className={activeBtn === "export" ? "bounce" : ""}
              />
            </button>
            <button className="logoutBtn"
              onClick={() => {
                triggerBounce("clear");
                clearAll();
              }}>
              <Trash2 className={activeBtn === "clear" ? "bounce" : ""} size={18} />
            </button>
            <button
              className="logoutBtn"
              onClick={() => {
                triggerBounce("logout")
                setTimeout(() => {
                  localStorage.removeItem("attendanceRecord");
                  logoutAdmin();
                  navigate("/admin-login")
                }, 300);
              }}
            >
              <LogOut className={activeBtn === "logout" ? "slide" : ""} size={18} />
            </button>
          </div>
          <select
            value={view}
            onChange={(e) => {
              const value = e.target.value;
          
              setView(value);
          
              if (value === "attendance") {
                fetchAttendance();
              } else {
                fetchComplain();
              }
            }}
          >
            <option value="attendance">Attendance</option>
            <option value="complain">Complain</option>
          </select>
        </div>
        {loading ? (
          <div ><Loader className="loader" size={24} /></div>
        ) : records.length === 0 ?
          <p>No records found.</p>
          : (
          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Name</th>
                  <th>ID</th>
                  {view === "complain" && (
                    <th>Complain</th>
                  )}
                  <th>Time</th>
                </tr>
            </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.id}</td>
                    {view === "complain" && (
                      <td>{r.complain}</td>
                    )}
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