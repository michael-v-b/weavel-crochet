import { motion } from "framer-motion";
import React, { useState, forwardRef, useImperativeHandle } from "react";

/**
 * @typedef {MotionButton} - a button that will grow and shrink when the mouse hovers over it.
 * @property {Component} children - allows for components with parent-child relationships.
 */
const MotionButton = forwardRef(
  ({ hasBorder = true, borderColor, children, ...props }, ref) => {
    return (
      <motion.button
        className="motion-button"
        {...props}
        whileHover={{
          scale: 1.1,
          borderColor: borderColor,
          borderWidth: hasBorder ? "3px" : "0px",
        }}
        whileTap={{
          scale: 1,
          borderColor: "#FFFFFF",
        }}
        transition={{ type: "linear", duration: 0.1 }}
      >
        {children}
      </motion.button>
    );
  }
);
export default MotionButton;
