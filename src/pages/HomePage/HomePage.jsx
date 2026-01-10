import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import styles from "./HomePage.module.css";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import { FiLogIn } from "react-icons/fi";

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
      <Card className={styles.homeCard}>
        <motion.h1 className={styles.title} variants={itemVariants}>
          FilmFolio
        </motion.h1>

        <motion.div className={styles.author} variants={itemVariants}>
          <TypeAnimation
            sequence={[1200, "By Von Mendres 「馬盛中」", 5000]}
            wrapper="span"
            speed={50}
            cursor={true}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          <strong>Never forget a movie again.</strong>
          <br />
          <span className={styles.subtitleSecondary}>
            Easily keep track of movies you want to watch.
          </span>
        </motion.p>

        <motion.div variants={itemVariants} className={styles.buttonContainer}>
          <Link to="/login" className={styles.buttonLink}>
            <Button>
              Login <FiLogIn style={{ marginLeft: "8px" }} />
            </Button>
          </Link>
        </motion.div>

        <motion.div className={styles.secondaryAction} variants={itemVariants}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.loginLink}>
            Sign Up
          </Link>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default HomePage;
