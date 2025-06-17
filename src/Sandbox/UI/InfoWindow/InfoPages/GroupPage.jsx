import NameField from "./InfoAttributes/NameField";
import ColorField from "./InfoAttributes/ColorField";
import CircumField from "./InfoAttributes/CircumField";
import {motion} from 'framer-motion';
import {useState,useEffect} from 'react';

const GroupPage = ({objects,deleterRef}) => {
  const [overlapping,setOverlapping] = useState([]);

  const CommonFields = () => {
    /**
     * circum
     * dim
     * size
     * width
     * height
     * half
     */

    return <>
      {overlapping.includes('circum') && <CircumField objects = {objects}/>}
    </>
  }

  /**
   * see which options are overlapping amongst all the objects
   */
  useEffect(()=>{
    //create initial overlapping array
    let tempOverlapping = objects[0].userData.meshData.attributeList;

    //iterate through each object, if an object doesn't have an attribute remove it from overlapping.
    for(let i = 0; i < objects.length; i++) {
      const attributeList = objects[i].userData.meshData.attributeList;
      for(let j = 0; j < tempOverlapping.length;j++) {
        if(!attributeList.includes(tempOverlapping[j])) {
          tempOverlapping.splice(j,1);  
        }
      }
    }

    setOverlapping([...tempOverlapping]);
  },[objects]);

  

  return (
    <div>
      <NameField objects = {objects}/>
      <ColorField objects = {objects}/>
      <CommonFields/>
      <motion.div 
          whileHover ={{scale:1.1}} 
          whileTap = {{scale:0.9}} 
          onClick = {()=>{
          deleterRef.current.deleteMeshes(objects);
        }}
                className= "delete-button selectable">Delete
      </motion.div>
    </div>
  );
};
export default GroupPage;
