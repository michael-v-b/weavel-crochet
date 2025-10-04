import useRefStore from "../../../DevTools/refStore";
import useStore from "../../../DevTools/store";
const TutorialValues = () => {
  const refs = useRefStore((state) => state.refs);
  const mode = useStore((state) => state.mode);
  const modeBar = refs["modeBar"];
  const canvas = refs["canvas"];
  //adding the extra value in the back is a quick fix
  return [
    [
      `Welcome to the Tutorial for Weavel Crochet, this guide will help start your journey 
      to creating your own custom unique crochet creations! Hit next to continue, hit next 
      to continue to the next step.`,
      null,
      true,
    ],
    ["To start off, let’s talk about Modes!", modeBar, true],
    [
      "There are 3 Modes that your canvas can be in, Camera Mode, Tools Mode and Shapes Mode",
      modeBar,
      true,
    ],
    [
      "Please click on the Camera to Enter Camera Mode",
      modeBar,
      mode == "camera",
    ],
    [
      "Now you can drag your mouse around the Canvas to change the direction of the camera",
      canvas,
      true,
    ],
    [],
  ];
};

export default TutorialValues;
