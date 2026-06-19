import { Routes, Route } from "react-router-dom";
import UserForm from "./pages/UserForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ComplainForm from "./pages/ComplainForm";
import AttendanceForm from "./pages/AttendanceForm";
import "./App.css"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/attendance" element={<AttendanceForm />} />
      <Route path="/complain" element={<ComplainForm />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}