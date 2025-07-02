
import ModeButton from "../Buttons/ModeButton.jsx";
import {useEffect,forwardRef,useRef} from "react";
import "./ModeBar.css";
import useStore from "../../DevTools/store.js";

/*modes: 
    -camera mode
    -transform mode
    -export
*/

/**
 *@typedef {ModeBar} - Top bar used to change the mode of the project.
 *@property {ExporterRef} exporterRef- gives access to all of Exporter's public methods.
 *@returns {Component} - a div with buttons representing the different modes as well as the export button.
 */
const ModeBar = ({ exporterRef, historyRef, mouseHoverRef}) => {
  //allows current mode to be changed
  const mode = useStore((state)=>state.mode);
  const setMode = useStore((state) => state.setMode);
  const currentMode = useStore((state) => state.mode);
  const undoList = useStore((state) => state.undoList);
  const redoList = useStore((state) => state.redoList);
  const keysPressed = useStore((state)=>state.keysPressed);
  const isDragging = useStore((state)=>state.isDragging);
  const isFocused = useStore((state)=>state.isFocused);

  
  //const [currentMode, setMode] = useState("camera");
  const cameraButton = useRef(null);
  const transformButton = useRef(null);
  const drawButton = useRef(null);
  const exportButton = useRef(null);
  const buttonList = [cameraButton, transformButton, drawButton];
  const modeKey = [["camera",cameraButton], ["transform",transformButton], ["draw",drawButton]];
  /*MODE KEY 
  0 = camera
  1 = transform
  */

  /*@function Sends mode to app className
  string mode: string that represents mode of app*/
  const handleMode = (newMode) => {
    /*for (let i = 0; i < buttonList.length; i++) {
      if (i != mode) {
        buttonList[i].current.setPressed(false);
      }
    }*/

    if (newMode!= currentMode) {
      setMode(newMode);
    } else {
      setMode("none");
    }
  };

  useEffect(()=>{
    if(!isFocused && !isDragging && keysPressed.includes("KeyC")) {
      if(mode == 'camera') {
        setMode('none');
      } else {
        setMode('camera');
      }

    }
  },[keysPressed]);

  useEffect(()=>{

    for(let i = 0; i < modeKey.length; i++) {
      const modeButtonRef = modeKey[i][1];
      if (!modeButtonRef?.current) {
        return;
      }
      if(mode == modeKey[i][0]) {
        modeButtonRef.current.setPressed(true);
      } else {
        modeButtonRef.current.setPressed(false);
      }
    }
  },[mode]);

  const handleMouseEnter = (element) => {
    mouseHoverRef.current.startTimer(element);
  }

  const ModeButtonWrapper = forwardRef(({name, mode = -1,...props}, ref) => {
    return <ModeButton 
      ref = {ref} 
      onMouseEnter = {()=>{
        mouseHoverRef.current.startTimer(name)
      }} 
      {...props}/>
  });


  return (
    <div className="mode-bar">
      <div className="mode-buttons">
        {modeKey.map((value,key) => {
          const tempMode = value[0];
          const capitalName = tempMode.charAt(0).toUpperCase() + tempMode.slice(1);
          const tempButtonRef = value[1];
          return <ModeButton 
            key = {key} 
            ref = {tempButtonRef} 
            name = {capitalName} 
            onClick = {()=>{handleMode(tempMode)}}>
              {capitalName}
              </ModeButton>

        })}
      </div>
      <div className="right-side">
        <ModeButton
          canPress={false}
          onClick={() => {
            historyRef.current.makeAction(undoList, true);
          }}
        >
          Undo
        </ModeButton>
        <ModeButton
          canPress={false}
          onClick={() => {
            historyRef.current.makeAction(redoList, false);
          }}
        >
          {" "}
          Redo{" "}
        </ModeButton>
        <ModeButton
          ref={exportButton}
          canPress={false}
          onClick={() => {
            exporterRef.current.exportPDF();
          }}
        >
          {" "}
          Export PDF
        </ModeButton>
      </div>
    </div>
  );
};
export default ModeBar;
