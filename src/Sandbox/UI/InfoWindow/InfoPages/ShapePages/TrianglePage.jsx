import HeightField from "../InfoAttributes/HeightField";
import BaseField from "../InfoAttributes/BaseField";
import { useState } from "react";

/**
 * @typedef {TrianglePage} - extra fields added when box is selected.
 * @property {Mesh} object - the box whose info is being displayed.
 * @property {DimField} - Dimfield.
 */
const TrianglePage = ({ object }) => {
  const [currentBase, setBase] = useState(object.userData.meshData.base);
  const handleBase = (base) => {
    setBase(base);
  };
  return (
    <>
      <HeightField object={object} currentBase={currentBase} maxRate={2} />
      <BaseField object={object} getBase={handleBase} />
    </>
  );
};
export default TrianglePage;
