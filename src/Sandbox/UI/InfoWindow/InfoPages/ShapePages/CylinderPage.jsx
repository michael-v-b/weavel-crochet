import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";

/**
 * @typedef {CylinderPage} - extra fields added when cylinder is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by App.
 * @property {Mesh} object - the cylinder whose info is being displayed.
 * @returns {Component} - CircumField and HeightField.
 */
const CylinderPage = ({ object, getFocused }) => {
  return (
    <>
      <CircumField object={object} getFocused={getFocused} roundingNum = {0} />
      <HeightField object={object} getFocused={getFocused} />
    </>
  );
};
export default CylinderPage;
