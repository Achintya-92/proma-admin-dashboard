import { useState } from 'react'
import { X } from "lucide-react";
import { useAuth } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({sidebarOpen,setSidebarOpen}) {
  const {user}=useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false)
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
<button className='px-8 py-2 rounded-2xl bg-red-50 text-red-700 hover:bg-red-700 hover:text-white' onClick={LogOutFunc}>
        Yes
        </button>
        <button className='px-8 py-2 rounded-2xl bg-green-50 text-green-700 hover:bg-green-700 hover:text-white' onClick={Cancel}>
         No
         </button>
         </div>
         </div>
        </div>
    )
    navigate("/");
  }
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
  ]

  return (
    <aside
  className={`
    z-50
    fixed inset-y-0 left-0 sm:w-64 lg:w-20
    bg-slate-900
    transition-transform duration-300
    
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>
      <nav className="text-white py-8 px-4">
<div className='flex items-center justify-between p-6'>
  <h1 className='text-2xl md:text-3xl  font-bold text-white lg:hidden'>
    Proma  
  </h1>
  <button
  onClick={() => setSidebarOpen(false)}
  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 text-white lg:hidden"
  aria-label="Close sidebar"
>
  <X size={22} />
</button>
</div>
{/* <hr  className="text-white w-full" />. */}
        <ul className='py-8'>
          {menuItems.map((item) => (
            <li key={item.name} className='p-4'>
              <a href={item.path} className="nav-link">
                <span className="icon">{item.icon}</span>
                {sidebarOpen && <span className="label">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
          <div type="button" onClick={()=>navigate("/")} className='px-2'>
          <span >Home</span>
      </div>
          <div type="button" onClick={()=>setLogout(true)} className='px-2 hover:text-red-900'>
          <span >Logout</span>
      </div>
  <button
    type="button"
    onClick={() => setProfileOpen((prev) => !prev)}
    className="flex h-8 items-center gap-2 rounded-full border border-blue-600 p-1"
  >
   Profile
  </button>

  {profileOpen && (
    <div className="absolute right-0 top-full z-[9999] mt-3 w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
      <p className="font-semibold text-slate-900">
        {user?.name}
      </p>
     <p className="font-semibold text-slate-900 ">
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
      </nav>

      <div className="sidebar-footer">
        <p>{sidebarOpen && 'Admin Settings'}</p>
      </div>
    </aside>
  )
}
