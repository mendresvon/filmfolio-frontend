// src/App.jsx

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import AnimatedLayout from "./components/layout/AnimatedLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import WatchlistDetailPage from "./pages/WatchlistDetailPage/WatchlistDetailPage";
import DashboardLayout from "./components/layout/DashboardLayout"; // Import the layout

function App() {
  return (
    <AuthProvider>
      <main className="main-container">
        <Routes>
          {/* --- Public routes WITHOUT the header --- */}
          <Route
            path="/"
            element={
              <AnimatedLayout>
                <HomePage />
              </AnimatedLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AnimatedLayout>
                <LoginPage />
              </AnimatedLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AnimatedLayout>
                <RegisterPage />
              </AnimatedLayout>
            }
          />

          {/* --- Protected Routes WITH the header via DashboardLayout --- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedLayout>
                    <DashboardPage />
                  </AnimatedLayout>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedLayout>
                    <WatchlistDetailPage />
                  </AnimatedLayout>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;