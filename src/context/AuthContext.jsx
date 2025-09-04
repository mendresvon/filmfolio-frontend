import React, { createContext, useState, useEffect } from "react";
import { loginUser as apiLogin, registerUser as apiRegister } from "../api/authService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // This effect runs when the component mounts or the token changes.
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // If token is expired, clear it without redirecting
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
    localStorage.setItem("token", data.token); // Set token in storage
    setToken(data.token); // Set token in state
    const decoded = jwtDecode(data.token);
    setUser(decoded.user);
  };

  const register = async (userData) => {
    await apiRegister(userData);
  };

  // --- THE FIX IS HERE ---
  // The logout function now directly handles the page navigation.
  const logout = () => {
    localStorage.removeItem("token");
    // This forces a full page reload to the homepage, clearing all state
    // and bypassing any React Router race conditions.
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