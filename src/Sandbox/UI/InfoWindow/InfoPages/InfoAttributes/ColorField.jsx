import "../InfoPages.css";
import { useState, useEffect } from "react";
import useStore from "../../../../DevTools/store";

/**
 * @typedef {ColorField} - the color of the given object
 * @property {Mesh} object - the object whose color will be changed.
 * @property {[string]} colorList - a list of all colors in project.
 * @returns {Component} - a component used to change the color of an object.
 */
const ColorField = ({ object }) => {
  const colorList = useStore((state) => state.colorList);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const objectData = object.userData;
  const [currentIndex, setCurrentIndex] = useState(objectData.colorIndex);
  const [currentColor, setCurrentColor] = useState(
    colorList[objectData.colorIndex - 1]
  );
  const [action, setAction] = useState(["objectColor"]);

  const [isWhite, setWhite] = useState(false);

  /**
   *When new option is selected, update currentcolor
   *@param {Event} event - new value for currentColor
   */
  const handleChange = (value) => {
    const newColor = colorList[value - 1];

    object.material.color.set(newColor);
    setCurrentColor(newColor);
    objectData.setColorIndex(value);
    setCurrentIndex(value);
    testWhite();

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.colorIndex = value;
    setProjectFile({ ...projectFile });
  };

  /**
   * tests whether the object's current color is dark enough to warrant changing
   * the field's color to white.
   */
  const testWhite = () => {
    const objectColor = object.material.color;

    if (Math.max(objectColor.r, objectColor.g, objectColor.b) < 0.5) {
      setWhite(true);
    } else {
      setWhite(false);
    }
  };
  /**
   * change background of field when the color changes.
   */
  useEffect(() => {
    const minIndex = Math.min(objectData.colorIndex, colorList.length);
    handleChange(minIndex);
  }, [colorList]);

  useEffect(() => {
    setCurrentIndex(objectData.colorIndex);
    setCurrentColor(colorList[objectData.colorIndex - 1]);
    testWhite();
  }, [object]);

  return (
    <div className="attribute">
      <div className="attribute attribute-name"> Color</div>
      <select
        value={currentIndex}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        style={{
          color: isWhite ? "#FFFFFF" : "#000000",
          backgroundColor: currentColor,
          borderRadius: "5px",
        }}
      >
        {colorList.map((value, key) => {
          return (
            <option
              key={key}
              style={{ backgroundColor: value }}
              value={key + 1}
            >
              Color {key + 1}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ColorField;
