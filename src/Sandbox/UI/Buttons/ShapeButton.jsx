import MotionButton from "./MotionButton";
import "./buttons.css";

/**
 * @typedef {ShapeButton} - button type for adding shapes to scene
 * @property {Component} children - allows for components with parent-child relationships
 */
const ShapeButton = ({ children, ...props }) => {
  return (
    <MotionButton
      {...props}
      borderColor={"#29ffed"}
      className="draw-button-style clickable"
    >
      {children}
    </MotionButton>
  );
};

export default ShapeButton;
