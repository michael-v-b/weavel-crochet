import useGlobalStore from "../../../../globalStore";
import supabase from "../../../../supabase";
import useStore from "../../../DevTools/store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./tutorial.css";

/**
 * The main container class for all sub classes regarding the tutorial.
 */
const TutorialPrompt = () => {
  const [promptVisible, setPromptVisible] = useState(true);
  const setTutorial = useStore((state) => state.setTutorial);

  //steps for tutorial. When Button pressed, iterate through step number, and subsequent lists
  //lists include, text list, reference list, and location list

  //when program runs test to see if user has completed tutorial already
  useEffect(() => {
    const getTutorialCompletion = async () => {
      const { data, error } = await supabase
        .from("Profiles")
        .select("finished_tutorial");
      setPromptVisible(!data[0].finished_tutorial);
    };
    getTutorialCompletion();
  }, []);

  /**
   * Sets completedTutorial to true, thus closing the tutorial out
   */

  //thinking it through

  //I want tutorial prompt,
  //after starting tutorial, tutorial will go through each portion of website and explain it
  //at end of tutorial or if skipped set tutorial

  return (
    <>
      {promptVisible && (
        <div className="tutorial-container">
          <div className="tutorial-text-container">
            <div className="tutorial-text">
              Hey! We see that this is your first time opening up Weavel
              Crochet! Would you like a tour of the program?
            </div>
            <div className="tutorial-options-container">
              <motion.div
                className="tutorial-dark"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setPromptVisible(false);
                  setTutorial(true);
                }}
              >
                Yes please
              </motion.div>
              <motion.div
                className="tutorial-light"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setPromptVisible(false);
                }}
              >
                No, thank you
              </motion.div>
            </div>
          </div>
          <div className="tutorial-blackout" />
        </div>
      )}
    </>
  );
};

export default TutorialPrompt;
