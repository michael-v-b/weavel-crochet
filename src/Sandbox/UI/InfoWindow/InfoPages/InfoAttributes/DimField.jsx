import "../InfoPages.css";
import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {DimField} - Input field that represents an objects dimensions in either 2d or 3d.
 * @property {Mesh} object - object whose dimension is being adjusted.
 * @property {Number} dimensions - the number fo dimensions the object has, either 2 or 3.
 */
const DimField = ({ object, dimensions }) => {
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const setWarningText = useStore((state)=>state.setWarningText);

  const objectData = object.userData.meshData;
  const [action, setAction] = useState(["dim"]);

  const [xDim, setX] = useState(objectData.xDim);
  const [yDim, setY] = useState(objectData.yDim);
  const [zDim, setZ] = useState(dimensions == 3 ? objectData.zDim : 0);
  const [isLinked, setLinked] = useState(objectData.linked);

  useEffect(()=>{
    setX(objectData.xDim);
    setY(objectData.yDim);
    setZ(dimensions==3 ? objectData.zDim : 0);
  },[object]);

  /**
   * Updates the value of the input field and the appropriate axis position when input field is changed
   * @param {Number} axis - Represents x,y, or z axis. Values are 0,1, and 2.
   * @param {Event} e - Used to find value of input field.
   * @returns {Component} Div with 3 input fields that each represents the dimensions.
   */

  const handleChange = (axis, e) => {
    let tempNum = parseInt(e.target.value);
    let diff = 0;

    if (isNaN(tempNum)) {
      setWarningText("Entry was not a number");
      tempNum = 0;
    }
    if (axis == 0) {
      diff = tempNum - xDim;
    } else if (axis == 1) {
      diff = tempNum - yDim;
    } else if (dimensions == 3 && axis == 2) {
      diff = tempNum - zDim;
    }
   // const oldDims = [xDim, yDim, zDim];
    if (isLinked) {
      setX(Math.max(1,xDim + diff));
      setY(Math.max(1,yDim + diff));
      setZ(Math.max(1,zDim + diff));
      return;
    }
    if (axis == 0) {
      setX(tempNum);
    } else if (axis == 1) {
      setY(tempNum);
    } else {
      setZ(tempNum);
    }
  };

  /**
   * Sets the focused state to true when input field is focused on.
   */
  const handleFocus = () => {
    setFocused(true);
  };

  /**
   * Updates value of dimensions in Canvas and sets the focused state to false.
   * Only x and y if 2 dimensions.
   */
  const handleBlur = () => {
    action.push(object);
    action.push(dimensions);
    const oldDims = [objectData.xDim, objectData.yDim];
    const newDims = [xDim, yDim];

    objectData.setLinked(isLinked);
    objectData.setX(xDim);
    objectData.setY(yDim);

    if (dimensions == 3) {
      oldDims.push(objectData.zDim);
      newDims.push(zDim);
      objectData.setZ(zDim);
    }

    action.push(oldDims);
    action.push(newDims);

    undoList.push(action);
    setUndoList([...undoList]);
    setAction(["dim"]);

    setFocused(false);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.dim = newDims;
    setProjectFile({ ...projectFile });
  };

  return (
    <>
      <div className="attribute" />
      <div className="attribute attribute-name">
        Dimensions <div className="stitch-text"> (in stitches)</div>
      </div>
      <div className="attribute">
        X:
        <InputField
          className="small position-field-style"
          type="text"
          value={xDim}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(0, e);
          }}
        />
        Y:
        <InputField
          className="small position-field-style"
          type="text"
          value={yDim}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(1, e);
          }}
        />
        {dimensions == 3 && (
          <>
            Z:
            <InputField
              className="small position-field-style"
              type="text"
              value={zDim}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(2, e);
              }}
            />
          </>
        )}
        <motion.div
          style={{
            padding: "1%",
            backgroundColor: isLinked ? "#a9cce3" : "#d6eaf8",
            borderRadius: "5px",
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            setLinked(!isLinked);
          }}
        >
          Link{" "}
        </motion.div>
      </div>
    </>
  );
};
export default DimField;
