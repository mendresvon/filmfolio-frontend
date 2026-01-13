import React from "react";

const Input = ({ label, type = "text", name, value, onChange, placeholder, className = "", ...props }) => {
  return (
    <div className={`w-full mb-6 ${className}`}>
      {label && (
        <label htmlFor={name} className="block mb-2 text-text-primary text-sm">
          {label}
        </label>
      )}
      <input
        id={name}
        className="w-full py-3 px-4 border border-glass-border bg-black/20 text-text-primary rounded-lg text-base outline-none transition-all duration-300 hover:border-netflix-red/50 focus:border-netflix-red focus:shadow-[0_0_0_3px_var(--color-accent-glow)] placeholder:text-white/40"
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
