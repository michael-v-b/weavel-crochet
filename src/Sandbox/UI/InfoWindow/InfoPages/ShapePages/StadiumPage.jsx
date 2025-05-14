import HeightField from "../InfoAttributes/HeightField";
import WidthField from "../InfoAttributes/WidthField";
import HalfField from "../InfoAttributes/HalfField";
import useStore from "../../../../DevTools/store";
import { useRef} from "react";

/**
 * @typedef {StadiumPage} - extra fields added when stadium is selected.
 * @property {Mesh} object - the square whose info is being displayed.
 * @returns {Component} - HeightField
 */
const StadiumPage = ({ object }) => {
  const setWarningText = useStore((state)=>state.setWarningText);
  const projectFile = useStore((state)=>state.projectFile);
  const setProjectFile = useStore((state)=>state.setProjectFile);


  const objectData = object.userData.meshData;
  
  const id = object.userData.idNumber;
  const objectFile = projectFile.meshes[id];

  const heightRef = useRef(null);
  const widthRef = useRef(null);
  const rate = 8;

  //when min width is 2 no max width and width needs to be even

  const handleWidth = (newWidth) => {
    const height = heightRef.current.height;

    const temp = Math.max(height,newWidth);

    if(temp != height) {
      setWarningText("Width updated to fit maximum proportions");
    }

    objectData.setHeight(temp);
    heightRef.current.setHeight(temp);
    objectFile.height = temp;
    setProjectFile({...projectFile});
  };

  const handleHeight = (newHeight) => {
    const width = widthRef.current.width;
    let temp = Math.min(width,newHeight);

    if(temp %2 != 0) {
      temp-=1;
    }
    if(temp != width) {
      setWarningText("Width updated to fit maximum proportions");
    }
    objectData.setWidth(temp);
    widthRef.current.setWidth(temp);
    
    objectFile.width = temp;
    setProjectFile({...projectFile});
  }

  return (
    <>
      <HeightField ref = {heightRef} object={object}  getHeight = {handleHeight} />
      <WidthField ref = {widthRef} object={object} getWidth={handleWidth} />
      <HalfField object={object} />
    </>
  );
};
export default StadiumPage;
