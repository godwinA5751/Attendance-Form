import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function UserForm() {
  const [form, setForm] = useState({ name: "", id: "", complain: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idRegex = /^\d{2}\/\d{2}\/\d{2}\/\d{3,4}$/;
    
    if (!idRegex.test(form.id)) {
      setMessage("❌ Invalid ID format");
      return;
    }
    if (loading) return; // extra safety
  
    setLoading(true);
  
    try {
      const res = await fetch(`${API}/complain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
      if (!res.ok) {
        return setMessage("❌ " + data.message);
      }
      if (res.ok) {
        setMessage("✅ " + data.message);
        setForm({ name: "", id: "", complain: "" });
      } else {
        setMessage("❌ Error submitting");
      }
    } catch (err) {
      setMessage("❌ Network error", err);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="complain">
      <div className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft /> Back
      </div>
      <div className="card complain_card">
        <h2>Complain Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="id"
            placeholder="ID eg: 23/08/08/0001"
            value={form.id}
            onChange={handleChange}
            required
          />

          <textarea
            name="complain"
            placeholder="Enter your complaint"
            value={form.complain}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
             {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && <p className="msg">{message}</p>}

      </div>
    </div>
  );
}
