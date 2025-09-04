import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        // On successful registration, redirect to login
        navigate("/login");
      } else {
        await login(formData);
        // On successful login, redirect to dashboard
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
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttonWrapper}>
            <Button type="submit" loading={loading} disabled={loading}>
              {isRegister ? "Register" : "Login"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AuthForm;
