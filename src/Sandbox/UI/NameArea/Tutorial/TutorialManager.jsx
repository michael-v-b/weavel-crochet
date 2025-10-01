import { useState } from "react";
import useStore from "../../../DevTools/store";
import TutorialWindow from "./TutorialWindow";

const TutorialManager = () => {
  const tutorialActive = useStore((state) => state.tutorialActive);
  const [currentStep, setStep] = useState(0);

  return (
    <>
      {tutorialActive && (
        <TutorialWindow text="MEGA TEXT THIS IS A LONGER TEXT MESSAGE JUST TO SEE HOW THIS THING IS GOING TO FORMAT EVEN LONGER TEXT JUST TO SEE WHERE THIS THING GOES" />
      )}
    </>
  );
};

export default TutorialManager;
