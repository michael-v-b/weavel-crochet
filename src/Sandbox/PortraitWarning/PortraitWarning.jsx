
import {motion} from "framer-motion";
import redArrow from "../../assets/redArrow.png";
import "./PortraitWarning.css";


const PortraitWarning = () => {


    return <div className = "portrait-warning-container">
        <motion.div initial = {{scale:0.8}} 
        animate = {{scale:1}}
        transition = {{
            repeat:Infinity,
            repeatType:"mirror",
            duration:1
        }}
        className = "portrait-warning-text">TURN YOUR DEVICE TO LANDSCAPE</motion.div>
        <div className = "portrait-warning-image">
            <motion.img src = {redArrow} 
            
            animate ={{rotate:-360}}

            transition = {{
                ease:"linear",
                duration:2,
                repeat:Infinity
            }}
            style ={{height:"100%",width:"100%"}}/>
        </div>
    </div>
}

export default PortraitWarning;