import HeightField from "../InfoAttributes/HeightField";
import BaseField from "../InfoAttributes/BaseField";

/**
 * @typedef {TrianglePage} - extra fields added when box is selected.
 * @property {Mesh} object - the box whose info is being displayed.
 * @property {DimField} - Dimfield.
 */
const TrianglePage = ({ object }) => {
  const handleBase = (base) => {
    console.log("base changes to " + base);
  };
  return (
    <>
      <HeightField object={object} />
      <BaseField object={object} getBase={handleBase} />
    </>
  );
};
export default TrianglePage;
