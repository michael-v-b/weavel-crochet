import useGlobalStore from "../../../../globalStore";
import supabase from "../../../../supabase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./tutorial.css";

/**
 * The main container class for all sub classes regarding the tutorial.
 */
const TutorialPrompt = () => {
  const [completedTutorial, setTutorial] = useState(true);

  //steps for tutorial. When Button pressed, iterate through step number, and subsequent lists
  //lists include, text list, reference list, and location list

  //when program runs test to see if user has completed tutorial already
  useEffect(() => {
    const getTutorialCompletion = async () => {
      const { data, error } = await supabase
        .from("Profiles")
        .select("finished_tutorial");
      setTutorial(data[0].finished_tutorial);
    };
    getTutorialCompletion();
  }, []);

  //if user has not completed tutorial, then launch it
  useEffect(() => {
    if (!completedTutorial) {
      console.log("launch tutorial");
    }
  }, [completedTutorial]);

  /**
   * Sets completedTutorial to true, thus closing the tutorial out
   */
  const completeTutorial = () => {
    setTutorial(true);
  };

  //thinking it through

  //I want tutorial prompt,
  //after starting tutorial, tutorial will go through each portion of website and explain it
  //at end of tutorial or if skipped set tutorial

  return (
    <>
      {!completedTutorial && (
        <div className="tutorial-container">
          <div className="tutorial-text-container">
            <div className="tutorial-text">
              Hey! We see that this is your first time opening up Weavel
              Crochet! Would you like a tour of the program?
            </div>
            <div className="tutorial-options-container">
              <motion.div
                className="tutorial-prev"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Yes please
              </motion.div>
              <motion.div
                className="tutorial-next"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={completeTutorial}
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
