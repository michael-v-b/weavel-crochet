import DimField from "../InfoAttributes/DimField";
/**
 * @typedef {SquarePage} - extra fields added when square is selected.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - DimField.
 */
const SquarePage = ({ object }) => {
  return (
    <>
      <DimField objects={[object]} dimensions={2} />
    </>
  );
};
export default SquarePage;
