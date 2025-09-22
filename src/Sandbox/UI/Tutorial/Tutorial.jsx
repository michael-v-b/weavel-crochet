import useGlobalStore from "../../../globalStore";
import supabase from "../../../supabase";
import { useEffect, useState } from "react";

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
};

export default Tutorial;
