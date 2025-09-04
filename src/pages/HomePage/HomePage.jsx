import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
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
        FilmFolio
      </motion.h1>

      <motion.div className={styles.author} variants={itemVariants}>
        <TypeAnimation
          sequence={[
            1200, // Wait 1.2s after page load before typing
            "By Von Mendres",
            5000,
          ]}
          wrapper="span"
          speed={50}
          cursor={true}
          repeat={Infinity}
        />
      </motion.div>

      <motion.p className={styles.subtitle} variants={itemVariants}>
        {/* --- START: BOLDED TEXT --- */}
        <strong>Never forget a movie again.</strong>
        {/* --- END: BOLDED TEXT --- */}
        <br />
        Easily keep a list of films you've seen and want to see next.
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
