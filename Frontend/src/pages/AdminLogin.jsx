import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminAuth } from "../utils/auth";

export default function AdminLogin() {
  const [adminKey, setAdminKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (adminKey === "12345") {
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