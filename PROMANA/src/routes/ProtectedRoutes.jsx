import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
   
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}