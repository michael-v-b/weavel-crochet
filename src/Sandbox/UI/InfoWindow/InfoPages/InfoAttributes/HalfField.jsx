import useStore from "../../../../DevTools/store";
import { useRef, useEffect, useState } from "react";

const HalfField = ({ objects,getHalf}) => {

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const undoList = useStore((state)=>state.undoList);
  const setUndoList = useStore((state)=>state.setUndoList);
  const [isHalf, setHalf] = useState(false);
  //action, objects, old values, new values
  const [action,setAction] = useState([['half'],[],[],[]])
  const checkRef = useRef(null);

  /**
   * 
   * @returns true if every object has the same value of isHalf, false if not.
   */
  const testMatching = () => {
    const temp = objects[0].userData.meshData.isHalf;
    for(let i = 0; i < objects.length;i++) {
      if(temp != objects[i].userData.meshData.isHalf) {
        return false;
      }
    }
    return true;
  }

  /**
   * Handle when the checkbox is changed
   * @param {*} event used to find checkbox value 
   */
  const handleChange = (event) => {
    const tempHalf = event.target.checked;


    objects.forEach(object => {

    object.userData.meshData.setHalf(tempHalf);
    //update undo

    action[1].push(object);

    action[2].push(object.userData.meshData.isHalf);
    action[3].push(tempHalf);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];
    newMesh.isHalf = tempHalf;
    });

    setHalf(tempHalf);
    if(getHalf) {
      getHalf(tempHalf);
    }
    undoList.push(action);
    setUndoList([...undoList]);
    setAction([['half'],[],[],[]])

    //update project file
  
    setProjectFile({ ...projectFile });
  };

  /**
   * if all of the entries match, set isHalf to the matching value
   * otherwise make it false.
   */
  useEffect(() => {
   if(testMatching()) {
    setHalf(objects[0].userData.meshData.isHalf);
   } else {
    setHalf(false);
   }
  }, [objects,isHalf]);


  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">Half: </div>
        <input
          ref={checkRef}
          className="attribute small field-style"
          checked={isHalf}
          type="checkbox"
          onChange={handleChange}
        />{" "}
      </div>
    </>
  );
};

export default HalfField;
