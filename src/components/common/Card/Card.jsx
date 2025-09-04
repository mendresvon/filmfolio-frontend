import React from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.css";

const Card = ({ children, className }) => {
  return (
    <motion.div
      className={`${styles.glassCard} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
};

export default Card;
