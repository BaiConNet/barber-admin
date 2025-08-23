/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [auth, setAuth] = useState(() => {
    // Carrega do localStorage ao iniciar
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return token && user ? { token, user: JSON.parse(user) } : { token: null, user: null };
  });

  // Salva no localStorage sempre que auth mudar
  useEffect(() => {
    if (auth.token && auth.user) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [auth]);

  const login = (data) => {
    // data = { token, user } vindo do backend
    setAuth(data);
  };

  const logout = () => {
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
