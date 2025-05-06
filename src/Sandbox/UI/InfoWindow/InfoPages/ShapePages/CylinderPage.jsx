import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";

/**
 * @typedef {CylinderPage} - extra fields added when cylinder is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by App.
 * @property {Mesh} object - the cylinder whose info is being displayed.
 * @returns {Component} - CircumField and HeightField.
 */
const CylinderPage = ({ object}) => {
  return (
    <>
      <CircumField object={object} roundingNum = {0} />
      <HeightField object={object} />
    </>
  );
};
export default CylinderPage;
