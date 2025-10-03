import { useState, useEffect } from "react";
import useStore from "../../../DevTools/store";
import useRefStore from "../../../DevTools/refStore";
import TutorialWindow from "./TutorialWindow";

const TutorialManager = ({}) => {
  const tutorialActive = useStore((state) => state.tutorialActive);
  const setTutorial = useStore((state) => state.setTutorial);
  const refs = useRefStore((state) => state.refs);
  const [currentStep, setStep] = useState(0);

  useEffect(() => {
    console.log("refs");
    console.dir(refs["modeBar"]);
  }, [refs]);

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

  const textList = [
    "Text bubble 1",
    "Text bubble 2",
    "Text bubble 3",
    "Text bubble 4",
  ];

  const refList = [null, null, refs["modeBar"], null];

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

  return (
    <>
      {tutorialActive && (
        <TutorialWindow
          text={textList[currentStep]}
          anchor={refList[currentStep]}
          prevStep={decrementStep}
          nextStep={incrementStep}
        />
      )}
    </>
  );
};

export default TutorialManager;
