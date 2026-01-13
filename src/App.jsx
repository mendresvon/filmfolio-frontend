import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

import Header from "./components/layout/Header";
import AnimatedLayout from "./components/layout/AnimatedLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import WatchlistDetailPage from "./pages/WatchlistDetailPage";

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // update body class on navigation
  useEffect(() => {
    const protectedPaths = ['/dashboard', '/watchlist'];
    const isProtected = protectedPaths.some(path => location.pathname.startsWith(path));

    if (isAuthenticated && isProtected) {
      document.body.classList.add('dashboard-bg');
    } else {
      document.body.classList.remove('dashboard-bg');
    }
  }, [location, isAuthenticated]);

  return (
    <>
      {isAuthenticated && <Header />}
      
      <main className="main-container">
        <Routes>
          {/* public routes */}
          <Route path="/" element={<AnimatedLayout><HomePage /></AnimatedLayout>} />
          <Route path="/login" element={<AnimatedLayout><LoginPage /></AnimatedLayout>} />
          <Route path="/register" element={<AnimatedLayout><RegisterPage /></AnimatedLayout>} />

          {/* protected routes */}
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;