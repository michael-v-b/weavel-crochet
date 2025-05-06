

import {motion} from "framer-motion";
import {useNavigate} from "react-router";
import supabase from "../supabase";
import {useState} from 'react';

const ResetPass = () => {
    const [pass1,setPass1] = useState("");
    const [pass2,setPass2] = useState("");
    const navigate = useNavigate();

    const handlePass1 = (event) => {
        setPass1(event.target.value);
    }

    const handlePass2 = (event) => {
        setPass2(event.target.value);
    }


    

    
    return <div className = "web-container center">

    <div className = "register-window" style = {{height:"65vh"}}>
        <div className=  "register-request">
            Make a New Password
        </div>
        <div className = "register-inputs-container center">
            <div className = "register-field-name" style = {{marginTop:"5vh"}}>
                Password
            </div>
            <motion.input
            className="register-field"
            whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
            type="text"
            maxLength="30"
            />

            <div className = "register-field-name" style = {{marginTop:"5vh"}}>
                Re-enter Password
            </div>
            <motion.input
            className="register-field"
            whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
            type="text"
            maxLength="30"
            />
      </div>

        <motion.div
        whileHover = {{scale:1.1}} 
        whileTap = {{scale:0.9}}
        className = "register-button"
        style = {{fontSize:"3vh",width:"10vh"}}
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
}

export default ResetPass;