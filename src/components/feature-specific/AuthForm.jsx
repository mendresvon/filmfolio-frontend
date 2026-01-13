import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

const AuthForm = ({ isRegister = false }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (isRegister) {
        await register({ email: formData.email, password: formData.password });
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        await login({ email: formData.email, password: formData.password });
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage = err.errors 
        ? err.errors.map(e => e.msg).join(', ') 
        : (err.msg || "An unexpected error occurred.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <Card className="w-full max-w-[450px]">
        <h1 className="text-center font-netflix font-medium text-4xl tracking-wide text-netflix-red">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-center text-text-primary mb-10">
          {isRegister
            ? "Join FilmFolio and start tracking your movies."
            : "Sign in to access your watchlists."}
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete={isRegister ? "email" : "username"}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
          {isRegister && (
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          )}
          {error && <p className="text-error text-center mb-4">{error}</p>}
          {success && <p className="text-success text-center mb-4 font-medium">{success}</p>}
          <div className="flex justify-center mt-8">
            <Button type="submit" loading={loading} disabled={loading || success}>
              {isRegister ? "Create Account" : "Login"}
            </Button>
          </div>
        </form>
        <div className="mt-8 text-center text-sm text-white/60">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-netflix-red font-medium no-underline transition-colors hover:underline hover:text-netflix-red-hover">
                Sign In
              </Link>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-netflix-red font-medium no-underline transition-colors hover:underline hover:text-netflix-red-hover">
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
