

import {motion} from "framer-motion";
import {useNavigate,useLocation} from "react-router";
import supabase from "../supabase";
import {useState} from 'react';
import useGlobalStore from '../globalStore';
import AuthTester from "../AuthTester";

const ResetPass = () => {
    const [pass1,setPass1] = useState("");
    const [pass2,setPass2] = useState("");
    const [warningText,setWarningText] = useState("");
    const PASS_LENGTH = 6;
    const navigate = useNavigate();

    const handlePass1 = (event) => {
        setPass1(event.target.value);
    }

    const handlePass2 = (event) => {
        setPass2(event.target.value);
    }

    const testNewPass = async () => {
      if(pass1.length < PASS_LENGTH|| pass2.length < PASS_LENGTH) {
        setWarningText("*Passwords must be over 6 characters*");
      }
      if(pass1 != pass2) {
        setWarningText("*Passwords must match*");
      } else {

        const {data,error} = await supabase.auth.updateUser({password:pass1});
        navigate("/");
      }
    }


    

    
    return <>
    <AuthTester reroute = {"/"}/>
    <div className = "web-container center">

      <div className = "register-window" style = {{height:"65vh"}}>
          <div className=  "register-request">
              Make a New Password
          </div>
          <div className = "register-inputs-container center">
              <div className = "register-field-name" style = {{marginTop:"5vh"}}>
                  New Password
              </div>
              <motion.input
              className="register-field"
              whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
              type="password"
              maxLength="30"
              onChange = {handlePass1}
              />

              <div className = "register-field-name" style = {{marginTop:"5vh"}}>
                  Re-enter Password
              </div>
              <motion.input
              className="register-field"
              whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
              type="password"
              maxLength="30"
              onChange = {handlePass2}
              />
        </div>
        {warningText != "" && <div className=  "warning">
          {warningText}
        </div>}

          <motion.div
          whileHover = {{scale:1.1}} 
          whileTap = {{scale:0.9}}
          className = "register-button"
          style = {{fontSize:"3vh",width:"10vh"}}
          onClick = {testNewPass}
        >
              Send
          </motion.div>

        <motion.div 
        whileHover = {{scale:1.1,color:"#000"}} 
        whileTap = {{scale:0.9,color:"#888"}}
        onClick = {()=>{
          navigate("/login")
        }}

        className = "login center" style ={{marginTop:"1vh"}}>
          I remember my password...
        </motion.div>
          
      </div>
    </div>
  </>
}

export default ResetPass;