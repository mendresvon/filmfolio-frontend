// src/App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

// --- THE FIX: Corrected import paths for AuthProvider and useAuth ---
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

import Header from "./components/layout/Header/Header";
import AnimatedLayout from "./components/layout/AnimatedLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import WatchlistDetailPage from "./pages/WatchlistDetailPage/WatchlistDetailPage";

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // This effect will run whenever the user navigates to a new page
  useEffect(() => {
    const protectedPaths = ['/dashboard', '/watchlist'];
    const isProtected = protectedPaths.some(path => location.pathname.startsWith(path));

    // Add or remove the dashboard-bg class from the body tag
    if (isAuthenticated && isProtected) {
      document.body.classList.add('dashboard-bg');
    } else {
      document.body.classList.remove('dashboard-bg');
    }
  }, [location, isAuthenticated]); // Re-run the effect when location or auth state changes

  return (
    <>
      {isAuthenticated && <Header />}
      
      <main className="main-container">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<AnimatedLayout><HomePage /></AnimatedLayout>} />
          <Route path="/login" element={<AnimatedLayout><LoginPage /></AnimatedLayout>} />
          <Route path="/register" element={<AnimatedLayout><RegisterPage /></AnimatedLayout>} />

          {/* --- Protected Routes --- */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><AnimatedLayout><DashboardPage /></AnimatedLayout></ProtectedRoute>}
          />
          <Route
            path="/watchlist/:id"
            element={<ProtectedRoute><AnimatedLayout><WatchlistDetailPage /></AnimatedLayout></ProtectedRoute>}
          />
        </Routes>
      </main>
    </>
  );
};

// The main App component wraps everything in the AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;