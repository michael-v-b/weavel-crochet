import "../InfoPages.css";
import { useEffect, useState } from "react";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {NameField} - Input field used to edit an object's name.
 * @property {[Object]} objects - object whose name is being changed.
 * @returns {Component} - input field that takes a string which represents the object's name.
 */
const NameField = ({ objects }) => {

  const [action, setAction] = useState(["name"]);
  const [name, setName] = useState("-");
  const [changed,setChanged] = useState(false);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  //check if all objects have the same name
  useEffect(() => {
    if(!objects) {
      return;
    }
    const temp = objects[0].name;
    let matches = true;

    for(let i = 0; i < objects.length;i++) {
      if(objects[i].name != temp) {
        matches = false;
        break;
      }
    }

    if(matches) {
      setName(temp);
    } else {
      setName("-");
    }
    
  }, [objects]);

  /**
   * Sets internal name property to value in inputField.
   *@param {Event} event - used to get value in inputField.
   */
  const handleChange = (event) => {
    setChanged(true);
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
    if(!changed){
      setFocused(false);
      return;
    }

    //update action for undoList
    action.push(objects);
    action.push([]);
    action.push([]);
  

    //actually change name
    objects.forEach((object)=>{
      
      action[2].push(object.name);
      action[3].push(name);

      object.userData.cellRef.current.setName(name);
      object.name = name;

      //update project file
      const newMesh = projectFile.meshes[object.userData.idNumber];
      newMesh.name = name;
    })

    //update undoList
    undoList.push(action);
    setUndoList(...[undoList]);
    setAction(["name"]);


    
    setProjectFile({ ...projectFile });

    setFocused(false);
  };

  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">Name: </div>
        <InputField
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
