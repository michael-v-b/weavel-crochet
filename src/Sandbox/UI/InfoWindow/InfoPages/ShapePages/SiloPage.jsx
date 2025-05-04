import CircumField from "../InfoAttributes/CircumField";
import HeightField from "../InfoAttributes/HeightField";
/**
 * @typedef {SiloPage} - extra fields added when Silo is selected.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - DimField.
 */
const SiloPage = ({ object }) => {
  return (
    <>
      <CircumField object={object} />
      <HeightField object={object} />
    </>
  );
};
export default SiloPage;
