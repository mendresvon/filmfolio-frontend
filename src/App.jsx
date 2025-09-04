import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/layout/Header/Header";
import AnimatedLayout from "./components/layout/AnimatedLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Header />
      <main className="main-container">
        <Routes>
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

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AnimatedLayout>
                  <DashboardPage />
                </AnimatedLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
