import HeightField from "../InfoAttributes/HeightField";
import WidthField from "../InfoAttributes/WidthField";
import { useState } from "react";

/**
 * @typedef {TrianglePage} - extra fields added when box is selected.
 * @property {Mesh} object - the box whose info is being displayed.
 * @property {DimField} - Dimfield.
 */
const TrianglePage = ({ object }) => {
  const [currentWidth, setWidth] = useState(object.userData.meshData.width);
  const handleWidth = (base) => {
    setWidth(base);
  };
  return (
    <>
      <HeightField object={object} currentBase={currentWidth} maxRate={2} />
      <WidthField object={object} getWidth={handleWidth} name={"Base"} />
    </>
  );
};
export default TrianglePage;
