import NameField from "./InfoAttributes/NameField";
import ColorField from "./InfoAttributes/ColorField";
import {motion} from 'framer-motion';

const GroupPage = ({objects,deleterRef}) => {
  return (
    <div>
      <NameField objects = {objects}/>
      <ColorField objects = {objects}/>
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
