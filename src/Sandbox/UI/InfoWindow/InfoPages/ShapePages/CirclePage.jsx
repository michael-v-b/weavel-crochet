import CircumField from "../InfoAttributes/CircumField";

/**
 * @typedef {CirclePage} - extra fields added when ball is selected.
 * @property {Mesh} object - The circle whose info is being displayed.
 * @returns {CircleField} - The circle field.
 */
const CirclePage = ({ objects }) => {
  return <CircumField objects={objects} roundingNum={8} />;
};

export default CirclePage;
