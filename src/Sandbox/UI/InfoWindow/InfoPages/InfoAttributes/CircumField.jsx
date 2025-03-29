import "../InfoPages.css";
import { useState} from "react";
import useStore from "../../../../DevTools/store";

/**
 * @typedef {CircumField} - A field in the info window that is used to change an object's circumference.
 * @property {GetFocusedCallback} - Lets boolean isFocused be accessible by Parents.
 * @property {Mesh} object - object whose circumference is being changed
 * @returns {Component} - div that represents the circumference.
 */
const CircumferenceField = ({ object }) => {
  const [circum, setCircum] = useState(object.userData.meshData.circum);
  const [action, setAction] = useState(["circum"]);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const setRadius = object.userData.meshData.setRadius;

  /**
   * When input field is changed, update the circum accordingly
   * @param {Event} e - used to find new value in input field.
   */
  const handleChange = (e) => {
    const initNumber = parseInt(e.target.value);
    if (isNaN(initNumber) || initNumber < 0) {
      setCircum(0);
    } else {
      setCircum(initNumber);
    }
  };

  /**
   * Calculates radius given current circum.
   * Rounds Circumference.
   */
  const findRadius = () => {
    const roundedCircum = Math.max(6, 6 * Math.floor(circum / 6));

    setCircum(roundedCircum);
    const output = roundedCircum / (2 * Math.PI);

    action.push(object);
    action.push(object.userData.meshData.radius);
    action.push(output * CONV_RATE);
    action.push(object.userData.meshData.circum);
    action.push(circum);

    undoList.push(action);

    setUndoList([...undoList]);
    setAction(["circum"]);

    object.userData.meshData.setCircum(roundedCircum);
    const newRadius = output / CONV_RATE;
    return newRadius;
  };

  /**
   * Sets the focused state to true when input field is focused on.
   */
  const handleFocused = () => {
    setFocused(true);
  };

  /**
   * Set focused stated to false and updates the radius in the scene.
   */
  const handleBlur = () => {
    setRadius(findRadius());

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.circum = circum;
    setProjectFile({ ...projectFile });

    setFocused(false);
  };
  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">Circum: </div>
        <input
          className="attribute small field-style"
          type="text"
          value={circum}
          onFocus={handleFocused}
          onBlur={handleBlur}
          onChange={handleChange}
        />{" "}
        <div className="stitch-text">stitches</div>
      </div>
    </>
  );
};

export default CircumferenceField;
