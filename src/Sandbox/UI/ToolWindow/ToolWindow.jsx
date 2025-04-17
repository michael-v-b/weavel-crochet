import DrawWindow from "./DrawWindow";
import TransformWindow from "./TransformWindow";
import "./ToolWindow.css";
import useStore from "../../DevTools/store";

/**
 * @typedef {ToolWindow} - Window that changes depending on which mode is selected.
 * @property {GetShapeCallback} getShape - Lets most recently spawned shape be accessible by parents.
 * @returns {Component} - div with differing buttons with different purposes depending on the mode.
 */
const ToolWindow = ({
  getShape,
}) => {
  const mode = useStore((state) => state.mode);
  return (
    <div className="side-window">
      <div className="side-title-bar">Tools</div>
      <div className="tools">
        {mode == "camera" && (
          <div
            style={{
              color: "red",
              backgroundColor: "#d6eaf8",
            }}
          >
            NOTE: YOU CANNOT USE TOOLS, SELECT, OR DESELECT OBJECTS IN CAMERA
            MODE!
          </div>
        )}

        {mode == "draw" && <DrawWindow getShape={getShape} />}
        {mode == "transform" && <TransformWindow />}
      </div>
    </div>
  );
};
export default ToolWindow;
