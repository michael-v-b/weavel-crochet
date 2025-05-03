import HeightField from "../InfoAttributes/HeightField";
import WidthField from "../InfoAttributes/WidthField";
import HalfField from "../InfoAttributes/HalfField";
import { useState } from "react";

/**
 * @typedef {StadiumPage} - extra fields added when stadium is selected.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - HeightField
 */
const StadiumPage = ({ object }) => {
  const [width, setWidth] = useState(object.userData.meshData.width);
  const [height, setHeight] = useState(object.userData.meshData.height);

  //when min width is 2 no max width and width needs to be even

  const handleWidth = (newWidth) => {
    setWidth(newWidth);
  };

  //height = -width, min height = width +1
  return (
    <>
      <HeightField object={object} currentBase={width} isStadium={true} />
      <WidthField object={object} isStadium={true} getWidth={handleWidth} />
      <HalfField object={object} />
    </>
  );
};
export default StadiumPage;
