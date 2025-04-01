import "./styles.css";
import CanvasWindow from "./Canvas/CanvasWindow";

import ToolWindow from "./UI/ToolWindow/ToolWindow";
import InfoWindow from "./UI/InfoWindow/InfoWindow";
import Hierarchy from "./UI/Hierarchy/Hierarchy";
import ColorWindow from "./UI/ColorWindow/ColorWindow";
import NameTag from "./UI/NameTag/NameTag";
import Banner from "../UI/Banner/Banner";
import LoadScreen from "../UI/LoadScreen/LoadScreen";
import ModeBar from "./UI/ModeBar/ModeBar";

import KeyTracker from "./DevTools/KeyTracker";
import ProjectReader from "./DevTools/ProjectReader";
import useStore from "./DevTools/store";

import Exporter from "./Export/Exporter";

import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useGlobalStore from "../globalStore";
import AuthTester from "../AuthTester";
import { motion } from "framer-motion";

import supabase from "../supabase";

/**
 *@typedef {Project} - page for full project, connects all parts of project together in a central unit.
 *@returns {Component} main page of project, contains all of the windows.
 */
const Sandbox = () => {
  const selectionManagerRef = useRef(null);
  const canvasRef = useRef(null);
  const meshSpawnerRef = useRef(null);
  const hierarchyRef = useRef(null);
  const exporterRef = useRef(null);
  const historyRef = useRef(null);
  const projectReaderRef = useRef(null);
  const auth = useGlobalStore((state) => state.auth);
  const authData = useGlobalStore((state) => state.authData);
  const projectFile = useStore((state) => state.projectFile);
  const projectId = useStore((state) => state.projectId);
  const setMeshLoading = useStore((state) => state.setMeshLoading);
  const setNameLoading = useStore((state) => state.setNameLoading);
  const nameLoading = useStore((state) => state.nameLoading);
  const meshLoading = useStore((state) => state.meshLoading);
  const navigate = useNavigate();
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

    const { data, error } = await supabase.storage
      .from("Project Files")
      .upload(path, jsonBlob, { upsert: true });
  };

  useEffect(() => {
    setNameLoading(true);
    setMeshLoading(true);
    //loading is set false in name tag
  }, []);

  //updates file when change occurs but only if projectId is correct.
  useEffect(() => {
  
    const currentURL = location.pathname;
    const idIndex = currentURL.indexOf("sandbox/");
    const tempId = currentURL.substring(idIndex + "sandbox/".length);
    if (auth && projectId == tempId && projectFile != null) {
      uploadFile();
    }
  }, [projectFile]);

  return (
    <>
      <div className="webpage">
        <LoadScreen visible={meshLoading || nameLoading} />

        <ProjectReader ref={projectReaderRef} meshSpawnerRef={meshSpawnerRef} />
        <Banner />
        <AuthTester reroute = {"/"} />
        <NameTag />
        <div className="sandbox">
          <Exporter ref={exporterRef} />
          <KeyTracker />

          <div className="left-window">
            <ToolWindow getShape={handleShape} />
            <ColorWindow />
          </div>

          <div className="canvas-div">
            <ModeBar exporterRef={exporterRef} historyRef={historyRef} />
            <CanvasWindow
              ref={canvasRef}
              historyRef={historyRef}
              selectionManagerRef={selectionManagerRef}
              meshSpawnerRef={meshSpawnerRef}
            />
          </div>
          <div className="right-window">
            <Hierarchy
              ref={hierarchyRef}
              selectionManager={selectionManagerRef}
            />
            <InfoWindow />
          </div>
        </div>
        <div className="bottom-area">
          <h1>
            promotional stuff, you can bring it to your website or whatever
          </h1>
        </div>
      </div>
    </>
  );
};
export default Sandbox;
