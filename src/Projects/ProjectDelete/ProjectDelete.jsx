
import "./ProjectDelete.css";
import {motion} from 'framer-motion';


/**
 * A warning for people before their project gets deleted
 * @property {String} projectName - Name of the project that is going to be deleted.
 * @property {Number} index - index of the project that will be deleted
 * @property {Function} deleteProject- deletes a project of a given index
 * @property {Function} setDeletedProject - sets the value of deletedProject
 */
const ProjectDelete = ({projectName,index,deleteProject,setDeletedProject}) => {

    return <div className = "project-delete-container">
        <div className = "project-delete-question">
        Are you sure you want to delete this project?
        You cannot undo this.
        </div>
        <div className = "project-delete-button-container">
            <motion.div  whileHover = {{scale:1.1,backgroundColor:"#fff"}} 
            whileTap = {{scale:0.95}}
            className = "project-delete-button clickable"
            onClick = {()=>{
                setDeletedProject('');
                deleteProject(index);
            }}>
                <div>Delete</div>
                <div> {projectName}</div>
            </motion.div>

            
            <motion.div whileHover = {{scale:1.1,backgroundColor:"#fff"}} 
            whileTap = {{scale:0.95}}
             className = "project-delete-button clickable"
             onClick = {()=>{
                setDeletedProject('');
             }}>
                Cancel
            </motion.div>
        </div>
    </div>
}

export default ProjectDelete;