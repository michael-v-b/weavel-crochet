import ShapeWindow from "./ShapeWindow";
import TransformWindow from "./TransformWindow";
import "./ToolWindow.css";
import useStore from "../../DevTools/store";
import useRefStore from "../../DevTools/refStore";
import { useEffect, useRef } from "react";

/**
 * @typedef {ToolWindow} - Window that changes depending on which mode is selected.
 * @property {GetShapeCallback} getShape - Lets most recently spawned shape be accessible by parents.
 * @property {mouseHoverRef} mouseHoverRef - a reference to the Mouse Hover object.
 * @returns {Component} - div with differing buttons with different purposes depending on the mode.
 */
const ToolWindow = ({ getShape, mouseHoverRef }) => {
  const mode = useStore((state) => state.mode);
  const setRefs = useRefStore((state) => state.setRefs);
  const toolRef = useRef(null);

  useEffect(() => {
    if (toolRef) {
      setRefs("tools", toolRef);
    }
  }, [toolRef]);
  return (
    <div ref={toolRef} className="side-window">
      <div className="side-title-bar">Tools</div>
      <div className="tools">
        {mode == "camera" && (
          <div
            style={{
              color: "red",
              backgroundColor: "#d6eaf8",
              fontSize: "3.5vh",
            }}
          >
            NOTE: YOU CANNOT USE TOOLS, SELECT, OR DESELECT OBJECTS IN CAMERA
            MODE!
          </div>
        )}

        {mode == "shapes" && (
          <ShapeWindow getShape={getShape} mouseHoverRef={mouseHoverRef} />
        )}
        {mode == "transform" && (
          <TransformWindow mouseHoverRef={mouseHoverRef} />
        )}
      </div>
    </div>
  );
};
export default ToolWindow;
