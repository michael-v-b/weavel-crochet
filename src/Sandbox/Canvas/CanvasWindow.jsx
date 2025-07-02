import { Canvas } from "@react-three/fiber";
import { CameraControls} from "@react-three/drei";
import CameraTracker from "./Managers/CameraTracker";

import MeshSpawner from "./Managers/MeshSpawner";
import RayCaster from "./Managers/RayCaster";
import SelectionManager from "./Managers/SelectionManager";
import ToolManager from "./Managers/ToolManager";
import Deleter from "./Managers/Deleter";
import IntersectionManager from "./Managers/IntersectionManager";
import History from "../DevTools/History/History";
import SizeManager from "./Managers/SizeManager";
import Screenshotter from "../DevTools/Screenshotter";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import useStore from "../DevTools/store";

/**
 * @typedef {CanvasWindow} - window that shows and allows interaction with the meshes.

  * @property {SelectionManagerReference} selectionManagerRef - allows access to all of selection manager's public methods.
 * @property {MeshSpawnerReference} meshSpawnerRef - allows the mesh spawner to be accessed by canvas parents
 * @property {cameraTrackerReference} cameraTrackerRef - allows the cameraTracker to be accessed by canvas parents
 * @property {deleterReference} deleterRef - allows the deleterRef to be accessed by canvas parents
 * @property {Component} children - component to be given parent-child relationship with Canvas Window

 */
const CanvasWindow = forwardRef(
  (
    {
      historyRef,
      deleterRef,
      selectionManagerRef,
      meshSpawnerRef,
      cameraTrackerRef,
      children,
      screenshotRef,
    },
    ref
  ) => {

    
    CanvasWindow.displayName = "Canvas Window";
    const mode = useStore((state) => state.mode);
    const isFocused = useStore((state)=>state.isFocused);
  
    const [pendingPointerEvent,setPendingPointerEvent] = useState(null);

    const raycasterRef = useRef(null);
    const toolManagerRef = useRef(null);
    const intersectionManagerRef = useRef(null);
    const rotaterRef = useRef(null);

   

    /**
     * when mouseDown cast ray with raycaster and update selections.
     * Disabled during Camera mode.
     * @param {Event} event - used for pointer position in raycaster.
     */
    const handleRay = (event) => {
      if (
        mode != "camera" &&
        raycasterRef.current &&
        selectionManagerRef &&
        selectionManagerRef.current
      ) {
        const rayMeshes = raycasterRef.current.castRayObject(event);
        selectionManagerRef.current.handleSelections(rayMeshes);
        toolManagerRef.current.handleRay(rayMeshes[0], event);
      }
    };


    /**
     * initializes pointer event if focused, triggers handleRay when not.
     * @param {Event} event - The pointer event with onPointerDown in Canvas
     */
    const handleClick = (event) => {
      if(isFocused) {
        setPendingPointerEvent(event);
      } else {
        handleRay(event);
      }
    }

    //use effect only triggers handle ray after isFocused is set to false
    useEffect(()=>{
      if(pendingPointerEvent && !isFocused) {
        handleRay(pendingPointerEvent);
        setPendingPointerEvent(null);
      }

    },[pendingPointerEvent, isFocused]);


    //removes touch move functionality.
    useEffect(()=>{
      const canvas = document.querySelector('canvas');

      const handleTouchMove = (e) => {
        e.preventDefault();
      }
      
      canvas.addEventListener('touchmove',handleTouchMove,{passive:false});

      return ()=>{
        canvas.removeEventListener('touchmove',handleTouchMove);
      }
    },[]);

    /**
     * Spawns a mesh in the canvas.
     *@param {string} shape - meshType being spawned.
     */
    const spawnMesh = (shape) => {
      if (mode == "shapes") {
        meshSpawnerRef.current.spawnMesh(shape);
      } else {
        console.log("can not spawn mesh outside of draw mode");
      }
    };

    useImperativeHandle(ref, () => ({ spawnMesh }));

    //updates canvas once mode is changed

    return (
      <Canvas
        onPointerDown={handleClick}
        shadows={true}
        style={{
          height: "90%",
          width: "100%",
          backgroundColor: "#ebf5fb ",
          borderBottomRightRadius: "25px",
          borderBottomLeftRadius: "25px",
          touchAction:"none",
        }}
      >
        <SizeManager/>
        <Screenshotter ref = {screenshotRef}/>

        <IntersectionManager ref = {intersectionManagerRef} />
        <History
          ref={historyRef}
          meshSpawnerRef={meshSpawnerRef}
          deleterRef={deleterRef}
          rotaterRef={rotaterRef}
        />

        <ambientLight intensity={0.5} />
        <pointLight
          castShadow={true}
          position={[20, 20, 10]}
          intensity={1000}
        />
        {/*bottom platform*/}
        <gridHelper args={[10, 10]} position={[0, 0, 0]} />

        {/*mesh spawner*/}
        <MeshSpawner ref={meshSpawnerRef} />

        <ToolManager
          ref={toolManagerRef}
          intersectionManagerRef = {intersectionManagerRef}
          rotaterRef={rotaterRef}
          raycaster={raycasterRef}
        />

        <RayCaster ref={raycasterRef} />

        <SelectionManager ref={selectionManagerRef} mode={mode} />

        <Deleter
          ref={deleterRef}
          selectionManagerRef={selectionManagerRef}
          meshSpawnerRef={meshSpawnerRef}
        />
        {children}

        <CameraTracker ref = {cameraTrackerRef}/>
        {mode == "camera" && <CameraControls />}
      </Canvas>
    );
  }
);

export default CanvasWindow;
