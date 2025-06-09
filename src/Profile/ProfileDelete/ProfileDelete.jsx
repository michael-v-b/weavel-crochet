
import {motion} from 'framer-motion';
import "./ProfileDelete.css";


/**
 * @property {CallbackFunction} setDeletAccount - sets the value of delete account, which disables the profile delete menu.
 */
const ProjectDelete = ({setDeleteAccount}) => {

    return <div className = "profile-delete-container">
        <div className = "profile-delete-question">
        Are you sure you want to delete your account? 
        <div className = "profile-delete-small">
        This will delete ALL of your projects which CANNOT be undone.
        This will also remove your email from our database.
        </div>
        </div>
        <div className = "profile-delete-button-container">
            <motion.div  whileHover = {{scale:1.1,backgroundColor:"#fff"}} 
            whileTap = {{scale:0.95}}
            className = "profile-delete-button clickable"
            onClick = {()=>{
            }}>
                <div>Delete Account</div>
            </motion.div>

            
            <motion.div whileHover = {{scale:1.1,backgroundColor:"#fff"}} 
            whileTap = {{scale:0.95}}
             className = "profile-delete-button clickable"
             onClick = {()=>{
                setDeleteAccount(false);
             }}>
                Cancel
            </motion.div>
        </div>
    </div>
}

export default ProjectDelete;