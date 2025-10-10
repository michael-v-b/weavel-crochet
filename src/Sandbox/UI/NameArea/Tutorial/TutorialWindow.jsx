import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const TutorialWindow = ({
  text = "n/a",
  anchor = null,
  nextStep,
  prevStep,
  step,
  nextFlag = "true",
  orientation = "bottom",
}) => {
  const tutorialRef = useRef(null);
  const [tutorialTop, setTop] = useState("50vh");
  const [tutorialLeft, setLeft] = useState("45vw");
  let prevZIndex = 1;

  //used to select anchor points in terms of tutorial
  useEffect(() => {
    if (anchor) {
      const anchorStyle = anchor.current.style;
      prevZIndex = anchorStyle.zIndex;

      highlightElement();
    }
    calculateWindowPosition();
  }, [step]);

  //deselects the anchor element
  const unhighlightElement = () => {
    if (anchor) {
      const anchorStyle = anchor.current.style;
      anchorStyle.zIndex = prevZIndex;
    }
  };

  //highlights the anchor element
  const highlightElement = () => {
    if (anchor) {
      const anchorStyle = anchor.current.style;
      anchorStyle.zIndex = "1000";
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
      if (orientation == "bottom") {
        setTop(anchorBounds.top + anchorBounds.height + window.scrollY);
        setLeft(
          anchorBounds.left + (anchorBounds.width - tutorialBounds.width) / 2
        );
      } else if (orientation == "right") {
        setTop(
          anchorBounds.top +
            window.scrollY +
            (anchorBounds.height - tutorialBounds.height) / 2
        );
        setLeft(anchorBounds.left + anchorBounds.width);
      } else if (orientation == "left") {
        setTop(
          anchorBounds.top +
            window.scrollY +
            (anchorBounds.height - tutorialBounds.height) / 2
        );
        setLeft(anchorBounds.left - tutorialBounds.width);
      }
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
            {nextFlag && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialWindow;
