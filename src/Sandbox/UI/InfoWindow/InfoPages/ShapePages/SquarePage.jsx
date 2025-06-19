import DimField from "../InfoAttributes/DimField";
/**
 * @typedef {SquarePage} - extra fields added when square is selected.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - DimField.
 */
const SquarePage = ({ objects }) => {
  return (
    <>
      <DimField objects={objects} dimensions={2} />
    </>
  );
};
export default SquarePage;
