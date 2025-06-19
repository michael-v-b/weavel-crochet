import HeightField from "../InfoAttributes/HeightField";
/**
 * @typedef {ChainPage} - extra fields added when chain is selected.
 * @property {Mesh} object - the capsule whose info is being displayed.
 * @returns {Component} - the CircumField and HeightField.
 */
const ChainPage = ({ objects }) => {
  return (
    <>
      <HeightField heightName={"Length: "} objects={objects} />
    </>
  );
};
export default ChainPage;
