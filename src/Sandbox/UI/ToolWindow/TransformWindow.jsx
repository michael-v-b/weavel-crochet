import ToolButton from "../Buttons/ToolButton";
import {
  useRef,
  useEffect,
} from "react";
import useStore from "../../DevTools/store";

/**
 *@typedef {TransformWindow} - Window that has many buttons that represent the different tools the user can utilize.
 *@property {Reference} mouseHoverRef - a reference to the MouseHover object.
 * @returns {Component} - div with all the different transformation tools the user can utilize.
 */
const TransformWindow = ({mouseHoverRef}) => {
  const translateButton = useRef(null);
  const rotateButton = useRef(null);
  const toolKey= [["translate",translateButton], ["rotate",rotateButton]];

  const currentTool = useStore((state) => state.tool);
  const setTool = useStore((state) => state.setTool);

  /**
   *When a button is pressed it will update its state in the  transform window.
   *@param {string} newTool - tool that was pressed.
   */
  const handleClick = (newTool) => {
      if (newTool != currentTool) {
        setTool(tool);
      } else {
        setTool("none");
      }
  }
  


  useEffect(()=>{

    for(let i = 0; i < toolKey.length;i++) {
      if(!toolKey[i][1]?.current) {
        return;
      }

      if(currentTool == toolKey[i][0]) {
        toolKey[i][1].current.setPressed(true);
      } else {
        toolKey[i][1].current.setPressed(false);
      }
    }
  },[currentTool]);


  return (
    <>
    {toolKey.map((value,key) => {
      const name = value[0];
      const buttonRef = value[1];
      const capital = name.charAt(0).toUpperCase() + name.slice(1);
      return <ToolButton 
      ref = {buttonRef}
      key = {key}
      onClick = {()=>{
        handleClick(name);
      }}
      onMouseEnter = {()=>{
        mouseHoverRef.current.startTimer(capital);
      }}
      onMouseLeave = {()=>{
        mouseHoverRef.current.cancelTimer(capital);
      }}>
        {capital}
      </ToolButton>
    })}
      {/*<ToolButton
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
      </ToolButton>*/}
    </>
  );
};
export default TransformWindow;
