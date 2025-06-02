import {motion} from 'framer-motion';
import "./InfiniteScroll.css";

const InfiniteScroll = () => {
    const scrollList = [
        1,2,3,4,5,6
    ]
    const animationTime = 12;

    return <div className = "scroll-container">
        {scrollList.map((value,key) => {
            console.log("key: " + key);
            return <motion.div key = {key} 
            initial = {{x:'20vw',opacity:1}}
            animate = {{x:'-90vw',opacity:[0,1,1,0]}}
            transition = {
                
                {
                x:{ease:"linear",delay: key*(animationTime/6), duration:animationTime,repeat:Infinity},
                opacity:{ease:"linear",delay:key*(animationTime/6),times:[0,0.2,0.9,1],duration:animationTime,repeat:Infinity}}
            }
            className = "scroll-image"> 
                {value}
            </motion.div>})
        }
    </div>
}

export default InfiniteScroll;