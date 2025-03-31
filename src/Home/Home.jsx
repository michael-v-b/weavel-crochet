import Banner from "../UI/Banner/Banner";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./Home.css";
const Home = () => {
  const [bubblePlayed, setBubblePlayed] = useState(false);
  const BUBBLE_SIZE = 30;
  const BUBBLE_RATIO = 0.5;
  const BUBBLE_DELAY = 0.7;
  const heroSpace = useAnimation();
  const heroText = useAnimation();
  const screenshot = useAnimation();
  const bubbles = useAnimation();
  const underBubbleText = useAnimation();
  const realEnter = useAnimation();
  const fakeEnter = useAnimation();

  const SPRING_TRANSITION = {
    type: "spring",
    stiffness: 100,
    boune: 2,
  };

  useEffect(() => {
    const sequence = async () => {
      await heroSpace.start({
        opacity: 1,
        height: "75vh",
        transition: { duration: 0.8 },
      });
      await heroText.start({
        opacity: 1,
        height: "20%",
      });
    };
    sequence();
  }, []);

  const bubbleAnimations = async () => {
    screenshot.start({ width: "50%" });
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

  const trialErrorAnimation = async () => {
    realEnter.start({ width: "50vw" });
    fakeEnter.start({ width: "50vw" });
  };

  return (
    <>
      <Banner />
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
            Crochet Pattern Creator!{" "}
          </motion.div>
        </motion.div>
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
                height: BUBBLE_SIZE * BUBBLE_RATIO + "%",
                fontSize: "100%",
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
              Export your designs into custom crochet patterns.
            </motion.div>
            <motion.div
              style={{ margin: "30%", position: "absolute" }}
              whileInView={bubbleAnimations}
              className="animation-trigger"
            />
          </div>
        </motion.div>

        <div className="trial-error"> NO MORE TRIAL AND ERROR</div>
        <div className="compare-div">
          <motion.div
            initial={{ width: "0vw" }}
            animate={fakeEnter}
            className="compare-weavel"
          />
          <motion.div
            initial={{ width: "0vw" }}
            animate={realEnter}
            className="compare-real"
          />
          <motion.div
            style={{ marginTop: "50vh", width: "50vh", position: "absolute" }}
            whileInView={trialErrorAnimation}
            className="animation-trigger"
            transition={{ ease: "easeIn", duration: 0.25 }}
          />
        </div>
        <div className="change-prop-text">
          {" "}
          Change proportions with the click of a button{" "}
        </div>
        <div className="change-prop-img" />
        <div style={{ position: "absolute", bottom: "-265vh" }}> FOOTER </div>
      </div>
    </>
  );
};
export default Home;
