import DimField from "../InfoAttributes/DimField";
/**
 * @typedef {SquarePage} - extra fields added when square is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by App.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - DimField.
 */
const SquarePage = ({ getFocused, object }) => {
  return (
    <>
      <DimField getFocused={getFocused} object={object} dimensions={2} />
    </>
  );
};
export default SquarePage;
