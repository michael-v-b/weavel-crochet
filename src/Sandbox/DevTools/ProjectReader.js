import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import { Vector3, Euler } from "three";
import useStore from "./store";
import useGlobalStore from "../../globalStore";
import supabase from "../../supabase";
import { useNavigate } from "react-router";
import updateMesh from "./MeshUpdater";
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

const ProjectReader = forwardRef(
  ({ meshSpawnerRef, cameraTrackerRef }, ref) => {
    ProjectReader.displayName = "ProjectReader";
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

    const circum_radius_convert = useStore(
      (state) => state.circum_radius_convert
    );

    const setMeshLoading = useStore((state) => state.setMeshLoading);

    const authData = useGlobalStore((state) => state.authData);
    const auth = useGlobalStore((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
      if (auth) {
        initializeProject();
      }
    }, [auth]);
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
      if (cameraTrackerRef?.current) {
        cameraTrackerRef.current.setCameraPosition(project.cameraPosition);
        cameraTrackerRef.current.setCameraRotation(project.cameraRotation);
      }

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
        readerUpdateMesh(meshRefs[i], meshes[meshKeys[i]]);
      }
      if (numFinished == 0) {
        setMeshLoading(false);
        readProject.current = true;
      }
      setMeshList([...meshList]);
    };

    const readerUpdateMesh = (meshRef, saveData) => {
      //makes program wait until not the cased this
      if (!meshRef.current) {
        if (!readProject.current) {
          requestAnimationFrame(() => readerUpdateMesh(meshRef, saveData));
        }
        return;
      }

      updateMesh(meshRef, saveData, circum_radius_convert);

      //set read project to true if last mesh
      numFinished -= 1;
      if (numFinished == 0) {
        setMeshLoading(false);
        readProject.current = true;
      }
    };
    useImperativeHandle(ref, () => ({ initializeProject }));
  }
);

export default ProjectReader;
