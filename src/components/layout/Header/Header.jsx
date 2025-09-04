// src/components/layout/Header/Header.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Header.module.css";
import { FiFilm, FiLogOut, FiLogIn } from "react-icons/fi";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <div className={styles.headerContent}>
        <NavLink to="/" className={styles.logo}>
          <FiFilm />
          <span>FilmFolio</span>
        </NavLink>
        <nav className={styles.nav}>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }>
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }>
                <FiLogIn /> Login
              </NavLink>
              <NavLink to="/register" className={`${styles.navLink} ${styles.registerButton}`}>
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
