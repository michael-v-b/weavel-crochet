import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import AuthTester from "../AuthTester";
import InfiniteScroll from "./InfiniteScroll";

import "./Home.css";

/**
 * @returns {HTMLElement} - the home page for Weavel
 */
const Home = () => {
  const [bubblePlayed, setBubblePlayed] = useState(false);
  const BUBBLE_SIZE = 30;
  const [onPhone,setOnPhone] = useState(window.innerWidth < 480);
  const BUBBLE_RATIO = onPhone ? 0.7 : .6;
  const BUBBLE_DELAY = 0.7;
  const heroSpace = useAnimation();
  const heroText = useAnimation();
  const screenshot = useAnimation();
  const bubbles = useAnimation();
  const underBubbleText = useAnimation();

  const SPRING_TRANSITION = {
    type: "spring",
    stiffness: 100,
    bounce: 2,
  };


    useEffect(()=>{
    const handleResize = () => {
      if(window.innerHeight > 480) {
        setOnPhone(false);
      } else {
        setOnPhone(true);
      }
    }
    handleResize();
    window.addEventListener('resize',handleResize);

    return () => {window.removeEventListener('resize',handleResize)}
  },[]);

  /**
   * plays opening animation.
   */
  useEffect(() => {
    const sequence = async () => {
      await heroSpace.start({
        opacity: 1,
        height: "65vh",
        transition: { duration: 0.8 },
      });
      await heroText.start({
        opacity: 1,
        height: "20%",
      });
    };
    sequence();
  }, []);
  
  /**
   * plays bubble animations once checkpoint is visible on screen.
   */
  const bubbleAnimations = async () => {

    let tempWidth = "50%";
    if(window.innerWidth <= 480) {
      tempWidth = "98%";
    }
    screenshot.start({ width: tempWidth });
    
    if (!bubblePlayed) {
      setBubblePlayed(true);
      bubbles.start({
        scale: 1,
        rotate: [-20, 0],
      });
      underBubbleText.start({
        scale: 1,
        transition: {
          delay: 1.25,
          duration: 0.25,
          ...SPRING_TRANSITION,
        },
      });
    }
  };



  return (
    <>
      <Banner />
      <AuthTester/>
      <div className="home-page-container">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={heroSpace}
          className="hero-space"
        >
          <motion.div
            initial={{ height: "0%", opacity: 0 }}
            animate={heroText}
            transition={{
              duration: 0.1,
              ...SPRING_TRANSITION,
            }}
            className="hero-text"
          >
            {" "}
            Custom Crochet Patterns!{" "}
          </motion.div>
        </motion.div>
          
        {/*CREATE YOUR OWN AMIGURUMI PATTERNS//////////////////*/}
        <motion.div 
        whileInView = {{scale:0.9}} 
        transition ={{duration:0.4, ...SPRING_TRANSITION}}
        initial = {{scale:0.8}}  
        viewport ={{amount:0.7}}
        className = "first-summary">

          <div className = "first-summary-title">
            Create Your Own Free Amigurumi Patterns!
          </div>
          <div className = "first-summary-text">
            Weavel is a 3D modeling software that lets you create your own unique Amigurumi designs,
            and download it as a crochet pattern to bring it to life.
          </div>
        </motion.div>


        {/*BUBBLES/////////////////////////////////////////////*/}
        <motion.div className="bubble-div">
          <motion.div
            initial={{ width: "0%" }}
            animate={screenshot}
            transition={{
              duration: 0.6,
              ...SPRING_TRANSITION,
            }}
            className="bubble-screenshot"
          >
            SCREEN SHOT GOES HERE
          </motion.div>

          <div className="bubble-container">
            <motion.div
              style={{ height: BUBBLE_SIZE + "%" }}
              initial={{ scale: 0 }}
              animate={bubbles}
              transition={{
                delay: BUBBLE_DELAY,
                duration: 0.1,
                bounce: 4,
                ...SPRING_TRANSITION,
              }}
              className="bubble-info"
            >
              Bring your crochet ideas to life!
            </motion.div>

            <motion.div
              style={{
                height: BUBBLE_SIZE * BUBBLE_RATIO + "vh",
              }}
              className="bubble-info small-bubble"
              initial={{ scale: 0 }}
              animate={bubbles}
              transition={{
                delay: BUBBLE_DELAY + 0.25,
                duration: 0.1,
                bounce: 4,
                ...SPRING_TRANSITION,
              }}
            >
              Create original designs.
            </motion.div>

            <motion.div
              className="under-bubble-text"
              initial={{ scale: 0 }}
              animate={underBubbleText}
            >
              Access your projects from anywhere!
            </motion.div>
            <motion.div
              style={{margin: "5%", position: "absolute" }}
              whileInView={bubbleAnimations}
              className="animation-trigger"
            />


          </div>
        </motion.div>
    

        {/*SCROLL ////////////////////////////////////////////////*/}
        <div className="trial-error"> No downloads, no installations, No more trial and error!</div>
        <div className="trial-error">Just create an account and get stitching!</div>

        <InfiniteScroll/>


       {/* <div className="change-prop-text">
          {" "}
          Change proportions with the click of a button{" "}
        </div>


        <div className="change-prop-img" />
        <div style={{ position: "absolute", bottom: "-265vh" }}> FOOTER </div>*/}
      </div>
      <Footer/>
    </>
  );
};
export default Home;
