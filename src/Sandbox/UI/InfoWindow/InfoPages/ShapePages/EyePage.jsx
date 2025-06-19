import EyeSizeField from "../InfoAttributes/EyeSizeField";

/**
 * @typedef {EyePage} - extra fields added when ball is selected.
 *  @property {Mesh} object - the ball whose info is being displayed.
 * @returns {CircumField} - CircumField.
 */
const EyePage = ({ objects }) => {
  return <EyeSizeField objects={objects} />;
};

export default EyePage;
