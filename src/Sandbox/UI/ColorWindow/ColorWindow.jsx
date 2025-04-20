import "../../styles.css";
import "./ColorWindow.css";
import ColorButton from "../Buttons/ColorButton/ColorButton";
import MotionButton from "../Buttons/MotionButton";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useStore from "../../DevTools/store";

/**
 * add new colors
 * remove colors
 * when you click on color change it
 * each button will be color 1
 * Have color field that changes color based on the different colors available
 
 */

const ColorWindow = () => {
  const colorList = useStore((state) => state.colorList);
  const setColorList = useStore((state) => state.setColorList);
  const OBJECT_LIMIT = useStore((state) => state.OBJECT_LIMIT);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const addColor = (color) => {
    if (colorList.length < OBJECT_LIMIT) {
      setColorList([...colorList, color]);
    }
  };

  useEffect(() => {
    if (projectFile) {
      projectFile.colorList = colorList;
      setProjectFile({ ...projectFile });
    }
  }, [colorList]);

  return (
    <div className="side-window">
      <div className="side-title-bar "> Colors </div>
      <div className="color-window">
        {colorList.map((color, key) => {
          return (
            <ColorButton
              key={key}
              setColorList={setColorList}
              colorList={colorList}
              hasSwatch={true}
              id={key + 1}
            >
              {"Color " + (key + 1)}
            </ColorButton>
          );
        })}

        <div className="add-button-container">
          <motion.button
            className="button-style"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              addColor("#FF0000");
            }}
          >
            +
          </motion.button>
        </div>
      </div>
    </div>
  );
};
export default ColorWindow;
