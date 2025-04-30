import "../InfoPages.css";
import { useEffect, useState } from "react";
import useStore from "../../../../DevTools/store";

/**
 * @typedef {BaseField} - A field used to edit an object's base.
 * @property {Object} object - object whose base is being edited.
 * @returns {Component} - div with an input field that represents the object's base.
 */
const BaseField = ({ object, getBase }) => {
  const [objectData, setObjectData] = useState(object.userData.meshData);

  const [action, setAction] = useState(["base"]);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const [base, setBase] = useState(objectData.base);

  useEffect(() => {
    setObjectData(object.userData.meshData);
    setBase(object.userData.meshData.base);
  }, [object]);

  /**
   *updates the internal base when input field is edited.
   *@param {Event} e - Used to find input field's value.
   */
  const handleChange = (e) => {
    const initNumber = parseInt(e.target.value);

    if (isNaN(initNumber)) {
      setBase(0);
    } else {
      setBase(initNumber);
    }
  };

  /**
   * Sets the focused state to true when input field is focused on.
   */
  const handleFocus = () => {
    setFocused(true);
  };

  /**
   * Updates the object's height when input field is no longer selected and sets focused state to false.
   */
  const handleBlur = () => {
    let temp = Math.max(2, base);

    action.push(object);
    action.push(objectData.base);
    action.push(temp);
    undoList.push(action);

    objectData.setBase(temp);
    getBase(temp);

    setUndoList([...undoList]);
    setAction(["base"]);

    setBase(temp);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.base = temp;
    setProjectFile({ ...projectFile });

    setFocused(false);
  };

  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">Base: </div>
        <input
          className="small field-style"
          type="text"
          value={base}
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

export default BaseField;
