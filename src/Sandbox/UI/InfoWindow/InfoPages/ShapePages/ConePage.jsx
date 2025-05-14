import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";
import {useRef} from "react";
import useStore from "../../../../DevTools/store";

/**
 * @typedef {ConePage} - extra fields added when cone is selected.
 * @property {Mesh} object - the cone whose info is being displayed.
 * @returns {Component} - CircumField and HeightField.
 */
const ConePage = ({ object}) => {
  const setWarningText = useStore((state)=>state.setWarningText);
  const objectData = object.userData.meshData;
  const MAX_RATE = 2;
  const heightRef = useRef(null);
  const circumRef = useRef(null);

  /**
   * updates the circumference state in order to change the max height.
   */
  const handleCircum = (newCircum) => {
    const height = heightRef.current.height;
    
    const temp = Math.max(height,Math.ceil(newCircum/MAX_RATE));

    if(temp!=height) {
      setWarningText("Circumference updated to fit max proportions");
    }

    heightRef.current.setHeight(temp);
    objectData.setHeight(temp);
  };

  /**
   * Updates the height when the height changes
   */
  const handleHeight = (newHeight) => {
    const circum = circumRef.current.circum;
    
    const temp = Math.min(circum,Math.ceil(newHeight*MAX_RATE));

    
      if(temp!=circum) {
        setWarningText("Height updated to fit max proportions");
      }


    circumRef.current.setCircum(temp);
    objectData.setRadius(circumRef.current.findRadius(temp));
  } 

  return (
    <>
      <CircumField
      ref = {circumRef}
        object={object}
        getWidth = {handleCircum}
        minCircum = {6}
        roundingNum = {0}
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