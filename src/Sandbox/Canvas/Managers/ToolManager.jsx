import Translater from "../Tools/Translater";
import Rotater from "../Tools/Rotater";
import { useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import useStore from "../../DevTools/store";

/**
 * @typedef {ToolManager} - manages whether a tool should be active
 * which tool should be active and where it shoudl be located.
 *@property {Raycaster} raycaster - raycaster object, mainly to be passed donw to other tools.
 * @property {RotaterRef} rotaterRef - reference to the rotater object.
 * @property {IntersectionManagerRef} intersectionManagerRef - reference to the intersection Manager
 * @returns {Component} - lists all of the tools and activates them based on the tool property.
 */

const ToolManager = forwardRef(({ raycaster, rotaterRef,intersectionManagerRef}, ref) => {
  ToolManager.displayName = "Tool Manager";
  const tool = useStore((state) => state.tool);
  const setTool = useStore((state)=>state.setTool);
  const setMode = useStore((state)=>state.setMode);
  const selectedList = useStore((state) => state.selectedMeshes);
  const updateAvgPosition = useStore((state) => state.updateAvgPosition);
  const keysPressed = useStore((state)=>state.keysPressed);
  const isFocused = useStore((state)=>state.isFocused);
  const isDragging = useStore((state)=>state.isDragging);
  const translaterRef = useRef(null);

  /**
   *Finds average position of all objects in selectedList,
   *then updates state and sends it in getAvgPosition callback functions.
   */

  /**
   * Activates the widget based on current tool.
   *@param {[Widget]} widgetMeshes - lists all widgets that ray intersected
   * @param {event } event - used to pass to tool objects
   */
  const handleRay = (widgetMeshes, event) => {
    if (widgetMeshes.length <= 0) {
      return;
    }
    if (tool == "translate") {
      translaterRef.current.handleRay(widgetMeshes, event);
    }
    if (tool == "rotate") {
      rotaterRef.current.handleRay(widgetMeshes, event);
    }
  };

  /**
   * Updates position if selectedList changes and there is an object selected.
   */
  useEffect(() => {
    if (selectedList.length > 0) {
      updateAvgPosition();
    }
  }, [selectedList]);

  //updates when not dragging or focused
  useEffect(()=>{
    if(!isFocused && !isDragging) {
      if(keysPressed.includes("KeyT")) {
        if(tool == 'translate') {
          setTool('none');
        } else {
        setTool("translate");
        }
        setMode('none');
      } else if(keysPressed.includes("KeyR")) {
        if(tool == 'rotate') {
          setTool('none');
        } else {
          setTool("rotate");
        }
        setMode('none');
      }
    }
  },[keysPressed]);

  useImperativeHandle(ref, () => ({
    handleRay,
  }));

  return (
    <>
      <mesh>
        <Translater ref={translaterRef} intersectionManagerRef = {intersectionManagerRef} raycaster={raycaster} />

        <Rotater ref={rotaterRef} raycaster={raycaster} />
      </mesh>
    </>
  );
});

export default ToolManager;
