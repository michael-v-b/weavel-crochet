import {useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle} from 'react';

import {motion,useAnimation} from 'framer-motion';

import "./mouseHover.css";

/**
 * 
 * @returns Div shows up after hover
 */
const MouseHover = forwardRef(({},ref) => {

    const [isVisible,setVisible] = useState(false);
    const [hoverText,setHoverText] = useState("");
    const [mousePosition,setMousePosition] = useState([0,0]);
    const timerRef = useRef(null);

    const openBox = useAnimation();

    const startTimer = (element) => {
        
        setHoverText(element);
        timerRef.current = setTimeout(()=>{
            setVisible(true);

        }
            ,1250);
    }

    const cancelTimer = () => {
        clearTimeout(timerRef.current);
    }

   

    useEffect(()=>{
        const handleMouseMove = (e) => {
            mousePosition[0] = e.clientX;
            mousePosition[1] = e.clientY;
            setMousePosition([...mousePosition]);
            setVisible(false);
        }

        window.addEventListener('mousemove',handleMouseMove);
        return ()=>{
            window.removeEventListener('mousemove',handleMouseMove);
        }
    },[]);

    useImperativeHandle(ref,()=>({startTimer,cancelTimer}));

    return <>
        <motion.div 
        className=  'mouse-hover-container'
        animate = {{width: isVisible ? "15vh" : "0vh",height:isVisible ? "5vh" : "0vh"}}
        style = {{
            top:mousePosition[1] + 10 + 'px',
            left:mousePosition[0] + 10 + 'px'
        }}>
            {hoverText}
        </motion.div>
    </>
});

export default MouseHover;