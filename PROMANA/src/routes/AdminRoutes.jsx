import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

export default function AdminRoute() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}