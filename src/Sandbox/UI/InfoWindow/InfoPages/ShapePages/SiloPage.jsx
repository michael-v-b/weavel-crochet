import CircumField from "../InfoAttributes/CircumField";
import HeightField from "../InfoAttributes/HeightField";
/**
 * @typedef {SiloPage} - extra fields added when Silo is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by App.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - DimField.
 */
const SiloPage = ({ getFocused, object }) => {
  return (
    <>
      <CircumField getFocused={getFocused} object={object} />
      <HeightField getFocused={getFocused} object={object} />
    </>
  );
};
export default SiloPage;
