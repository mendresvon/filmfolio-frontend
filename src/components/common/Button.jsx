import React from "react";
import { motion } from "framer-motion";

import Loader from "./Loader";

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
      className="px-10 py-4 rounded-full border-none bg-netflix-red text-text-headings font-medium cursor-pointer text-base shadow-lg transition-all flex items-center justify-content-center hover:-translate-y-0.5 hover:shadow-[0_8px_25px_var(--color-accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-glass-border"
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
