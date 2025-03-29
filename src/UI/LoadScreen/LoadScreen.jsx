import logo from "../../assets/logo.png";
import React, { useState} from "react";
import { motion } from "framer-motion";
import "./LoadScreen.css";

const LoadScreen = ({ visible }) => {
  const DOT_LENGTH = 5;
  const [exists, setExists] = useState(true);
  const animationEnd = () => {
    if (!visible) {
      setExists(false);
    }
  };
  return (
    <>
      {exists && (
        <motion.div
          animate={{ opacity: visible ? 1 : 0 }}
          onAnimationComplete={animationEnd}
          className="load-screen"
        >
          <motion.img
            className="load-logo"
            animate={{ rotate: 360 }}
            transition={{
              duration: DOT_LENGTH,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            src={logo}
          />

          <div className="load-dots-container">
            {[0, 1, 2].map((index) => {
              return (
                <motion.div
                  key={index}
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.2,
                  }}
                  className="load-dot"
                ></motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default LoadScreen;
