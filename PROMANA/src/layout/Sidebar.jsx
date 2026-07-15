import { useState } from 'react'
import { X } from "lucide-react";

export default function Sidebar({sidebarOpen,setSidebarOpen}) {

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
<div className='flex items-center justify-between p-4'>
  <h1 className='lg:hidden text-xl font-bold text-white'>
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
      </nav>

      <div className="sidebar-footer">
        <p>{sidebarOpen && 'Admin Settings'}</p>
      </div>
    </aside>
  )
}
