import { useState, useEffect } from "react";
import useStore from "../../../DevTools/store";
import useRefStore from "../../../DevTools/refStore";
import TutorialWindow from "./TutorialWindow";
import TutorialValues from "./TutorialValues";
import supabase from "../../../../supabase";
import useGlobalStore from "../../../../globalStore";

const TutorialManager = ({}) => {
  const tutorialActive = useStore((state) => state.tutorialActive);
  const setTutorial = useStore((state) => state.setTutorial);
  const authData = useGlobalStore((state) => state.authData);
  const refs = useRefStore((state) => state.refs);
  const [currentStep, setStep] = useState(0);
  const tutorialValues = TutorialValues();

  /**
   * if current step is more than the text list length then the tutorial ends
   */
  useEffect(() => {
    if (currentStep >= tutorialValues.length - 1) {
      setTutorial(false);
      finishTutorial();
    }
  }, [currentStep]);

  /**
   * if tutorial is set active, then reset tutorial to the front
   */
  useEffect(() => {
    if (tutorialActive) {
      setStep(0);
    }
  }, [tutorialActive]);

  /**
   * increase current step in tutorial
   */
  const incrementStep = () => {
    setStep(currentStep + 1);
  };

  /**
   * decrease current step in tutorial
   */
  const decrementStep = () => {
    setStep(Math.max(currentStep - 1, 0));
  };

  const finishTutorial = async () => {
    if (!authData) {
      return;
    }
    const user_id = authData.user.id;
    const { error } = await supabase
      .from("Profiles")
      .update({ finished_tutorial: true })
      .eq("user_id", user_id);

    if (error) {
      console.log("error");
      console.dir(error);
    }
  };

  return (
    <>
      {tutorialActive && (
        <TutorialWindow
          text={tutorialValues[currentStep][0]}
          anchor={tutorialValues[currentStep][1]}
          nextFlag={tutorialValues[currentStep][2]}
          orientation={tutorialValues[currentStep][3]}
          prevStep={decrementStep}
          nextStep={incrementStep}
          step={currentStep}
        />
      )}
    </>
  );
};

export default TutorialManager;
