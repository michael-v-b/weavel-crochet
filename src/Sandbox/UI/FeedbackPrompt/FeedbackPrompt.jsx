import useStore from "../../DevTools/store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./feedbackPrompt.css";

const DonatePrompt = () => {
  const downloadClicks = useStore((state) => state.downloadClicks);
  const tutorialActive = useStore((state) => state.tutorialActive);
  const [isVisible, setVisible] = useState(false);

  const FEEDBACK_FORM_LINK = import.meta.env.VITE_FEEDBACK_FORM;

  useEffect(() => {
    if (downloadClicks > 0 && downloadClicks % 5 == 0) {
      setVisible(true);
    }
  }, [downloadClicks]);
  return (
    <>
      {!tutorialActive && isVisible && (
        <div className="tutorial-container">
          <div className="feedback-text">
            Thank you for using Weavel Crochet! Since you have successfully
            finished a project, please consider leaving some feedback. Your
            input is greatly appreciated and can be used to make the building
            experience even better!
            <motion.div
              className="feedback-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                window.open(FEEDBACK_FORM_LINK, "_blank");
              }}
            >
              Leave Feedback
            </motion.div>
            <motion.div
              className="feedback-exit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setVisible(false);
              }}
            >
              No thank you
            </motion.div>
          </div>
          <div className="tutorial-blackout"></div>"
        </div>
      )}
    </>
  );
};

export default DonatePrompt;
