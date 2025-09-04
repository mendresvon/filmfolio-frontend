import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Button from "../../components/common/Button/Button";
import { FiArrowRight } from "react-icons/fi";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={styles.homeContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.h1 className={styles.title} variants={itemVariants}>
        Curate Your Cinema.
      </motion.h1>
      <motion.p className={styles.subtitle} variants={itemVariants}>
        Create, manage, and share personalized movie watchlists. <br />
        Your ultimate film journey begins here.
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link to="/register">
          <Button>
            Get Started <FiArrowRight style={{ marginLeft: "8px" }} />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
