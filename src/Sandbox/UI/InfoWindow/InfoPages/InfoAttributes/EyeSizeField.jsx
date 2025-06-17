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
  objects,
},ref) => {

  const [action, setAction] = useState([["size"],[],[],[]]);
  const [matching, setMatching] = useState(true);
  const [changed, setChanged] = useState(false);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const setWarningText = useStore((state)=>state.setWarningText);

  const [size, setSize] = useState("-");

  /**
   * @returns true if all objects have same size, false if not
   */
  const testMatching = () => {
    const temp = objects[0].userData.meshData.size;
    for(let i = 0; i < objects.length;i++) {
      if(temp != objects[i].userData.meshData.size) {
        return false;
      }
    }
    return true;
  }

  useEffect(()=>{
    setMatching(testMatching());
  },[objects,...objects.map(object => object.userData.meshData.size)]);

  useEffect(() => {
    if(testMatching() && !changed) {
      setSize(objects[0].userData.meshData.size);
    }
  }, [objects,matching,size]);

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
    setChanged(true);
  };

  /**
   * Sets the focused state to true when input field is focused on.
   */
  const handleFocus = () => {
    setFocused(true);
  };

  /**
   * Updates the object's size when input field is no longer selected and sets focused state to false.
   */
  const handleBlur = () => {
    let temp = Math.min(30,Math.max(5, size));


    objects.forEach(object => {

      const objectData = object.userData.meshData;
      action[1].push(object);
      action[2].push(objectData.size);
      action[3].push(temp);

      objectData.setSize(temp);

      setSize(temp);

      //update project file
      const newMesh = projectFile.meshes[object.userData.idNumber];
      newMesh.size = temp;
    })
    
    undoList.push(action);
    setUndoList([...undoList]);

    setAction([["size"],[],[],[]]);

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
          value={(matching || changed) ? size : "-"}
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
