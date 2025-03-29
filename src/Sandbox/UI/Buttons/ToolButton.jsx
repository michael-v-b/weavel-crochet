import MotionButton from "./MotionButton.jsx";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

/**
 * @typedef {ModeButton} - button sketch type for changing mode to scene.
 * @property {boolean} canPress - will not change background if pressed if set to false.
 * @property {Component} children - allows for components with parent-child relationships.
 */
const ToolButton = forwardRef(function ToolButton({ children, ...props }, ref) {
  const [isPressed, setPressed] = useState(false);

  /*@function handleClick - sets the button to pressed state and maintains further click functionality */
  const handleClick = () => {
    setPressed(!isPressed);
    props.onClick();
  };

  useImperativeHandle(ref, () => ({
    isPressed,
    setPressed,
  }));

  const modeButtonStyle = {
    marginLeft: "1%",
    marginRight: "1%",
    height: "10%",
    aspectRatio: 1 / 1,
    backgroundColor: isPressed ? "#a8c5d8" : "#ebf5fb ",
    borderRadius: "5px",
    borderColor: "#6fbeff",
    borderStyle: "solid",
  };
  return (
    <MotionButton
      {...props}
      borderColor={"#29ffed"}
      onClick={handleClick}
      style={modeButtonStyle}
    >
      {children}
    </MotionButton>
  );
});

export default ToolButton;
