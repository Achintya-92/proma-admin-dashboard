import { useState } from 'react'
import {  X,
  Home,
  LayoutDashboard,
  Package,
  User,
  LogOut, } from "lucide-react";
import { useAuth } from '../auth/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Sidebar({sidebarOpen,setSidebarOpen}) {
  const {user}=useAuth();
  const [logout,setLogout]=useState(false);
  const [profileOpen,setProfileOpen]=useState(false);
  const navigate=useNavigate();
  
  function Cancel(){
    setLogout(false);
  }
  function LogOutFunc(){
    localStorage.removeItem("user");
    navigate("/");
  }
  if(logout){
    return(
      <div className='bg-slate-50 min-h-screen flex items-center justify-center'>
         <div className='p-8 bg-blue-200 rounded-2xl shadow-md'>
             <h1 className='font-bold text-2xl py-16'>Are you sure! for LogOut</h1>
<div className='flex justify-between'>
<button type="button" className='px-8 py-2 rounded-2xl bg-red-50 text-red-700 hover:bg-red-700 hover:text-white' onClick={LogOutFunc}>
        Yes
        </button>
        <button type="button" className='px-8 py-2 rounded-2xl bg-green-50 text-green-700 hover:bg-green-700 hover:text-white' onClick={Cancel}>
         No
         </button>
         </div>
         </div>
        </div>
    )
  }
 const menuItems = [
   {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },

  {
    name: "Profile",
    path: "#",
    icon: User,
    onClick: () => setProfileOpen((prev) => !prev),
  },
  {
    name: "Logout",
    path: "#",
    icon: LogOut,
    onClick: () => setLogout(true),
    className: "text-red-400 hover:bg-red-900/20",
  },
];

if(user.role==="admin"){
  // i want dashboard at 1 index
  menuItems.splice(1,0,{
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  });

    menuItems.splice(2,1, {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  });

}
  return (
  <aside
  className={`
    fixed inset-y-0 left-0
    z-50
    sm:w-64 lg:w-20
    bg-slate-900
    overflow-visible
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>
     <nav className="relative text-white py-8 px-4">
<div className='flex items-center justify-between p-6'>
  <h1 className='text-2xl md:text-3xl  font-bold text-white lg:hidden'>
    Proma  
  </h1>
  <button
  type="button"
  onClick={() => setSidebarOpen(false)}
  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 text-white lg:hidden"
  aria-label="Close sidebar"
>
  <X size={22} />
</button>
</div>

<ul className="space-y-2 py-8">
  {menuItems.map((item) => {
    const Icon = item.icon;

    return (
      <li key={item.name} className="relative">
        {item.onClick ? (
          <>
            <button
              type="button"
              onClick={item.onClick}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 transition ${
                item.className || ""
              } ${!sidebarOpen ? "justify-center" : ""}`}
            >
              <Icon size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </button>
            {item.name === "Profile" && profileOpen && (
              <div className="absolute left-20 top-0 ml-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50">
                <p className="font-semibold text-slate-900">{user?.name}</p>
                <p className="text-sm text-slate-600">{user?.email}</p>
                <p className="text-sm capitalize text-slate-500">{user?.role}</p>

                <hr className="my-3" />

                <button
                  onClick={() => setLogout(true)}
                  className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            to={item.path}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 transition ${
              !sidebarOpen ? "justify-center" : ""
            }`}
          >
            <Icon size={20} />
            {sidebarOpen && <span>{item.name}</span>}
          </Link>
        )}
      </li>
    );
  })}
</ul>
      </nav>
    </aside>
  )
}
