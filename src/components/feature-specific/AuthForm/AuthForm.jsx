import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Card from "../../common/Card/Card";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import styles from "./AuthForm.module.css";

const AuthForm = ({ isRegister = false }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await register(formData);
        navigate("/login");
      } else {
        await login(formData);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.msg || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Card className={styles.authCard}>
        <h1 className={styles.title}>{isRegister ? "Create Account" : "Welcome Back"}</h1>
        <p className={styles.subtitle}>
          {isRegister ? "Never forget a movie again." : "Never forget a movie again."}
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
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttonWrapper}>
            <Button type="submit" loading={loading} disabled={loading}>
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
