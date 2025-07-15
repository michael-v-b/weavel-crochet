import "./styles.css";
import CanvasWindow from "./Canvas/CanvasWindow";

import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";

import ToolWindow from "./UI/ToolWindow/ToolWindow";
import InfoWindow from "./UI/InfoWindow/InfoWindow";
import Hierarchy from "./UI/Hierarchy/Hierarchy";
import ColorWindow from "./UI/ColorWindow/ColorWindow";
import NameTag from "./UI/NameTag/NameTag";
import LoadScreen from "../UI/LoadScreen/LoadScreen";
import ModeBar from "./UI/ModeBar/ModeBar";
import WarningPop from "../UI/WarningPop/WarningPop";
import ProjectDim from "./UI/ProjectDim/ProjectDim";
import MouseHover from "./UI/MouseHover/MouseHover";

import KeyTracker from "./DevTools/KeyTracker";
import ProjectReader from "./DevTools/ProjectReader";
import useStore from "./DevTools/store";

import Exporter from "./Export/Exporter";

import PortraitWarning from "./PortraitWarning/PortraitWarning";

import { useRef, useEffect,useState } from "react";
import { useLocation } from "react-router";
import useGlobalStore from "../globalStore";
import AuthTester from "../AuthTester";

import supabase from "../supabase";

/**
 *@typedef {Project} - page for full project, connects all parts of project together in a central unit.
 *@returns {Component} main page of project, contains all of the windows.
 */
const Sandbox = () => {
  const selectionManagerRef = useRef(null);
  const canvasRef = useRef(null);
  const screenshotRef = useRef(null);
  const meshSpawnerRef = useRef(null);
  const hierarchyRef = useRef(null);
  const exporterRef = useRef(null);
  const historyRef = useRef(null);
  const cameraTrackerRef = useRef(null);
  const projectReaderRef = useRef(null);
  const deleterRef = useRef(null);
  const mouseHoverRef = useRef(null);

  const auth = useGlobalStore((state) => state.auth);
  const authData = useGlobalStore((state) => state.authData);
  const projectFile = useStore((state) => state.projectFile);
  const projectId = useStore((state) => state.projectId);
  const setMeshLoading = useStore((state) => state.setMeshLoading);
  const setNameLoading = useStore((state) => state.setNameLoading);
  const nameLoading = useStore((state) => state.nameLoading);
  const meshLoading = useStore((state) => state.meshLoading);
  const setWarningText = useStore((state) => state.setWarningText);

  const [isPortrait, setPortrait] = useState(false);

  const location = useLocation();
  /**
   *spawns a new mesh into the scene.
   *@param {string} shape - type of mesh to be added to the scene.
   */
  const handleShape = (shape) => {
    canvasRef.current.spawnMesh(shape);
  };

  const uploadFile = async () => {

    const path = "" + authData.user.id + "/" + projectId + "/data.json";
    const jsonBlob = new Blob([JSON.stringify(projectFile)], {
      type: "application/json",
    });


    console.log("update this path: " + path);
    const { data, error } = await supabase.storage
      .from("Project Files")
      .update(path, jsonBlob);
  };

  //affects loading window
  useEffect(() => {
    setNameLoading(true);
    setMeshLoading(true);
    setWarningText("");
    
    //set is landscape

    const handleResize = () => {
      if(window.innerWidth > 480) {
        setPortrait(false);
      } else if (window.innerHeight > 480){
        setPortrait(true);
      }
    }

    handleResize();

    window.addEventListener('resize',handleResize);

    return ()=> {window.removeEventListener('resize',handleResize)}
    
  }, []);

  //updates file when change occurs but only if projectId is correct.
  useEffect(() => {
    if (cameraTrackerRef?.current) {
      const cameraPosition = cameraTrackerRef.current.getCameraPosition();
      const cameraRotation = cameraTrackerRef.current.getCameraRotation();

    
      for(let i = 0; i < cameraPosition.length;i++) {
        cameraPosition[i] = parseFloat(cameraPosition[i].toFixed(2));
        cameraRotation[i] = parseFloat(cameraRotation[i].toFixed(2)); 
      }
      //update camera first prevents having to do this every frame
  
      projectFile.cameraPosition = cameraPosition;
      projectFile.cameraRotation = cameraRotation;
    }

    const currentURL = location.pathname;
    const idIndex = currentURL.indexOf("sandbox/");
    const tempId = currentURL.substring(idIndex + "sandbox/".length);
    if (auth && projectId == tempId && projectFile != null) {
      uploadFile();
    }
  }, [projectFile]);

  return (
    <>
      <MouseHover ref = {mouseHoverRef}/>
      <div className="webpage">
        <WarningPop />
        {isPortrait && <PortraitWarning/>}
        <LoadScreen visible={meshLoading || nameLoading} />

        <ProjectReader
          ref={projectReaderRef}
          cameraTrackerRef={cameraTrackerRef}
          meshSpawnerRef={meshSpawnerRef}
        />
        <Banner />
        <AuthTester reroute={"/"} />
        <NameTag />
        <div className="sandbox">
          <Exporter ref={exporterRef} screenshotRef = {screenshotRef}/>
          <KeyTracker />

          <div className="left-window">
            <ToolWindow getShape={handleShape} mouseHoverRef = {mouseHoverRef}/>
            <ColorWindow />
          </div>

          <div className="canvas-div">
            <ModeBar exporterRef={exporterRef} historyRef={historyRef} mouseHoverRef = {mouseHoverRef} />
            {!meshLoading && !nameLoading && <ProjectDim/>}
            <CanvasWindow
              ref={canvasRef}
              screenshotRef = {screenshotRef}
              historyRef={historyRef}
              deleterRef = {deleterRef}
              selectionManagerRef={selectionManagerRef}
              meshSpawnerRef={meshSpawnerRef}
              cameraTrackerRef={cameraTrackerRef}
            />
          </div>
          <div className="right-window">
            <Hierarchy
              ref={hierarchyRef}
              selectionManager={selectionManagerRef}
            />
            <InfoWindow deleterRef = {deleterRef}/>
          </div>
        </div>
        <div style = {{height:'10vh'}}></div>
        <Footer/>
      </div>
    </>
  );
};
export default Sandbox;
