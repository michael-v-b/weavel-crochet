import updateMesh from "../MeshUpdater";

/**
     * Undoes deletion of object.
     * @param {[{string},{ObjectRef}]} action -
     * action[0] - name of action
     * action[1] - object ids
     * action[2] - object mesh types
     * action[3] - object data/attribute lists
     * @param {boolean} isUndo - true if undo and false if redo.
     */
    const updateDelete = (action,projectFile, isUndo,meshSpawnerRef,circum_radius_convert) => {


      const spawner = meshSpawnerRef.current;
      const meshIds = [...action[1]];
      const meshTypes = [...action[2]];
      const meshData = [...action[3]];

      let objectRefs = []; //used for undo/redo

      objectRefs = spawner.spawnMeshes(meshTypes, meshIds, false);

      //update refs just spawned.
      for (let i = 0; i < objectRefs.length; i++) {
        const checkRef = () => {
          if (objectRefs[i].current) {
            const objectData = objectRefs[i].current.userData;
            projectFile.meshes[objectData.idNumber] = meshData[i];
            updateMesh(objectRefs[i], meshData[i], circum_radius_convert);
            setProjectFile({ ...projectFile });
          } else {
            requestAnimationFrame(checkRef);
          }
          return;
        };
        checkRef();
      }
      action = [];
      action[0] = "create";
      action[1] = objectRefs;
      //updateLists(action, isUndo);
      return [action,isUndo];
    };

    export default updateDelete;