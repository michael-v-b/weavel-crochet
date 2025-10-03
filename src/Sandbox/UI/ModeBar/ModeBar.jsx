import ModeButton from "../Buttons/ModeButton.jsx";
import { useEffect, forwardRef, useRef } from "react";
import "./ModeBar.css";
import useStore from "../../DevTools/store.js";
import useRefStore from "../../DevTools/refStore.js";
import CameraIcon from "../../../assets/Icons/Modes/camera.svg?react";
import TransformIcon from "../../../assets/Icons/Modes/transform.svg?react";
import ShapesIcon from "../../../assets/Icons/Modes/shapes.svg?react";
import UndoIcon from "../../../assets/Icons/Modes/undo.svg?react";
import RedoIcon from "../../../assets/Icons/Modes/redo.svg?react";
import DownloadIcon from "../../../assets/Icons/Modes/download.svg?react";

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
const ModeBar = ({ exporterRef, historyRef, mouseHoverRef }) => {
  //allows current mode to be changed
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);
  const currentMode = useStore((state) => state.mode);
  const undoList = useStore((state) => state.undoList);
  const redoList = useStore((state) => state.redoList);
  const keysPressed = useStore((state) => state.keysPressed);
  const isDragging = useStore((state) => state.isDragging);
  const isFocused = useStore((state) => state.isFocused);
  const setRefs = useRefStore((state) => state.setRefs);

  //const [currentMode, setMode] = useState("camera");

  const transformButton = useRef(null);
  const cameraButton = useRef(null);
  const shapeButton = useRef(null);
  const exportButton = useRef(null);
  const modeBarRef = useRef(null);
  const modeKey = [
    ["camera", cameraButton, <CameraIcon className="mode-icon" />],
    ["transform", transformButton, <TransformIcon className="mode-icon" />],
    ["shapes", shapeButton, <ShapesIcon className="mode-icon" />],
  ];
  /*MODE KEY 
  0 = camera
  1 = transform
  */

  /*@function Sends mode to app className
  string mode: string that represents mode of app*/
  const handleMode = (newMode) => {
    if (newMode != currentMode) {
      setMode(newMode);
    } else {
      setMode("none");
    }
  };

  //keyboard shortcut for the camera
  useEffect(() => {
    if (!isFocused && !isDragging && keysPressed.includes("KeyC")) {
      if (mode == "camera") {
        setMode("none");
      } else {
        setMode("camera");
      }
    }
  }, [keysPressed]);

  //autoamtically deselects other modes when one is selected
  useEffect(() => {
    for (let i = 0; i < modeKey.length; i++) {
      const modeButtonRef = modeKey[i][1];
      if (!modeButtonRef?.current) {
        return;
      }
      if (mode == modeKey[i][0]) {
        modeButtonRef.current.setPressed(true);
      } else {
        modeButtonRef.current.setPressed(false);
      }
    }
  }, [mode]);

  useEffect(() => {
    if (modeBarRef) {
      setRefs("modeBar", modeBarRef);
    }
  }, [modeBarRef]);

  const ModeButtonWrapper = forwardRef(({ name, mode = -1, ...props }, ref) => {
    return (
      <ModeButton
        ref={ref}
        onMouseEnter={() => {
          mouseHoverRef.current.startTimer(name);
        }}
        onMouseLeave={() => {
          mouseHoverRef.current.cancelTimer();
        }}
        {...props}
      />
    );
  });

  return (
    <div ref={modeBarRef} className="mode-bar">
      <div className="mode-buttons">
        {modeKey.map((value, key) => {
          const tempMode = value[0];
          const capitalName =
            tempMode.charAt(0).toUpperCase() + tempMode.slice(1);
          const tempButtonRef = value[1];
          const icon = value[2];
          return (
            <ModeButtonWrapper
              key={key}
              ref={tempButtonRef}
              name={capitalName}
              onClick={() => {
                handleMode(tempMode);
              }}
            >
              {icon}
            </ModeButtonWrapper>
          );
        })}
      </div>
      <div className="right-side">
        <ModeButtonWrapper
          canPress={false}
          name={"Undo"}
          onClick={() => {
            historyRef.current.makeAction(undoList, true);
          }}
        >
          <UndoIcon className="mode-icon" />
        </ModeButtonWrapper>
        <ModeButtonWrapper
          canPress={false}
          name={"Redo"}
          onClick={() => {
            historyRef.current.makeAction(redoList, false);
          }}
        >
          <RedoIcon className="mode-icon" />
        </ModeButtonWrapper>
        <ModeButtonWrapper
          ref={exportButton}
          canPress={false}
          name={"Export PDF"}
          onClick={() => {
            exporterRef.current.exportPDF();
          }}
        >
          <DownloadIcon className="mode-icon" />
        </ModeButtonWrapper>
      </div>
    </div>
  );
};
export default ModeBar;
