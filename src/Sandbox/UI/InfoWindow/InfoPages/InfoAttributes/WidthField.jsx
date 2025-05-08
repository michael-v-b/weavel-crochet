import "../InfoPages.css";
import { useEffect, useState ,forwardRef,useImperativeHandle} from "react";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {WidthField} - A field used to edit an object's width.
 * @property {Object} object - object whose base is being edited.
 * @returns {Component} - div with an input field that represents the object's width.
 */
const WidthField = forwardRef(({
  object,
  getWidth,
  name = "Width: ",
},ref) => {
  const [objectData, setObjectData] = useState(object.userData.meshData);

  const [action, setAction] = useState(["base"]);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const [width, setWidth] = useState(objectData.width);

  useEffect(() => {
    setObjectData(object.userData.meshData);
    setWidth(object.userData.meshData.width);
  }, [object]);

  /**
   *updates the internal base when input field is edited.
   *@param {Event} e - Used to find input field's value.
   */
  const handleChange = (e) => {
    const initNumber = parseInt(e.target.value);

    if (isNaN(initNumber)) {
      setWidth(0);
    } else {
      setWidth(initNumber);
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
    let temp = Math.max(2, width);

    action.push(object);
    action.push(objectData.width);
    action.push(temp);
    undoList.push(action);

    objectData.setWidth(temp);

    if (getWidth) {
      getWidth(temp);
    }

    setUndoList([...undoList]);
    setAction(["width"]);

    setWidth(temp);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.width = temp;

    setProjectFile({ ...projectFile });

    setFocused(false);
  };

  useImperativeHandle(ref,()=>({setWidth,width}))

  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">{name}</div>
        <InputField
          className="small field-style"
          type="text"
          value={width}
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
});

export default WidthField;
