import "../InfoPages.css";

import { useState, useEffect } from "react";
import { Euler } from "three";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {Rotation} - A field that represents an object's Euler Rotation.
 * @property {Mesh} object - object whose euler is being recorded.
 * @returns {Component} -div that represents the object's rotation and can be edited.
 */
const RotationField = ({ object }) => {
  const [newRotation, setNewRotation] = useState(object.rotation.toArray());
  const isFocused = useStore((state) => state.isFocused);
  const setFocused = useStore((state) => state.setFocused);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const currentRotation = useStore((state)=>state.currentRotation);
  const setCurrentRotation = useStore((state)=>state.setCurrentRotation);

  useEffect(()=>{
    const temp = object.rotation.toArray();
    for(let i =0; i < temp; i++) {
      if(!isNaN(temp[i])) {
        temp[i] = temp.toFixed(2).replace(/[.,]00$/, "");
      }
    }
    setNewRotation(temp);
  },[object])
  
  const handleChange = (event, axis) => {
    const newValue = event.target.value;

    if (/^-?\d*\.?\d*$/.test(newValue)) {
      const tempRotation = [...newRotation];
      tempRotation[axis] = newValue;
      setNewRotation(tempRotation);
    }
  };

  const handleFocused = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    const tempRotation = [0, 0, 0];
    for (let i = 0; i < tempRotation.length; i++) {
      const degree = parseFloat(newRotation[i])
        .toFixed(2)
        .replace(/[.,]00$/, "");
      if (isNaN(degree)) {
        tempRotation[i] = 0;
      } else {
        tempRotation[i] = (degree/360) * 2* Math.PI
      }
    }
    
    object.rotation.copy(new Euler().fromArray(tempRotation));
    //update
    setCurrentRotation(tempRotation);
    setNewRotation(tempRotation);
    setFocused(false);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.rotation = tempRotation;
    setProjectFile({ ...projectFile });
    
  };

  useEffect(() => {
    if (!isFocused) {
      const tempRotation = object.rotation.toArray();
      for (let i = 0; i < tempRotation.length; i++) {
        
        const radian = parseFloat(tempRotation[i])
   

        if (isNaN(radian)) {
          tempRotation[i] = 0;
        } else {
          const degree = (radian/(2*Math.PI))*360 ;
          tempRotation[i] = degree.toFixed(2)
          .replace(/[.,]00$/, "");
        }
        
      }
      setNewRotation(tempRotation);
    }
  }, [currentRotation]);

  return (
    <>
      <div className="attribute attribute-name">Rotation:</div>
      <div className="attribute position-attribute">
        X:
        <InputField
          type="text"
          value={newRotation[0]}
          className="small position-field-style"
          onChange={(e) => {
            handleChange(e, 0);
          }}
          onFocus={handleFocused}
          onBlur={handleBlur}
        />
        Y:
        <InputField
          type="text"
          value={newRotation[1]}
          className="small position-field-style"
          onChange={(e) => {
            handleChange(e, 1);
          }}
          onFocus={handleFocused}
          onBlur={handleBlur}
        />
        Z:
        <InputField
          type="text"
          value={newRotation[2]}
          className="small position-field-style"
          onChange={(e) => {
            handleChange(e, 2);
          }}
          onFocus={handleFocused}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
};
export default RotationField;
