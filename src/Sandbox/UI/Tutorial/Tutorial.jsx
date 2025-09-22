import useGlobalStore from "../../../globalStore";
import supabase from "../../../supabase";
import { useEffect, useState } from "react";
import "./tutorial.css";

const Tutorial = () => {
  const [completedTutorial, setTutorial] = useState(true);

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
              Hey! We see that this is your first time opening up Weavel! Would
              you like a tour of the program?
            </div>
          </div>
          <div className="tutorial-blackout" />
        </div>
      )}
    </>
  );
};

export default Tutorial;
