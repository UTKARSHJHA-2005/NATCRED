import { createContext, useContext, useEffect, useState } from "react";
import api from "./axios.jsx";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };
    const GoogleLogin = (data) => {
    const { token, user } = data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setHydrated(true);
      return;
    }

    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` } // fallback in case interceptor fails
      });
      setUser(res.data.user || res.data);
    } catch (err) {
      console.error("Fetch user failed:", err);
      setUser(null);
      localStorage.removeItem("token"); // clear invalid token
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
