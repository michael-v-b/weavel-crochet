import CircumField from "../InfoAttributes/CircumField";

/**
 * @typedef {BallPage} - extra fields added when ball is selected.
 * @property {Mesh} object - the ball whose info is being displayed.
 * @returns {CircumField} - CircumField.
 */
const BallPage = ({ object }) => {
  return <CircumField objects={[object]} />;
};

export default BallPage;
