import HeightField from "../InfoAttributes/HeightField";
import WidthField from "../InfoAttributes/WidthField";
import useStore from "../../../../DevTools/store";
import { useRef } from "react";

/**
 * @typedef {TrianglePage} - extra fields added when box is selected.
 * @property {Mesh} object - the box whose info is being displayed.
 * @property {DimField} - Dimfield.
 */
const TrianglePage = ({ objects }) => {
  const setWarningText = useStore((state) => state.setWarningText);

  const MAX_RATE = 2;
  const heightRef = useRef(null);
  const widthRef = useRef(null);

  /**
   * updates the circumference state in order to change the max height.
   */
  const handleWidth = (newWidth) => {
    objects.forEach((object) => {
      const objectData = object.userData.meshData;
      const height = heightRef.current.height;
      const temp = Math.max(height, Math.ceil(newWidth / MAX_RATE));

      if (temp != height) {
        setWarningText("Height updated to fit max proportions");
      }

      heightRef.current.setHeight(temp);
      objectData.setHeight(temp);
    });
  };

  /**
   * Updates the height when the height changes
   */
  const handleHeight = (newHeight) => {
    objects.forEach((object) => {
      const objectData = object.userData.meshData;
      const width = widthRef.current.width;
      const temp = Math.min(width, Math.ceil(newHeight * MAX_RATE));

      if (temp != width) {
        setWarningText("Width updated to fit max proportions");
      }

      widthRef.current.setWidth(temp);
      objectData.setWidth(temp);
    });
  };
  return (
    <>
      <HeightField ref={heightRef} objects={objects} getHeight={handleHeight} />
      <WidthField
        ref={widthRef}
        objects={objects}
        getWidth={handleWidth}
        name={"Base"}
      />
    </>
  );
};
export default TrianglePage;
