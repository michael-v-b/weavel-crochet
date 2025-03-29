import ToolButton from "../Buttons/ToolButton";
import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import useStore from "../../DevTools/store";

/**
 *@typedef {TransformWindow} - Window that has many buttons that represent the different tools the user can utilize.
 *@property {string} currentTool - the tool being selected, used for button pressed state.
 *@property {GetToolCallback} getTool - Lets tool be accessible to parents.
 *@property {[{string}]} keysPressed - a list of keys currently pressed down.
 * @property {boolean} isFocused - is true when user is focused on input field.
 * @returns {Component} - div with all the different transformation tools the user can utilize.
 */
const TransformWindow = () => {
  const translateButton = useRef(null);
  const rotateButton = useRef(null);
  const scaleButton = useRef(null);
  const toolButtonList = [translateButton, rotateButton];
  const toolKey = ["translate", "rotate"];

  const isFocused = useStore((state) => state.isFocused);
  const currentTool = useStore((state) => state.tool);
  const setTool = useStore((state) => state.setTool);
  const keysPressed = useStore((state) => state.keysPressed);

  /**
   *When a button is pressed it will update its state in the  transform window.
   *@param {string} tool - tool that was pressed.
   */
  const handleClick = (tool) => {
    for (let i = 0; i < toolButtonList.length; i++) {
      const button = toolButtonList[i].current;
      if (i != tool) {
        button.setPressed(false);
      } else {
        button.setPressed(!button.isPressed);
      }
    }
    if (toolKey[tool] != currentTool) {
      setTool(toolKey[tool]);
    } else {
      setTool("none");
    }
  };

  useEffect(() => {
    const toolIndex = toolKey.indexOf(currentTool);
    const currentToolButton = toolButtonList[toolIndex];
    if (currentToolButton) {
      currentToolButton.current.setPressed(true);
    }
  }, []);

  useEffect(() => {
    if (keysPressed.includes("KeyT") && !isFocused) {
      handleClick(0);
    } else if (keysPressed.includes("KeyR") && !isFocused) {
      handleClick(1);
    }
  }, [keysPressed]);

  return (
    <>
      <ToolButton
        ref={translateButton}
        onClick={() => {
          handleClick(0);
        }}
      >
        {" "}
        Translate{" "}
      </ToolButton>
      <ToolButton
        ref={rotateButton}
        onClick={() => {
          handleClick(1);
        }}
      >
        Rotate{" "}
      </ToolButton>
    </>
  );
};
export default TransformWindow;
