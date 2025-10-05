import { motion } from "framer-motion";
import useStore from "../../../DevTools/store";
import { useEffect } from "react";

const TutorialButton = () => {
  const setTutorial = useStore((state) => state.setTutorial);
  const tutorialActive = useStore((state) => state.tutorialActive);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setTutorial(true);
      }}
      className="tutorial-dark tutorial-button clickable"
    >
      Start Tutorial
    </motion.div>
  );
};

export default TutorialButton;
