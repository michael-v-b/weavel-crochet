import CircumField from "../InfoAttributes/CircumField";

/**
 * @typedef {CirclePage} - extra fields added when ball is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by App.
 * @property {Mesh} object - The circle whose info is being displayed.
 * @returns {CircleField} - The circle field.
 */
const CirclePage = ({ getFocused, avgPosition, object }) => {
  return <CircumField getFocused={getFocused} object={object} />;
};

export default CirclePage;
