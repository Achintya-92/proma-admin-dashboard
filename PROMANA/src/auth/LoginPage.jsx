import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "./context/AuthContext";

export default function LoginPage() {
const { login } = useAuth();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate=useNavigate();

const handleSubmit=(e)=>{
e.preventDefault();

  const loggedInUser = login(name,email, password);

  if (!loggedInUser) {
    alert("Invalid email or password");
    return;
  }login(name,email,password);


  if (loggedInUser.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/products");
  }
}

return (
    <>
    <div className="h-20 bg-slate-700 shadow-md flex items-center justify-center">
     <h1 className="text-2xl md:text-3xl lg:text-4xl text-white">
      PROMA
     </h1>
    </div>
 <div className="relative bg-light flex justify-center px-4 py-10">
      <div className="w-full
      max-w-md 
      p-8
      sm:p-10
      bg-white
      shadow-2xl
      rounded-3xl
    bg-gradient-to-br from-blue-50 via-white to-emerald-50
    hover:scale-103
    transition
    duration-800
      "
      >
        <div className="">
            <h1 className="text-[3xl,4xl,5xl] font-bold flex justify-center">Login</h1>
         <p className="text-gray-500 flex justify-center mt-2 mb-4">
            Login to continue exploring products
          </p>
        </div>
          <form onSubmit={handleSubmit}>
            <div>
            <label className="block mb-l font-medium">Username</label>
          </div>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 outline-none focus:border-blue-500"
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
             <div>
            <label className="block mb-l font-medium">Email</label>
          </div>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 outline-none focus:border-blue-500"
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div>
            <label className="block mb-l font-medium">Password</label>
          </div>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2  mb-8 outline-none focus:border-blue-500"
            type="password"
            name="password"
            id="password"
            
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
          </form>
      </div>
    </div>
    <div className="flex justify-center py-10">
    <div className="w-full max-w-md border border-indigo-100 bg-indigo-50 p-8 rounded-xl">
       <p className="text-xl font-semibold text-indigo-900 w-full flex justify-center">
    Demo Credentials
  </p>
  <div className="w-full flex justify-center gap-8">
  <div className="mt-3 space-y-3 text-sm">
    <div>
      <p className="font-medium text-slate-900">Admin</p>
      <p className="text-slate-600">
        admin@proma.com
      </p>
      <p className="text-slate-600">
        Password: admin123
      </p>
    </div>
    </div>
<div className="mt-3 space-y-3 text-sm">
    <div>
      <p className="font-medium text-slate-900">User</p>
      <p className="text-slate-600">
        user@proma.com
      </p>
      <p className="text-slate-600">
        Password: user123
      </p>
    </div>
</div>
  </div>
    </div>
</div>
    </>
  )
}

