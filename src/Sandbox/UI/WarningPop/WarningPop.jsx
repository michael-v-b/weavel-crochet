

import "./WarningPop.css";
import {motion} from 'framer-motion';
import useStore from "../../DevTools/store";
import {useEffect,useState} from 'react';

const WarningPop = () => {

    const warningText = useStore((state)=>state.warningText);
    const [isVisible,setVisible] = useState(false);
    const [mountKey,setMountKey] = useState(1);

    useEffect(()=>{
        if(warningText[0] != "") {
            setMountKey(mountKey*-1);
            setVisible(true);
        } else {
            setVisible(false);
        }
    },[warningText]);


    return <>{isVisible && <motion.div 
        key = {mountKey}
    initial = {{opacity:1}} 
    animate = {{opacity:0}} 
    transition = {{duration:2, ease:'easeIn'}}
    onAnimationComplete = {() => setVisible(false)}
    className = "warning-pop-container">
        {warningText}
    </motion.div>}</>
}
export default WarningPop;