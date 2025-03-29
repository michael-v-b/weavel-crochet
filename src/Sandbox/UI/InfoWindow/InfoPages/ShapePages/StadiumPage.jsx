import HeightField from "../InfoAttributes/HeightField";
/**
 * @typedef {StadiumPage} - extra fields added when stadium is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by App.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - HeightField
 */
const StadiumPage = ({ getFocused, object }) => {
  return (
    <>
      <HeightField getFocused={getFocused} object={object} />
    </>
  );
};
export default StadiumPage;
