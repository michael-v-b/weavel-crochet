import "../InfoPages.css";
import { useEffect, useState,forwardRef,useImperativeHandle} from "react";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {HeightField} - A field used to edit an object's height.
 * @property {Object} objects - object whose height is being edited.
 * @property {string} heightName - the text that appears on the height attribute.
 * @returns {Component} - div with an input field that represents the object's height.
 */
const HeightField = forwardRef(({
  heightName = "Height",
  getHeight,
  objects,
},ref) => {

  HeightField.displayName = "Height Field";

  const [height, setHeight] = useState("-");
  const [action, setAction] = useState([["height"],[],[],[]]);
  const [changed,setChanged] =useState(false);
  const [matching,setMatching] = useState(true);
  const setFocused = useStore((state) => state.setFocused);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const setWarningText = useStore((state)=>state.setWarningText);

  /**
   * 
   * @returns true if all objects have the same height, false if not.
   */
  const testMatching = () => {
    const temp = objects[0].userData.meshData.height;
    for(let i = 0; i < objects.length;i++) {
      if(objects[i].userData.meshData.height != temp) {
        return false;
      }
    }
    return true;
  }


  useEffect(()=>{
    setMatching(testMatching());
  },[objects,...objects.map(object=>object.userData.meshData.height)]);

  useEffect(() => {
    if(testMatching() && !changed) {
      setHeight(objects[0].userData.meshData.height);
    }
  }, [objects,height,matching]);
  

  /**
   *updates the internal height when input field is edited.
   *@param {Event} e - Used to find input field's value.
   */
  const handleChange = (e) => {
    const initNumber = parseInt(e.target.value);

    if (isNaN(initNumber)) {
      setWarningText("Entry was not a number");
      setHeight(0);
    } else {
      setHeight(initNumber);
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
   * Updates the object's height when input field is no longer selected and sets focused state to false.
   */
  const handleBlur = () => {
    if(!changed) {
      return;
    }

    let temp = height;
    temp = Math.max(2,height);

    objects.forEach((object) => {
      const objectData = object.userData.meshData;
    

      action[1].push(object);
      action[2].push(objectData.height);
      action[3].push(temp);

      objectData.setHeight(temp);

      //update project file
      const newMesh = projectFile.meshes[object.userData.idNumber];
      newMesh.height = temp;
    })

    //update for callback
    setHeight(temp);

    if(getHeight) {
      getHeight(temp);
    }

    undoList.push(action);
    setUndoList([...undoList]);
    setAction([["height"],[],[],[]]);


    setProjectFile({ ...projectFile });

    setFocused(false);
  };

  useImperativeHandle(ref,()=>({height,setHeight}));


  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">{heightName} </div>
        <InputField
          className="small field-style"
          type="text"
          value={(matching || changed) ? height : "-"}
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

export default HeightField;
