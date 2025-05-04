import useStore from "../../../../DevTools/store";
import { useRef, useEffect, useState } from "react";

const HalfField = ({ object }) => {
  const objectData = object.userData.meshData;

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const selectedList = useStore((state) => state.selectedList);
  const [isHalf, setHalf] = useState(objectData.isHalf);
  const checkRef = useRef(null);

  const handleChange = (event) => {
    const tempHalf = event.target.checked;
    objectData.setHalf(tempHalf);
    setHalf(tempHalf);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];

    newMesh.isHalf = tempHalf;
    setProjectFile({ ...projectFile });
  };

  useEffect(() => {
    setHalf(object.userData.meshData.isHalf);
  }, [object]);

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
