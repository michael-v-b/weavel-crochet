import MotionButton from "./MotionButton";
import React, { useState, forwardRef, useImperativeHandle } from "react";
/**
 * @typedef {ModeButton} - button sketch type for changing mode to scene.
 * @property {boolean} canPress - will not change background if pressed if set to false.
 * @property {Component} children - allows for components with parent-child relationships.
 */
const ModeButton = forwardRef(function ModeButton(
  { canPress = true, children, ...props },
  ref
) {
  const [isPressed, setPressed] = useState(false);

  /*@function handleClick - sets the button to pressed state and maintains further click functionality */
  const handleClick = () => {
    props.onClick();
    if (canPress) {
      setPressed(!isPressed);
    }
  };

  useImperativeHandle(ref, () => ({
    setPressed,
  }));

  const modeButtonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "1%",
    marginRight: "1%",
    height: "50%",
    width: "50%",
    aspectRatio: 1 / 1,
    backgroundColor: isPressed ? "#c4b15f" : "#f9de70",
    borderRadius: "5px",
    borderColor: "#FBBA17",
    borderStyle: "solid",
    fontSize: "2vh",
  };
  return (
    <MotionButton
      {...props}
      borderColor={"#f5a94c"}
      onClick={handleClick}
      style={modeButtonStyle}
    >
      {children}
    </MotionButton>
  );
});

export default ModeButton;
