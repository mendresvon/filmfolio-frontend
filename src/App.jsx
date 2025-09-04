// src/App.jsx

import { Routes, Route } from "react-router-dom";
// Corrected Imports: AuthProvider and useAuth come from different files.
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

// This inner component allows us to use the useAuth hook
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* This line correctly shows the Header only when the user is authenticated */}
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