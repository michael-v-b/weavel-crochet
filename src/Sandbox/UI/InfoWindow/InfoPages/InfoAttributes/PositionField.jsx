import "../InfoPages.css";
import  {
  useState,
  useEffect,
} from "react";
import { Vector3 } from "three";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {PositionField} - a field that represents an object's position in 3d space.
 *  * @param {ToolManagerRef} toolManagerRef - Lets PositionField access public methods from ToolManager.
 
 * @returns {Component} - div with 3 input fields that represent the object's x y and z coordinates.
 */
const PositionField = ({ object }) => {
  const setFocused = useStore((state) => state.setFocused);
  const avgPosition = useStore((state) => state.avgPosition);
  const updateAvgPosition = useStore((state) => state.updateAvgPosition);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const undoList = useStore((state)=>state.undoList);
  const setUndoList = useStore((state)=>state.setUndoList);
  const setWarningText = useStore((state)=>state.setWarningText);
  const [newPosition, setNewPosition] = useState([...avgPosition]);

  /**
   * updates value in position state, only happens when input field is changed.
   * @param {Number} axis - number that represents the axis the new value is associated with, 0=x, 1=y, 2 =z.
   * @param {Event} event - used to find the value in the input field.
   */
  const updatePosition = (axis, event) => {
    const newValue = event.target.value;

    if (/^-?\d*\.?\d*$/.test(newValue)) {
      const tempPosition = [...avgPosition];
      tempPosition[axis] = newValue;

      setNewPosition(tempPosition);
    } else {
      setWarningText("Entry was not a number");
    }
  };

  /**
   * Tests whether 2 arrays, a and b, are equal.
   */

  const testEquals  = (a,b) => {
    for(let i =0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * get displacement of the 2 objects
   */

  const getDisplacement = (a,b) => {
    const displacement = [];

    for(let i = 0; i < a.length;i++) {
      
      displacement.push(a[i] - b[i]);
    }
    return displacement;
  }

  /**
   * Sets the focused state to true when input field is focused on.
   */
  const handleFocus = () => {
    setFocused(true);
  };

  /**
   *Updates the objects position in the Canvas and sets the focused state to false.
   */
  const handleBlur = () => {
    const positionStrings = [0, 1, 0];
    const positionNums = [0,1,0]
    for (let i = 0; i < positionStrings.length; i++) {
      positionStrings[i] = parseFloat(newPosition[i])
        .toFixed(2)
        .replace(/[.,]00$/, "");
      positionNums[i] = parseFloat(positionStrings[i]);
      if (isNaN(positionStrings[i])) {
        
        positionStrings[i] = 0;
      }
    }

    if(!testEquals(positionNums,object.position.toArray())) {
      const displacement = getDisplacement(positionNums,object.position.toArray());

      const action = ['translate'];
      action.push([object]);
      action.push(displacement);
      undoList.push(action);
      setUndoList([...undoList]);
    }

    //update undo




    //recently changed from parsing float, make sure it works
    object.position.copy(new Vector3().fromArray(positionNums));
    setNewPosition(positionStrings);
    updateAvgPosition();



    setFocused(false);

    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.position = positionNums;
    setProjectFile({ ...projectFile });
  };

  //updates on widget move
  useEffect(() => {
    for (let i = 0; i < newPosition.length; i++) {
      newPosition[i] = parseFloat(avgPosition[i])
        .toFixed(2)
        .replace(/[.,]00$/, "");
    }
    setNewPosition([...newPosition]);
  }, [avgPosition]);


  return (
    <>
      <div className=" attribute attribute-name"> Position: </div>
      <div className="attribute position-attribute">
        X:
        <InputField
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          value={newPosition[0]}
          onChange={(e) => {
            updatePosition(0, e);
          }}
          className="small position-field-style"
        />
        Y:
        <InputField
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          value={newPosition[1]}
          onChange={(e) => {
            updatePosition(1, e);
          }}
          className="small position-field-style"
        />
        Z:
        <InputField
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          value={newPosition[2]}
          onChange={(e) => {
            updatePosition(2, e);
          }}
          className="small position-field-style"
        />
      </div>
    </>
  );
};
export default PositionField;
