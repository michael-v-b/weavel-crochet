
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



    /*
    *Delete a user's account
    */
    const deleteAccount = async () => {        
        const {data: sessionData ,error: sessionError} = await supabase.auth.getSession();
        if(!sessionData || sessionError) {
            console.log("failed to delete");
            return
        }


       const {data:functionData,error:functionError}  = await supabase.functions.invoke('delete-user',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            }
        });

        console.log("functionData: ");
        console.dir(functionData);


        if(functionError) {
            console.dir(functionError);
        }

        const {error:signOutError} = await supabase.auth.signOut();

        if(signOutError) {
            console.log("Error with signing out");
            console.dir(signOutError);
        }
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
                //deleteProjects();
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