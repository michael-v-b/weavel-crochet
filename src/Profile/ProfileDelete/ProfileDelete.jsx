
import {motion} from 'framer-motion';
import supabase from "../../supabase";
import useGlobalStore from "../../globalStore";
import {useNavigate} from "react-router";
import "./ProfileDelete.css";


/**
 * @property {CallbackFunction} setDeletAccount - sets the value of delete account, which disables the profile delete menu.
 */
const ProjectDelete = ({setDeleteAccount}) => {

    const authData = useGlobalStore((state) => state.authData);
    const navigate = useNavigate();

    const deleteAccount = async () => {
        const user_id = authData.user.id;
        
        //get all the projects
        const {data: projectData,error:projectError} = await supabase.from("Projects").select("*");

        //remove all the projects one by one
        projectData.forEach(async (object) => {
            const project_id = object.project_id;
            const {data:tableData,error:tableError} = await supabase.from("Projects").delete().eq("project_id",project_id);
            
            const path = "" + user_id +"/" +project_id + "/data.json";
            const {data: storageData, error: storageError} = await supabase.storage.from("Project Files").remove([path]);
        })

        const {data: userData, error: userError} = await supabase.from("Profiles").delete().eq("user_id",user_id);

        const {error:signOutError} = await supabase.auth.signOut();

       navigate("/");
    }

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
                deleteAccount();
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