import HeightField from "../InfoAttributes/HeightField";
import WidthField from "../InfoAttributes/WidthField";
/**
 * @typedef {StadiumPage} - extra fields added when stadium is selected.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - HeightField
 */
const StadiumPage = ({ object }) => {
  //when width is changed, height will changed
  //when height changes, change width
  return (
    <>
      <HeightField object={object} />
      <WidthField object={object} />
    </>
  );
};
export default StadiumPage;
