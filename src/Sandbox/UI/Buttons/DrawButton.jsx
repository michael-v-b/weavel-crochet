import MotionButton from "./MotionButton";
import "./buttons.css";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

/**
 * @typedef {DrawButton} - button type for adding shapes to scene
 * @property {Component} children - allows for components with parent-child relationships
 */
const DrawButton = ({ children, ...props }) => {
  return (
    <MotionButton
      {...props}
      borderColor={"#29ffed"}
      className="draw-button-style"
    >
      {children}
    </MotionButton>
  );
};

export default DrawButton;
