import { useState, useEffect } from "react";
import useStore from "../../../DevTools/store";
import TutorialWindow from "./TutorialWindow";

const TutorialManager = ({}) => {
  const tutorialActive = useStore((state) => state.tutorialActive);
  const setTutorial = useStore((state) => state.setTutorial);
  const [currentStep, setStep] = useState(0);

  const textList = [
    "Text bubble 1",
    "Text bubble 2",
    "Text bubble 3",
    "Text bubble 4",
  ];

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

  /**
   * if current step is more than the text list length then the tutorial ends
   */
  useEffect(() => {
    if (currentStep > textList.length - 1) {
      setTutorial(false);
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

  return (
    <>
      {tutorialActive && (
        <TutorialWindow
          text={textList[currentStep]}
          prevStep={decrementStep}
          nextStep={incrementStep}
        />
      )}
    </>
  );
};

export default TutorialManager;
