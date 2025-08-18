import {motion} from 'framer-motion';
import "./InfiniteScroll.css";
import Bunny from "../assets/Home/Scroll/Bunny.jpg";
import Dragon from "../assets/Home/Scroll/Dragon.jpg";
import Octopus from "../assets/Home/Scroll/Octopus.jpg";
import Oreo from "../assets/Home/Scroll/Oreo.jpg";
import Sesame from "../assets/Home/Scroll/Sesame.jpg";
import Spot from "../assets/Home/Scroll/Spot.jpg";

const InfiniteScroll = () => {
    const scrollList = [
        Bunny, Dragon,Octopus,Oreo,Sesame,Spot
    ]

    const onPhone = (window.innerWidth > 480) ? false : true;
    const animationTime = onPhone? 10 :20;
    const delayBuffer = 1.7;
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
                    delay: delayBuffer*key*(phoneBuffer*(animationTime)/scrollList.length), 
                    duration:(animationTime),
                    repeat:Infinity,
                    repeatDelay:onPhone*delayBuffer *animationTime,
                },
                opacity:{
                    ease:"linear",
                    delay: delayBuffer* key*(phoneBuffer*(animationTime)/scrollList.length),
                    times:[0,0.2,0.9,1],
                    duration:(animationTime),
                    repeat:Infinity,
                    repeatDelay:onPhone* delayBuffer * animationTime,
                }}
            }
            className = "scroll-image-container">
                <motion.img src = {value} className = "scroll-image"/>
                <motion.img src = {value} className = "scroll-image"/>
            </motion.div>})
        }
    </div>
}

export default InfiniteScroll;