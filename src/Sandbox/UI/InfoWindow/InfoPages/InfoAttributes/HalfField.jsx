import useStore from "../../../../DevTools/store";
import { useRef, useEffect, useState } from "react";

const HalfField = ({ object,getHalf}) => {
  const objectData = object.userData.meshData;

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const undoList = useStore((state)=>state.undoList);
  const setUndoList = useStore((state)=>state.setUndoList);
  const [isHalf, setHalf] = useState(objectData.isHalf);
  const checkRef = useRef(null);

  const handleChange = (event) => {
    const tempHalf = event.target.checked;
    objectData.setHalf(tempHalf);

    setHalf(tempHalf);
    getHalf(tempHalf);


    //update undo
    const action = ['half'];
    action.push(object);
    undoList.push(action);
    setUndoList([...undoList]);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];

    newMesh.isHalf = tempHalf;
    setProjectFile({ ...projectFile });
  };

  useEffect(() => {
    setHalf(object.userData.meshData.isHalf);
  }, [object]);

  useEffect(()=>{
    setHalf(objectData.isHalf);
  },[objectData.isHalf]);

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
