import CircumField from "../InfoAttributes/CircumField";
import HeightField from "../InfoAttributes/HeightField";
import useStore from "../../../../DevTools/store";

import { useRef } from "react";
/**
 * @typedef {SiloPage} - extra fields added when Silo is selected.
 * @property {Mesh} objects - the square whose info is being displayed.
 * @returns {Component} - DimField.
 */
const SiloPage = ({ objects }) => {
  const setWarningText = useStore((state) => state.setWarningText);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const heightRef = useRef(null);
  const circumRef = useRef(null);
  const MAX_RATE = 6;

  /**
   * changes the circumference based on the height.
   * @param {Number} newHeight - new value of height
   */
  const handleHeight = (newHeight) => {
    objects.forEach((object) => {
      const id = object.userData.idNumber;
      const objectFile = projectFile.meshes[id];
      const objectData = object.userData.meshData;
      const circum = circumRef.current.circum;
      const temp = Math.min(circum, MAX_RATE * newHeight);

      if (temp != circum) {
        setWarningText("Circumference updated to fit maximum proportions");
      }

      ("set circum from handleHeight");
      circumRef.current.setCircum(temp);
      objectData.setCircum(temp);
      objectData.setRadius(circumRef.current.findRadius(temp));
      objectFile.circum = temp;
    });
    setProjectFile({ ...projectFile });
  };

  /**
   * changes the height based on the circumference.
   * @param {Number} newCircum - new value of circumference.
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

      objectData.setHeight(temp);
      heightRef.current.setHeight(temp);
      objectFile.height = temp;
    });

    setProjectFile({ ...projectFile });
  };
  return (
    <>
      <CircumField ref={circumRef} objects={objects} getCircum={handleCircum} />
      <HeightField ref={heightRef} objects={objects} getHeight={handleHeight} />
    </>
  );
};
export default SiloPage;
