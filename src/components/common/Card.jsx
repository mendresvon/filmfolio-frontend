import React from "react";
import { motion } from "framer-motion";

const Card = ({ children, className }) => {
  return (
    <motion.div
      className={`bg-glass-bg rounded-2xl p-8 border border-glass-border backdrop-blur-[20px] transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4),0_0_30px_var(--color-accent-glow)] ${className || ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
