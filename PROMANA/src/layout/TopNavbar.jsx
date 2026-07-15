import { useState } from 'react'
import Sidebar from './Sidebar'
import { Menu } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';

export default function TopNavbar({setSidebarOpen=false}) {
  const {user}=useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [logout,setLogout]=useState(false);
  const  [profileOpen,setProfileOpen]=useState(false);
  const navigate=useNavigate();


  if(logout){
    alert("Successfully LogOut!");
    navigate("/");
  }
  return (
      <nav className="md:h-16 lg:w-full z-50 flex items-center justify-between text-white border-slate-200 bg-slate-900 px-4">
      <div className="flex">
                {(setSidebarOpen &&  <button
        onClick={() => setSidebarOpen(true)}
        className="px-4 lg:hidden"
      >
        <Menu size={22} />
      </button>)}
        <h1 className=''></h1>
      </div>
        <span className="text-3xl font-bold">PROMA</span>
        
        <div className='flex items-center gap-4'>
           
          <div type="button" onClick={()=>navigate("/")} className='px-2'>
          <span >Home</span>
      </div>
          <div type="button" onClick={()=>setLogout(true)} className='px-2 hover:text-red-900'>
          <span >Logout</span>
      </div>
      <div className="relative inline-flex cursor-pointer px-2">
  <span className="text-2xl">🔔</span>

  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
    99+
  </span>
</div>
<div className="relative">
  <button
    type="button"
    onClick={() => setProfileOpen((prev) => !prev)}
    className="flex h-8 items-center gap-2 rounded-full border border-blue-600 p-1"
  >
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
      {user?.name?.charAt(0)}
    </div>

    <div className="hidden sm:block">
      <p className="text-[11px] font-semibold">
        {user?.name}
      </p>

      <p className="text-xs capitalize text-slate-400">
        {user?.role}
      </p>
    </div>
  </button>

  {profileOpen && (
    <div className="absolute right-0 top-full z-[9999] mt-3 w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
      <p className="font-semibold text-slate-900">
        {user?.name}
      </p>
     <p className="font-semibold text-slate-900">
        {user?.email}
      </p>
      <p className="text-sm capitalize text-slate-500">
        {user?.role}
      </p>

      <hr className="my-3 border-slate-200" />

      <button
        onClick={() => setLogout(true)}
        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  )}
</div>
        </div>
      </nav>
  )
}
