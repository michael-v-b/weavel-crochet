import {motion} from 'framer-motion';
import "./InfiniteScroll.css";

const InfiniteScroll = () => {
    const scrollList = [
        1,2,3,4,5,6
    ]

    const onPhone = (window.innerWidth > 480) ? false : true;
    const animationTime = onPhone? 10 :20;
    const phoneBuffer = onPhone?2:1;


    return <div className = "scroll-container">
        {scrollList.map((value,key) => {
            return <motion.div key = {key} 
            initial = {{x:'20vw',opacity:1}}
            animate = {{x:'-90vw',opacity:[0,1,1,0]}}
            transition = {
                
                {
                    
                x:{
                    ease:"linear",
                    delay: key*(phoneBuffer*(animationTime)/scrollList.length), 
                    duration:(animationTime),
                    repeat:Infinity,
                    repeatDelay:onPhone*animationTime,
                },
                opacity:{
                    ease:"linear",
                    delay:key*(phoneBuffer*(animationTime)/scrollList.length),
                    times:[0,0.2,0.9,1],
                    duration:(animationTime),
                    repeat:Infinity,
                    repeatDelay:onPhone*animationTime,
                }}
            }
            className = "scroll-image"> 
                {value}
            </motion.div>})
        }
    </div>
}

export default InfiniteScroll;