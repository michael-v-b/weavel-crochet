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
    const isHalf = objectData.isHalf;
    const temp = isHalf ? Math.max(height,newWidth/2) : Math.max(height,newWidth);

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
    const isHalf = objectData.isHalf;
    

    
    let temp = isHalf ? Math.min(width,newHeight*2) :Math.min(width,newHeight);
  
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


  //reset dimensions if stadium changed to half
  const handleHalf = (newHalf)=>{
    if(newHalf){
      return;
    }
    const width = widthRef.current.width;
    const height = heightRef.current.height;

    objectData.setHeight(Math.max(width,height));
  }

  return (
    <>
      <HeightField ref = {heightRef} objects={[object]}  getHeight = {handleHeight} />
      <WidthField ref = {widthRef} objects={[object]} getWidth={handleWidth} />
      <HalfField objects={[object]} getHalf = {handleHalf}/>
    </>
  );
};
export default StadiumPage;
