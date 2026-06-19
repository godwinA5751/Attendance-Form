import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, MessageSquareWarning  } from "lucide-react";

export default function UserForm() {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(null);
  const triggerBounce = (btnName) => {
    setActiveBtn(btnName);
  
    setTimeout(() => {
      setActiveBtn(null);
    }, 300);
  };

  return (
    <div className="userPage">
      <div className="card">
        <h2>Select a Service</h2>
        <div className="home-buttons">
          <button
            className="home-btn"
            onClick={() => {
              triggerBounce("attendance")
              setTimeout(() => {
                navigate("/attendance")
              }, 300);
            }}
          >
            <UserCheck className={activeBtn === "attendance" ? "bounce" : ""} size={18} />
            Attendance
          </button>
          <button
            className="home-btn"
            onClick={() => {
              triggerBounce("complain")
              setTimeout(() => {
                navigate("/complain")
              }, 300);
            }}
          >
            <MessageSquareWarning className={activeBtn === "complain" ? "bounce" : ""} size={18} />
            Complain
          </button>
        </div>
      </div>
    </div>
  );
}
