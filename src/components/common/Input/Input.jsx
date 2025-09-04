import React from "react";
import styles from "./Input.module.css";

const Input = ({ label, type = "text", name, value, onChange, placeholder, ...props }) => {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        className={styles.input}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        {...props}
      />
    </div>
  );
};

export default Input;
