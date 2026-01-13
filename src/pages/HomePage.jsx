import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
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
      className="flex flex-col items-center justify-center text-center min-h-[90vh]"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <Card className="w-full max-w-[700px] p-12 max-md:p-8">
        <motion.h1
          className="font-netflix text-[8rem] max-md:text-[5rem] font-medium tracking-wide text-netflix-red [text-shadow:0_0_10px_rgba(0,0,0,0.5)]"
          variants={itemVariants}
        >
          FilmFolio
        </motion.h1>

        <motion.div
          className="text-base font-sans text-text-headings mb-8 -mt-8 h-6 font-light tracking-wider"
          variants={itemVariants}
        >
          <TypeAnimation
            sequence={[1200, "By Von Mendres 「馬盛中」", 5000]}
            wrapper="span"
            speed={50}
            cursor={true}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          className="text-xl max-md:text-lg max-w-[600px] mb-10 leading-relaxed"
          variants={itemVariants}
        >
          <strong className="text-[1.35rem] font-semibold text-text-headings">
            Never forget a movie again.
          </strong>
          <br />
          <span className="text-lg opacity-70">
            Easily keep track of movies you want to watch.
          </span>
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center">
          <Link to="/login" className="no-underline">
            <Button>
              Login <FiLogIn style={{ marginLeft: "8px" }} />
            </Button>
          </Link>
        </motion.div>

        <motion.div className="mt-6 text-white/60" variants={itemVariants}>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-netflix-red font-medium no-underline transition-colors hover:underline hover:text-netflix-red-hover"
          >
            Sign Up
          </Link>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default HomePage;
