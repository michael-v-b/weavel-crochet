import "../InfoPages.css";
import { useEffect, useState ,forwardRef,useImperativeHandle} from "react";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {EyeSizeField} - A field used to edit an object's width.
 * @property {Object} object - object whose base is being edited.
 * @returns {Component} - div with an input field that represents the object's width.
 */
const EyeSizeField = forwardRef(({
  object,
},ref) => {
  const [objectData, setObjectData] = useState(object.userData.meshData);

  const [action, setAction] = useState(["size"]);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const setWarningText = useStore((state)=>state.setWarningText);

  const [size, setSize] = useState(objectData.size);

  const meshType = object.userData.meshType;

  useEffect(() => {
    setObjectData(object.userData.meshData);
    setSize(object.userData.meshData.size);
  }, [object]);

  /**
   *updates the internal base when input field is edited.
   *@param {Event} e - Used to find input field's value.
   */
  const handleChange = (e) => {
    const initNumber = parseInt(e.target.value);

    if (isNaN(initNumber)) {
      setWarningText("Entry was not a number");
      setSize(0);
    } else {
      setSize(initNumber);
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
    let temp = Math.max(5, size);


    action.push(object);
    action.push(objectData.size);
    action.push(temp);
    undoList.push(action);

    objectData.setSize(temp);

    setUndoList([...undoList]);
    setAction(["size"]);

    setSize(temp);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.size = temp;

    setProjectFile({ ...projectFile });

    setFocused(false);
  };

  useImperativeHandle(ref,()=>({setSize,size}))

  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">Size: </div>
        <InputField
          className="small field-style"
          type="text"
          value={size}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        
        <div className="stitch-text">mm</div>
      </div>
    </>
  );
});

export default EyeSizeField;
