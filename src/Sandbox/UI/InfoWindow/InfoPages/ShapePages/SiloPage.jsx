import CircumField from "../InfoAttributes/CircumField";
import HeightField from "../InfoAttributes/HeightField";

import {useRef} from 'react';
/**
 * @typedef {SiloPage} - extra fields added when Silo is selected.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - DimField.
 */
const SiloPage = ({ object }) => {
  const objectData = object.userData.meshData;

  const heightRef = useRef(null);
  const circumRef = useRef(null);
  const MAX_RATE = 6;

  /**
   * changes the circumference based on the height.
   * @param {Number} newHeight - new value of height
   */
  const handleHeight = (newHeight) => {
    const circum = circumRef.current.circum;
    const temp = Math.min(circum, MAX_RATE*newHeight);
    circumRef.current.setCircum(temp);
    objectData.setRadius(circumRef.current.findRadius(temp));
  }
  
  /**
   * changes the height based on the circumference.
   * @param {Number} newCircum - new value of circumference.
   */
  const handleCircum = (newCircum) => {
    const height = heightRef.current.height;
    const temp = Math.max(height,Math.ceil(newCircum/MAX_RATE));
    objectData.setHeight(temp);
    heightRef.current.setHeight(temp);
  }
  return (
    <>
      <CircumField ref = {circumRef} object={object} getCircum = {handleCircum} />
      <HeightField ref = {heightRef} object={object} getHeight = {handleHeight}/>
    </>
  );
};
export default SiloPage;
