import { Navigate } from "react-router-dom";
import { isAdminAuth } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  if (!isAdminAuth()) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}