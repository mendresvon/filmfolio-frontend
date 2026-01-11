import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Card from "../../common/Card/Card";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import styles from "./AuthForm.module.css";

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
    // clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // password confirmation check for registration
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
      // handle express-validator errors (array format) or simple msg format
      const errorMessage = err.errors 
        ? err.errors.map(e => e.msg).join(', ') 
        : (err.msg || "An unexpected error occurred.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Card className={styles.authCard}>
        <h1 className={styles.title}>{isRegister ? "Create Account" : "Welcome Back"}</h1>
        <p className={styles.subtitle}>
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
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <div className={styles.buttonWrapper}>
            <Button type="submit" loading={loading} disabled={loading || success}>
              {isRegister ? "Create Account" : "Login"}
            </Button>
          </div>
        </form>
        <div className={styles.switchAuth}>
          {isRegister ? (
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;

