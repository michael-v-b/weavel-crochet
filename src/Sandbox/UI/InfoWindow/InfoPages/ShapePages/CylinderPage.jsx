import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";
import OpenField from "../InfoAttributes/OpenField";

/**
 * @typedef {CylinderPage} - extra fields added when cylinder is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by App.
 * @property {Mesh} object - the cylinder whose info is being displayed.
 * @returns {Component} - CircumField and HeightField.
 */
const CylinderPage = ({ object, getFocused }) => {
  return (
    <>
      <CircumField object={object} getFocused={getFocused} />
      <HeightField object={object} getFocused={getFocused} />
      <OpenField object={object} />
    </>
  );
};
export default CylinderPage;
