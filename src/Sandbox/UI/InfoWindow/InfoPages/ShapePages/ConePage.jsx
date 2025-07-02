import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";
import { useRef } from "react";
import useStore from "../../../../DevTools/store";

/**
 * @typedef {ConePage} - extra fields added when cone is selected.
 * @property {Mesh} object - the cone whose info is being displayed.
 * @returns {Component} - CircumField and HeightField.
 */
const ConePage = ({ objects }) => {
  const setWarningText = useStore((state) => state.setWarningText);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const MAX_RATE = 6;
  const heightRef = useRef(null);
  const circumRef = useRef(null);

  /**
   * updates the circumference state in order to change the max height.
   */
  const handleCircum = (newCircum) => {
    objects.forEach((object) => {
      const id = object.userData.idNumber;

      const objectFile = projectFile.meshes[id];
      const objectData = object.userData.meshData;
      const height = heightRef.current.height;

      const temp = Math.max(height, Math.ceil(newCircum / MAX_RATE));

      if (temp != height) {
        setWarningText("Height updated to fit maximum proportions");
      }

      heightRef.current.setHeight(temp);
      objectData.setHeight(temp);

      objectFile.height = temp;
    });
    setProjectFile({ ...projectFile });
  };

  /**
   * Updates the height when the height changes
   */
  const handleHeight = (newHeight) => {
    objects.forEach((object) => {
      const id = object.userData.idNumber;

      const objectFile = projectFile.meshes[id];
      const objectData = object.userData.meshData;
      const circum = circumRef.current.circum;

      const temp = Math.min(circum, Math.ceil(newHeight * MAX_RATE));

      if (temp != circum) {
        setWarningText("Circumference updated to fit maximum proportions");
      }

      circumRef.current.setCircum(temp);
      objectData.setCircum(temp);
      objectData.setRadius(circumRef.current.findRadius(temp));
      objectFile.circum = temp;
    });
    setProjectFile({ ...projectFile });
  };

  return (
    <>
      <CircumField
        ref={circumRef}
        objects={objects}
        getCircum={handleCircum}
        minCircum={6}
        roundingNum={0}
      />
      <HeightField ref={heightRef} objects={objects} getHeight={handleHeight} />
    </>
  );
};
export default ConePage;
