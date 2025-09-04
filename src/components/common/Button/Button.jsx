// src/components/common/Button/Button.jsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";
import Loader from "../Loader/Loader";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  ...props
}) => {
  return (
    <motion.button
      className={styles.styledButton} // Use the new class name
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}>
      {loading ? <Loader /> : children}
    </motion.button>
  );
};

export default Button;
