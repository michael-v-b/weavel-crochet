import "../InfoPages.css";
import React, { useState } from "react";
import useStore from "../../../../DevTools/store";

/**
 * @typedef {NameField} - Input field used to edit an object's name.
 * @property {Object} object - object whose name is being changed.
 * @returns {Component} - input field that takes a string which represents the object's name.
 */
const NameField = ({ object }) => {
  const [action, setAction] = useState(["name"]);
  const [name, setName] = useState(object.name);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  /**
   * Sets internal name property to value in inputField.
   *@param {Event} event - used to get value in inputField.
   */
  const handleChange = (event) => {
    setName(event.target.value);
  };

  /**
   * Sets the focused state to true when input field is focused on.
   */
  const handleFocused = () => {
    setFocused(true);
  };

  /**
   * updates the object's name after deselecting.
   */
  const handleBlur = () => {
    //update undoList
    action.push(object);
    action.push(object.name);
    action.push(name);
    undoList.push(action);
    setUndoList(...[undoList]);
    setAction(["name"]);

    //actually change name
    object.userData.cellRef.setName(name);
    object.name = name;

    //update project file
    console.log("update project file");
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.name = name;
    setProjectFile({ ...projectFile });

    setFocused(false);
  };
  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">Name: </div>
        <input
          className="attribute large field-style"
          type="text"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleChange}
          onFocus={handleFocused}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
};

export default NameField;
