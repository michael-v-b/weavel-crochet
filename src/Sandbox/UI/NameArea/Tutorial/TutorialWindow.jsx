import { motion } from "framer-motion";

const TutorialWindow = ({ text = "n/a" }) => {
  return (
    <>
      <div className="tutorial-container">
        <div className="tutorial-blackout"></div>
        <div className="tutorial-window">
          <div className="tutorial-window-text">{text}</div>
          <div className="tutorial-options-container">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="tutorial-light small clickable"
            >
              {"< Previous"}
            </motion.div>{" "}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="tutorial-dark small clickable"
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
