import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";
/**
 * @typedef {CapsulePage} - extra fields added when capsule is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by Parents.
 * @property {Mesh} object - the capsule whose info is being displayed.
 * @returns {Component} - the CircumField and HeightField.
 */
const CapsulePage = ({ object, getFocused }) => {
  return (
    <>
      <CircumField object={object} />
      <HeightField object={object} />
    </>
  );
};
export default CapsulePage;
