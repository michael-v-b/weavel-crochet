import CircumField from "../InfoAttributes/CircumField";

/**
 * @typedef {BallPage} - extra fields added when ball is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by Parents.
 * @property {Mesh} object - the ball whose info is being displayed.
 * @returns {CircumField} - CircumField.
 */
const BallPage = ({ getFocused, object }) => {
  return <CircumField getFocused={getFocused} object={object} />;
};

export default BallPage;
