import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const SampleUsers = [
  {
    id: 1,
    email: "admin@promana.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    email: "user@promana.com",
    password: "user123",
    role: "user",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const login = (name,email, password) => {
    const matchedUser = SampleUsers.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!matchedUser) return null;

    const sessionUser = {
      id: matchedUser.id,
      name:name,
      email: matchedUser.email,
      role: matchedUser.role,
    };

    setUser(sessionUser);

    localStorage.setItem(
      "user",
      JSON.stringify(sessionUser)
    );

    return sessionUser;
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);