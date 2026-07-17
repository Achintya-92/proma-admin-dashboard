import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./TopNavbar";
import { useAuth } from "../auth/context/AuthContext";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
      
  return (
    <div className="min-h-screen bg-slate-50">
     <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
        <Navbar
        setSidebarOpen={setSidebarOpen}
      />
        <main className="p-4 sm:p-6 lg:p-8 shadow-md lg:ml-18">
          <Outlet />
        </main>
      </div>
  );
}

