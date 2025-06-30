import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";

import AuthTester from "../AuthTester";
import ProfileDelete from "./ProfileDelete/ProfileDelete";
import {useNavigate} from 'react-router';
import { useState } from "react";
import { motion } from "framer-motion";
import "./Profile.css";

/**
 * Webpage for people to adjust settings regarding their profile.
 */

const Profile = () => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="projects-web-container">
        <Banner />
        <AuthTester reroute="" />

        {deleteAccount && <ProfileDelete setDeleteAccount={setDeleteAccount} />}

        <div className="projects-container">
          <div className="projects-title-bar">
            <div className="projects-title">Profile Options </div>
          </div>

          <div className="profile-option-container">
  
            <hr className=  "profile-line"/>

            {/*RESET PASSWORD ///////////////////////*/}
            <div className=  "profile-option-subcontainer">
              <div className=  "profile-option-title">
                Password Reset:
              </div>
              <div className = "profile-description">
                Click the button below to reset the password to your account.
              </div>
              <motion.div whileHover = {{scale:1.1}} 
              whileTap = {{scale:0.9}}
              onClick = {()=>{
                navigate("/forgot_pass")
              }}
              className=  "profile-reset-pass clickable">
        
                Reset Password
              </motion.div>
            </div>

            <hr className = "profile-line"/>

            {/*DELETE ACCOUNT /////////////////////////*/}
            <div className=  "profile-option-subcontainer">
              <div className = "profile-option-title">
                Delete Account:
              </div>
              <div className="profile-description">
                Clicking this will delete your account. It will delete all of your
                projects, and remove your email from our database.
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setDeleteAccount(true);
                }}
                className="profile-option delete-button profile-delete"
              >
                Delete Account
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Profile;
