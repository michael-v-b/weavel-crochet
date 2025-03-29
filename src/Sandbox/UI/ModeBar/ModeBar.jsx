import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import ModeButton from "../Buttons/ModeButton.jsx";
import React, { useState, useRef, useContext } from "react";
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
const ModeBar = ({ exporterRef, historyRef }) => {
  //allows current mode to be changed
  const setMode = useStore((state) => state.setMode);
  const currentMode = useStore((state) => state.mode);
  const undoList = useStore((state) => state.undoList);
  const redoList = useStore((state) => state.redoList);
  const modeKey = ["camera", "transform", "draw"];
  //const [currentMode, setMode] = useState("camera");
  const cameraButton = useRef(null);
  const transformButton = useRef(null);
  const drawButton = useRef(null);
  const exportButton = useRef(null);
  const buttonList = [cameraButton, transformButton, drawButton];
  /*MODE KEY 
  0 = camera
  1 = transform
  */

  /*@function Sends mode to app className
  string mode: string that represents mode of app*/
  const handleMode = (mode) => {
    for (let i = 0; i < buttonList.length; i++) {
      if (i != mode) {
        buttonList[i].current.setPressed(false);
      }
    }

    if (modeKey[mode] != currentMode) {
      setMode(modeKey[mode]);
    } else {
      setMode("none");
    }
  };

  return (
    <div className="mode-bar">
      <div className="mode-buttons">
        <ModeButton
          ref={cameraButton}
          onClick={() => {
            handleMode(0);
          }}
        >
          Camera
        </ModeButton>
        <ModeButton
          ref={transformButton}
          onClick={() => {
            handleMode(1);
          }}
        >
          Transform
        </ModeButton>
        <ModeButton
          ref={drawButton}
          onClick={() => {
            handleMode(2);
          }}
        >
          Add Shape{" "}
        </ModeButton>
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
