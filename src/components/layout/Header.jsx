import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { FiLogOut, FiLogIn } from "react-icons/fi";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <motion.header
      className="px-8 sticky top-0 z-10 bg-[rgba(17,17,17,0.7)] backdrop-blur-[10px] border-b border-glass-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <NavLink
          to="/dashboard"
          className="font-netflix text-4xl font-bold text-netflix-red no-underline flex items-center tracking-wide text-shadow hover:scale-[1.03] transition-transform my-1"
        >
          <span>FilmFolio</span>
        </NavLink>
        <nav className="flex items-center gap-6 max-md:gap-3">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-text-primary no-underline text-base relative transition-colors flex items-center gap-1 max-md:text-sm max-md:px-2 max-md:py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-netflix-red after:origin-bottom-right after:transition-transform after:duration-250 hover:text-text-headings hover:after:scale-x-100 hover:after:origin-bottom-left ${isActive ? "text-text-headings after:scale-x-100 after:origin-bottom-left" : ""}`
                }>
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-transparent border-none text-text-primary cursor-pointer text-base flex items-center gap-1 max-md:text-sm max-md:px-2 max-md:py-1"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-text-primary no-underline text-base relative transition-colors flex items-center gap-1 max-md:text-sm max-md:px-2 max-md:py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-netflix-red after:origin-bottom-right after:transition-transform after:duration-250 hover:text-text-headings hover:after:scale-x-100 hover:after:origin-bottom-left ${isActive ? "text-text-headings after:scale-x-100 after:origin-bottom-left" : ""}`
                }>
                <FiLogIn /> Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-white no-underline text-base relative transition-colors flex items-center gap-1 bg-netflix-red px-4 py-2 rounded-full hover:bg-netflix-red-hover hover:shadow-[0_0_15px_var(--color-accent-glow)]"
              >
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