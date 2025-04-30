import "../InfoPages.css";
import { useEffect, useState } from "react";
import useStore from "../../../../DevTools/store";

/**
 * @typedef {HeightField} - A field used to edit an object's height.
 * @property {Object} object - object whose height is being edited.
 * @property {string} heightName - the text that appears on the height attribute.
 * @property {Number} currentBase - states the current circumference of the object.
 * @returns {Component} - div with an input field that represents the object's height.
 */
const HeightField = ({
  heightName = "Height",
  object,
  currentBase,
  maxRate,
}) => {
  const [objectData, setObjectData] = useState(object.userData.meshData);
  const [height, setHeight] = useState(objectData.height);
  const [action, setAction] = useState(["height"]);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const HEIGHT_PAD = 2;

  useEffect(() => {
    setObjectData(object.userData.meshData);
    setHeight(object.userData.meshData.height);
  }, [object]);

  /**
   *updates the internal height when input field is edited.
   *@param {Event} e - Used to find input field's value.
   */
  const handleChange = (e) => {
    const initNumber = parseInt(e.target.value);

    if (isNaN(initNumber)) {
      setHeight(0);
    } else {
      setHeight(initNumber);
    }
  };

  /**
   * Sets the focused state to true when input field is focused on.
   */
  const handleFocus = () => {
    setFocused(true);
  };

  /**
   * Set height once circum changes
   */

  useEffect(() => {
    if (!currentBase) {
      return;
    }
    let temp = Math.ceil(Math.max(currentBase / maxRate, height));
    //hard coded bad practice
    // in the case of a triangle with base 2 set the height to 2
    if (currentBase == 2) {
      temp = Math.max(2, height);
    }
    setHeight(temp);
    objectData.setHeight(temp);
  }, [currentBase]);

  /**
   * Updates the object's height when input field is no longer selected and sets focused state to false.
   */
  const handleBlur = () => {
    let temp = height;

    action.push(object);
    action.push(objectData.height);
    action.push(temp);
    undoList.push(action);

    if (currentBase != 2) {
      temp = Math.ceil(Math.max(currentBase / maxRate, height));
    } else {
      temp = Math.max(2, height);
    }

    objectData.setHeight(temp);

    setUndoList([...undoList]);
    setAction(["height"]);

    setHeight(temp);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.height = temp;
    setProjectFile({ ...projectFile });

    setFocused(false);
  };
  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">{heightName} </div>
        <input
          className="small field-style"
          type="text"
          value={height}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <div className="stitch-text">stitches</div>
      </div>
    </>
  );
};

export default HeightField;
