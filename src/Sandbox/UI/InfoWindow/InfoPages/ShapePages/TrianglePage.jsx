import HeightField from "../InfoAttributes/HeightField";
import WidthField from "../InfoAttributes/WidthField";
import { useRef} from "react";

/**
 * @typedef {TrianglePage} - extra fields added when box is selected.
 * @property {Mesh} object - the box whose info is being displayed.
 * @property {DimField} - Dimfield.
 */
const TrianglePage = ({ object }) => {
  const objectData = object.userData.meshData;
  const MAX_RATE = 2;
  const heightRef = useRef(null);
  const widthRef = useRef(null);

  /**
   * updates the circumference state in order to change the max height.
   */
  const handleWidth = (newWidth) => {
    const height = heightRef.current.height;
    const temp = Math.max(height,Math.ceil(newWidth/MAX_RATE));
    heightRef.current.setHeight(temp);
    objectData.setHeight(temp);
  };

  /**
   * Updates the height when the height changes
   */
  const handleHeight = (newHeight) => {
    console.log("height changes");
    const width = widthRef.current.width;
    const temp = Math.min(width,Math.ceil(newHeight*MAX_RATE));

    console.log("new base should be " + temp);
    widthRef.current.setWidth(temp);
    objectData.setWidth(temp);
  } 
  return (
    <>
      <HeightField ref = {heightRef} object={object} getHeight=  {handleHeight}/>
      <WidthField ref = {widthRef} object={object} getWidth={handleWidth} name={"Base"} />
    </>
  );
};
export default TrianglePage;
