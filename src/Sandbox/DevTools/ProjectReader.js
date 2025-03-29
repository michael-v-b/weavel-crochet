import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";
import { Vector3, Euler } from "three";
import useStore from "./store";
import useGlobalStore from "../../globalStore";
import supabase from "../../supabase";
import { useLocation } from "react-router";
//import project from "../../color_test.json";

/**
 * FORMAT OF JSON
 * PROJECT NAME
 * COLOR LIST
 * MESHES
 *
 * FORMAT OF MESHES
 *
 * ID
 */

const ProjectReader = forwardRef(({ meshSpawnerRef, ...props }, ref) => {
  let readProject = useRef(false);
  let numFinished = 0;
  const setColorList = useStore((state) => state.setColorList);
  const meshList = useStore((state) => state.meshList);
  const setMeshList = useStore((state) => state.setMeshList);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const setProjectId = useStore((state) => state.setProjectId);

  const setMode = useStore((state) => state.setMode);
  const setTool = useStore((state) => state.setTool);
  const setUndoList = useStore((state) => state.setUndoList);
  const setRedoList = useStore((state) => state.setRedoList);
  const setMeshLoading = useStore((state) => state.setMeshLoading);
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const authData = useGlobalStore((state) => state.authData);

  const [meshesLeft, setMeshesLeft] = useState(10);

  useEffect(() => {
    if (meshesLeft == 0) {
      setMeshLoading(false);
    }
  }, [meshesLeft]);

  useEffect(() => {
    initializeProject();
  }, []);
  /**
   * Reset project to avoid opening previously opened projects
   */

  const resetProject = () => {
    setMode("none");
    setTool("none");
    setMeshList([]);
    setUndoList([]);
    setRedoList([]);
  };

  /**
   * Set the project variable and start loading it into the scene.
   */
  const initializeProject = async () => {
    if (!authData) {
      return;
    }

    const currentURL = location.pathname;
    const idIndex = currentURL.indexOf("sandbox/");
    const tempId = currentURL.substring(idIndex + "sandbox/".length);

    resetProject();

    const path = authData.user.id + "/" + tempId + "/data.json";

    const { data, error } = await supabase.storage
      .from("Project Files")
      .download(path);
    if (!data) {
      return;
    }

    if (error) {
      navigate("/");
    }
    const dataText = await data.text();
    const project = JSON.parse(dataText);
    if (!project) {
      return;
    }
    setProjectId(tempId);
    setProjectFile(project);
    setColorList(project.colorList);

    //runs infinite loop until meshSpawner.current is
    const checkCurrent = () => {
      if (meshSpawnerRef.current) {
        createMeshes(project.meshes);
      } else {
        requestAnimationFrame(checkCurrent);
      }
      return;
    };

    requestAnimationFrame(checkCurrent);
    return;
  };

  /**
   * create a mesh spawner object
   */
  const createMeshes = (meshes) => {
    if (readProject.current) {
      return;
    }
    //to synchronize index and keys
    const meshKeys = Object.keys(meshes);
    const meshTypes = [];
    for (let i = 0; i < meshKeys.length; i++) {
      meshTypes.push(meshes[meshKeys[i]].type);
    }

    const meshRefs = meshSpawnerRef.current.spawnMeshes(
      meshTypes,
      meshKeys,
      false
    );

    numFinished = meshRefs.length;

    for (let i = 0; i < meshRefs.length; i++) {
      updateMesh(meshRefs[i], meshes[meshKeys[i]]);
    }
    if (numFinished == 0) {
      setMeshLoading(false);
      readProject.current = true;
    }
    setMeshList([...meshList]);
  };

  const updateMesh = (meshRef, saveData) => {
    //makes program wait until not the cased this
    if (!meshRef.current) {
      if (!readProject.current) {
        requestAnimationFrame(() => updateMesh(meshRef, saveData));
      }
      return;
    }

    const userData = meshRef.current.userData;
    //UNIVERSAL ATTRIBUTES
    // name
    meshRef.current.name = saveData.name;
    //position
    meshRef.current.position.copy(new Vector3().fromArray(saveData.position));
    //rotation
    meshRef.current.rotation.copy(new Euler().fromArray(saveData.rotation));
    //color
    userData.setColorIndex(saveData.colorIndex);

    //CUSTOM ATTRIBUTES===============================================================

    const attributes = saveData.attributeList;
    const meshData = userData.meshData;

    //circumference
    if (attributes.includes("circum")) {
      meshData.setCircum(saveData.circum);
      const output = saveData.circum / (2 * Math.PI);
      meshData.setRadius(output / CONV_RATE);
    }

    if (attributes.includes("dim")) {
      const dim = saveData.dim;
      meshData.setX(dim[0]);
      meshData.setY(dim[1]);
      if (dim.length > 2) {
        meshData.setZ(dim[2]);
      }
    }

    if (attributes.includes("height")) {
      meshData.setHeight(saveData.height);
    }

    if (attributes.includes("open")) {
      meshData.setOpen(saveData.open);
    }

    //set read project to true if last mesh
    numFinished -= 1;
    if (numFinished == 0) {
      setMeshLoading(false);
      readProject.current = true;
    }
  };
  useImperativeHandle(ref, () => ({ initializeProject }));
});

export default ProjectReader;
