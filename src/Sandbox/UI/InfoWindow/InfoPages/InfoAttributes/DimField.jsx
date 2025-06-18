import "../InfoPages.css";
import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {DimField} - Input field that represents an objects dimensions in either 2d or 3d.
 * @property {Mesh} objects - objects whose dimension is being adjusted.
 * @property {Number} dimensions - the number fo dimensions the object has, either 2 or 3.
 */
const DimField = ({ objects, dimensions }) => {
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const setWarningText = useStore((state)=>state.setWarningText);

  const [dimNum,setDimNum] = useState(2);
  const [action, setAction] = useState([["dim"],[],[],[],[]]);
  //xyz
  const [matching,setMatching] = useState([true,true,true]);
  const [changed,setChanged] = useState([false,false,false]);
  const [xDim, setX] = useState("-");
  const [yDim, setY] = useState("-");
  const [zDim, setZ] = useState(dimNum == 3 ? "-" : 0);
  const [isLinked, setLinked] = useState(false);

  /**
   * @returns sets value in axis array in true if that axis is matching
   */

  const updateMatching = () => {
    const tempData = objects[0].userData.meshData;
    
    //initialize dimNum to 3
    let tempDimNum = 3

    const temp = [tempData.xDim,
      tempData.yDim,
      (tempData.zDim)?tempData.zDim : 0];
    
    //initialize matching to true
    matching[0] = true;
    matching[1] = true;
    matching[2] = true;

    for(let i= 0; i < objects.length;i++) {
      const objectData = objects[i].userData.meshData;

      if(dimNum)
      if(objectData.xDim != temp[0]){
        matching[0] = false;
      }
      if(objectData.yDim != temp[1]) {
        matching[1] = false;
      }
      if(objectData.dimNum == tempDimNum && objectData.zDim != temp[2]) {
        matching[2] = false;
      }
      //if dimnum is not equal to 3 it must be equal to 2, so set it.
      if(objectData.dimNum != tempDimNum) {
        tempDimNum = 2;
      }
    }

    setDimNum(tempDimNum);
    setMatching([...matching]);
  }

  /**
   * updates matching if any other dimensions are changed
   */
  useEffect(() =>{
    updateMatching();
    objects.forEach(object => {
      const objectData = object.userData.meshData;
      setX(objectData.xDim);
      setY(objectData.yDim);
      if(dimNum == 3) {
        setZ(objectData.zDim);
      }
    });
    },[objects,
    ...objects.map(object=>object.userData.meshData.xDim),
    ...objects.map(object=>object.userData.meshData.yDim),
    ...objects.map(object=>object.userData.meshData.zDim)]);


  //update x y and z if matching
  useEffect(()=>{
    //don't immediately update values if being changed
    if(changed) {
      return;
    }

    objects.forEach(object => {

      const objectData = object.userData.meshData;

      if(matching[0]) {
        setX(objectData.xDim);
      }

      if(matching[1]) {
        setY(objectData.yDim);
      }
      if(matching[2]) {
        setZ(dimNum==3 ? objectData.zDim : 0);
      }
    });
  },[objects,xDim,zDim,yDim,matching]);

  /**
   * Updates the value of the input field and the appropriate axis position when input field is changed
   * @param {Number} axis - Represents x,y, or z axis. Values are 0,1, and 2.
   * @param {Event} e - Used to find value of input field.
   * @returns {Component} Div with 3 input fields that each represents the dimensions.
   */

  const handleChange = (axis, e) => {
    changed[axis] = true;
    setChanged([...changed]);
    let tempNum = parseInt(e.target.value);
    let diff = 0;

    if (isNaN(tempNum)) {
      setWarningText("Entry was not a number");
      tempNum = 0;
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
  const handleBlur = (axis,e) => {

    let diff = 0;
    //if matching set up the linked matchup
    if(matching[0] && matching[1] && (matching[2]||dimNum == 2) && isLinked) {

      const tempData = objects[0].userData.meshData;
      const axises = [tempData.xDim,tempData.yDim,tempData.zDim];

      

      //set diff to difference between actual value and expected value for axis 'axis'
      if (axis == 0) {
        diff = xDim - axises[axis] ;
      } else if (axis == 1) {
        diff = yDim- axises[axis];
      } else if (dimNum == 3 && axis == 2) {
        diff = zDim - axises[axis];
      }
    } 

   const oldDims = [xDim, yDim, zDim];
    const newDims = [xDim, yDim];

    objects.forEach(object => {

    const objectData = object.userData.meshData;
    const objectMethods = [
      objectData.setX,
      objectData.setY,
      dimNum == 3 ? objectData.setZ : 0]
    const tempDims = [xDim,yDim,zDim];


    for(let i = 0; i < dimNum; i++) {
      if(isLinked && axis !=i) {
        objectMethods[i](Math.max(1,tempDims[i] + diff));
      } else if (changed[i]) {
        objectMethods[i](tempDims[i]);
      }
    }

   
    action[1].push(object);
    action[2].push(objectData.dimNum);
    const oldDims = [objectData.xDim, objectData.yDim];
  
    action[3].push(oldDims);
    action[4].push(newDims);

    
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.dim = newDims;
    })

    //undo
    undoList.push(action);
    setUndoList([...undoList]);
    setAction([["dim"],[],[],[],[]]);

    setFocused(false);

    //update project file
    
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
          value={(matching[0] || changed[0]) ? xDim : "-"}
          onFocus={handleFocus}
          onBlur={(e)=>handleBlur(0,e)}
          onChange={(e) => handleChange(0, e)}
        />
        Y:
        <InputField
          className="small position-field-style"
          type="text"
          value={(matching[1] || changed[1]) ? yDim : "-"}
          onFocus={handleFocus}
          onBlur={(e)=>handleBlur(1,e)}
          onChange={(e) => handleChange(1, e)}
          
        />
        {dimNum == 3 && (
          <>
            Z:
            <InputField
              className="small position-field-style"
              type="text"
              value={(matching[2] || changed[2]) ? zDim : "-"}
              onFocus={handleFocus}
              onBlur={(e)=>handleBlur(2,e)}
              onChange={(e) => handleChange(2, e)}
            />
          </>
        )}
        {matching[0] && matching[1] && (matching[2]||dimNum) && <motion.div
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
        </motion.div>}
      </div>
    </>
  );
};
export default DimField;
