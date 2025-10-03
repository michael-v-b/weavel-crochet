import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const TutorialWindow = ({
  text = "n/a",
  anchor = null,
  nextStep,
  prevStep,
}) => {
  const tutorialRef = useRef(null);
  const [tutorialTop, setTop] = useState("50vh");
  const [tutorialLeft, setLeft] = useState("45vw");
  let prevZIndex = 1;
  let prevBorderStyle = null;
  let prevBorderColor = null;

  //used to select anchor points in terms of tutorial
  useEffect(() => {
    if (anchor) {
      const anchorStyle = anchor.current.style;
      prevZIndex = anchorStyle.zIndex;
      prevBorderStyle = anchorStyle.borderStyle;
      prevBorderColor = anchorStyle.borderColor;
      highlightElement();
    }
    calculateWindowPosition();
  }, [anchor]);

  //deselects the anchor element
  const unhighlightElement = () => {
    if (anchor) {
      const anchorStyle = anchor.current.style;
      anchorStyle.zIndex = prevZIndex;
      anchorStyle.borderStyle = prevBorderStyle;
      anchorStyle.borderColor = prevBorderColor;
    } else {
      console.log("anchor style doesn't exist");
    }
  };

  //highlights the anchor element
  const highlightElement = () => {
    if (anchor) {
      const anchorStyle = anchor.current.style;
      anchorStyle.zIndex = "1000";
      anchorStyle.borderStyle = "solid";
      anchorStyle.borderColor = "#ffa200ff";
    }
  };

  //calculate where the tutorial window is supposed to go
  const calculateWindowPosition = () => {
    const tutorialBounds = tutorialRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    //if no anchor exists center the tutorial window
    if (!anchor) {
      setTop((windowHeight - tutorialBounds.height) / 2);
      setLeft((windowWidth - tutorialBounds.width) / 2);
    } else {
      const anchorBounds = anchor.current.getBoundingClientRect();
      setTop(anchorBounds.top + anchorBounds.height);
      setLeft(
        anchorBounds.left + (anchorBounds.width - tutorialBounds.width) / 2
      );
    }
  };

  return (
    <>
      <div className="tutorial-container">
        <div className="tutorial-blackout"></div>
        <div
          className="tutorial-window"
          ref={tutorialRef}
          style={{ top: tutorialTop, left: tutorialLeft }}
        >
          <div className="tutorial-window-text">{text}</div>
          <div className="tutorial-options-container">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                unhighlightElement();
                prevStep();
              }}
              className="tutorial-light small clickable"
            >
              {"< Previous"}
            </motion.div>{" "}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="tutorial-dark small clickable"
              onClick={() => {
                unhighlightElement();
                nextStep();
              }}
            >
              {" "}
              {"Next >"}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialWindow;
