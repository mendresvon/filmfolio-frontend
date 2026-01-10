import React, { createContext, useState, useEffect } from "react";
import { loginUser as apiLogin, registerUser as apiRegister } from "../api/authService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // check token on mount/change
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // clear expired token
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        } else {
          setUser(decoded.user);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (credentials) => {
    const data = await apiLogin(credentials);
    // save token and update state
    localStorage.setItem("token", data.token);
    setToken(data.token);
    const decoded = jwtDecode(data.token);
    setUser(decoded.user);
  };

  const register = async (userData) => {
    await apiRegister(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    // force reload to clear state and redirect
    window.location.href = '/';
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};