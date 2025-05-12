import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";
import {useRef} from 'react';
/**
 * @typedef {CapsulePage} - extra fields added when capsule is selected.
 * @property {Mesh} object - the capsule whose info is being displayed.
 * @returns {Component} - the CircumField and HeightField.
 */
const CapsulePage = ({ object}) => {

    const objectData = object.userData.meshData;
    const MAX_RATE = 6;
    const heightRef = useRef(null);
    const circumRef = useRef(null);
  
    /**
     * updates the height state when the circumference changes
     */
    const handleCircum = (newCircum) => {
      const height = heightRef.current.height;
      const temp = Math.max(height,Math.ceil(2*newCircum/MAX_RATE));
      heightRef.current.setHeight(temp);
      objectData.setHeight(temp);
    };
  
    /**
     * Updates the circumference when the height changes
     */
    const handleHeight = (newHeight) => {
      const roundedHeight = Math.floor(newHeight/2);
      const circum = circumRef.current.circum;
      const temp = Math.min(circum,Math.ceil(roundedHeight*MAX_RATE));
      circumRef.current.setCircum(temp);
      objectData.setRadius(circumRef.current.findRadius(temp));
    } 
  return (
    <>
      <CircumField object={object} ref=  {circumRef} getCircum = {handleCircum} />
      <HeightField object={object} ref = {heightRef} getHeight=  {handleHeight}/>
    </>
  );
};
export default CapsulePage;
