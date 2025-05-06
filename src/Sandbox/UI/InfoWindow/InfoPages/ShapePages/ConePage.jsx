import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";
import { useState,useRef} from "react";

/**
 * @typedef {ConePage} - extra fields added when cone is selected.
 * @property {Mesh} object - the cone whose info is being displayed.
 * @returns {Component} - CircumField and HeightField.
 */
const ConePage = ({ object}) => {
  const objectData = object.userData.meshData;
  const MAX_RATE = 6;
  const heightRef = useRef(null);
  const circumRef = useRef(null);

  /**
   * updates the circumference state in order to change the max height.
   */
  const handleCircum = (newCircum) => {
    const height = heightRef.current.height;
    const temp = Math.max(height,Math.ceil(newCircum/MAX_RATE));
    heightRef.current.setHeight(temp);
    objectData.setHeight(temp);
  };

  /**
   * Updates the height when the height changes
   */
  const handleHeight = (newHeight) => {
    const circum = circumRef.current.circum;
    const temp = Math.min(circum,Math.ceil(newHeight*MAX_RATE));
    circumRef.current.setCircum(temp);
    objectData.setRadius(circumRef.current.findRadius(temp));
  } 

  return (
    <>
      <CircumField
      ref = {circumRef}
        object={object}
        getCircum={handleCircum}
        roundingNum={0}
      />
      <HeightField
      ref = {heightRef}
        object={object}
        getHeight = {handleHeight}
      />
    </>
  );
};
export default ConePage;