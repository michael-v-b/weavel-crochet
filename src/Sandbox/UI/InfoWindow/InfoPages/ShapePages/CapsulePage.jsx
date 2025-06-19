import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";
import useStore from "../../../../DevTools/store";
import { useRef } from "react";
/**
 * @typedef {CapsulePage} - extra fields added when capsule is selected.
 * @property {Mesh} object - the capsule whose info is being displayed.
 * @returns {Component} - the CircumField and HeightField.
 */
const CapsulePage = ({ objects }) => {
  const setWarningText = useStore((state) => state.setWarningText);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const objectData = object.userData.meshData;
  const id = object.userData.idNumber;
  const objectFile = projectFile.meshes[id];
  const MAX_RATE = 6;
  const heightRef = useRef(null);
  const circumRef = useRef(null);

  /**
   * updates the height state when the circumference changes
   */
  const handleCircum = (newCircum) => {
    const height = heightRef.current.height;
    const temp = Math.max(height, Math.ceil((2 * newCircum) / MAX_RATE));

    if (temp != height) {
      setWarningText("Height updated to fit maximum proportions");
    }

    heightRef.current.setHeight(temp);
    objectData.setHeight(temp);
    objectFile.height = temp;
    setProjectFile({ ...projectFile });
  };

  /**
   * Updates the circumference when the height changes
   */
  const handleHeight = (newHeight) => {
    const roundedHeight = Math.floor(newHeight / 2);
    const circum = circumRef.current.circum;
    const temp = Math.min(circum, Math.ceil(roundedHeight * MAX_RATE));

    if (temp != circum) {
      setWarningText("Width updated to fit maximum proportions");
    }

    circumRef.current.setCircum(temp);
    objectData.setRadius(circumRef.current.findRadius(temp));
    objectFile.circum = temp;
    setProjectFile({ ...projectFile });
  };
  return (
    <>
      <CircumField
        objects={object]}
        ref={circumRef}
        getCircum={handleCircum}
      />
      <HeightField
        objects={objects}
        ref={heightRef}
        getHeight={handleHeight}
      />
    </>
  );
};
export default CapsulePage;
