import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminAuth } from "../utils/auth";
const adminPin = import.meta.env.VITE_ADMIN_SECRETPIN
export default function AdminLogin() {
  const [adminKey, setAdminKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (adminKey === adminPin) {
      setAdminAuth(true);
      navigate("/admin");
    } else {
      alert("Wrong admin key");
    }
  };

  return (
    <div className="userPage">
      <div className="card">
        <h2>Admin Login</h2>

        <input
          type="password"
          placeholder="Enter admin key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}