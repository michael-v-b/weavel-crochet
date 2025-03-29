import HeightField from "../InfoAttributes/HeightField";
/**
 * @typedef {ChainPage} - extra fields added when chain is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by Parents.
 * @property {Mesh} object - the capsule whose info is being displayed.
 * @returns {Component} - the CircumField and HeightField.
 */
const ChainPage = ({ object, getFocused }) => {
  return (
    <>
      <HeightField
        heightName={"Length: "}
        object={object}
        getFocused={getFocused}
      />
    </>
  );
};
export default ChainPage;
