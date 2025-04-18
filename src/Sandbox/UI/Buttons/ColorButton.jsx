import MotionButton from "./MotionButton";
import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { motion } from "framer-motion";
import "./buttons.css";

/**
 * @typedef {ColorButton} - button type for adding/editing colors in scenes
 * @property {Component} children - allows for components with parent-child relationships
 * @property {Number} id - the number associated with the button, used for correlation with color in ColorWindow.
 * @property {[{string}]} colorList - a list of colors to be changed on update.
 */
const ColorButton = ({
  colorList,
  setColorList,
  id,
  hasSwatch,
  children,
  ...props
}) => {
  const [canChooseColor, setChooseColor] = useState(false);
  const buttonRef = useRef(null);
  const [swatchColor, setColor] = useState(colorList[id - 1]);
  const colorCard = {
    backgroundColor: swatchColor ? swatchColor : "#FF0000",
    height: "3vh",
    width: "100%",
    marginBottom: "2%",
    borderRadius: "3px",
  };

  /**
   *close drop down color picker if click is outside of designated color
   *@param {Event} event - finds location of mouse.
   */
  const handleClick = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setChooseColor(false);
    }
  };

  /**
   * removes the color from colorList
   */
  const removeColor = () => {
    colorList.splice(id - 1, 1);
    setColorList([...colorList]);
  };

  /**
   * opens up color picker menu.
   */
  const changeColor = () => {
    setChooseColor(!canChooseColor);
  };

  /**
   *updates the color of the color's swatch
   *@param {object} newColor - color to be changed to
   */
  const updateColor = (newColor) => {
    setColor(newColor);
    colorList[id - 1] = newColor;
    setColorList([...colorList]);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    setColor(colorList[id - 1]);
  }, [colorList]);

  return (
    <div ref={buttonRef} className="color-button-container-style">
      <MotionButton
        {...props}
        hasBorder={false}
        className="color-button-style"
        onClick={changeColor}
      >
        {children}
        {hasSwatch && <div style={colorCard} />}
      </MotionButton>

      {canChooseColor && (
        <div className="color-picker-container">
          {
            <HexColorPicker
              color={swatchColor}
              onChange={(newColor) => {
                updateColor(newColor);
              }}
            />
          }
          {/*remove color button*/}
          {colorList.length > 1 && (
            <motion.div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                backgroundColor: "#FFFFFF",
                color: "#FF7A7A",
              }}
              whileHover={{ backgroundColor: "#FDB5B5", color: "#FF0000" }}
              whileTap={{ backgroundColor: "#FF5252" }}
              onClick={removeColor}
            >
              Remove Color
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorButton;
