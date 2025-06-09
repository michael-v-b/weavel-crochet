import Banner from "../UI/Banner/Banner";
import AuthTester from "../AuthTester";
import ProfileDelete from "./ProfileDelete/ProfileDelete";
import {useState} from "react";
import {motion} from 'framer-motion';
import "./profile.css";

/**
 * Webpage for people to adjust settings regarding their profile.
 */

const Profile = () => {

    const [deleteAccount,setDeleteAccount] = useState(false);
    return <>
    <div className=  "projects-web-container">
        <Banner/>
        <AuthTester reroute = ""/>

        {deleteAccount && <ProfileDelete setDeleteAccount = {setDeleteAccount}/>}

        <div className = "projects-container">
            <div className = "projects-title-bar">
                <div className=  "projects-title">Profile Options </div>
            </div>
            <div className = "profile-option">
                Other Profile Option
            </div>
            <motion.div whileHover = {{scale:1.1}} 
            whileTap = {{scale:0.9}}
            onClick = {()=>{
                setDeleteAccount(true);
            }} 
            className=  "profile-option delete-button profile-delete">
                Delete Account
            </motion.div>
        
        </div>
    </div>
    </>
}

export default Profile;