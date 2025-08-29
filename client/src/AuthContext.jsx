// Authentication of User
import { createContext, useContext, useEffect, useState } from "react";// React
import api from "./axios.jsx";// Api

const AuthContext = createContext(null);// Craete context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);// User State
  const [hydrated, setHydrated] = useState(false);
  // Login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };
  // Google Login
  const GoogleLogin = (data) => {
    const { token, user } = data;
    localStorage.setItem("token", token);
    setUser(user);
  };
  // Register
  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };
  // Logout
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  // User Info
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setHydrated(true);
      return;
    }
    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setUser(res.data.user || res.data);
    } catch (err) {
      console.error("Fetch user failed:", err);
      setUser(null);
      localStorage.removeItem("token"); 
    } finally {
      setHydrated(true);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const value = { user, login, register, logout, hydrated, GoogleLogin };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
