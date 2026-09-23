import React, { createContext, useState, useEffect } from "react";
import { loginUser as apiLogin, registerUser as apiRegister } from "../api/authService";
import { jwtDecode } from "jwt-decode";
import { getTokenExpirationTime } from "../auth/tokenExpiry";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Restore the session and clear it when the server-issued token expires.
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return undefined;
    }

    let expiryTimer;
    try {
      const decoded = jwtDecode(token);
      const expiresAt = getTokenExpirationTime(token);
      if (!decoded.user || expiresAt === null || expiresAt <= Date.now()) {
        throw new Error("Token is expired or missing required claims");
      }

      setUser(decoded.user);
      expiryTimer = window.setTimeout(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }, expiresAt - Date.now());
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }

    return () => window.clearTimeout(expiryTimer);
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
    setToken(null);
    setUser(null);
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
