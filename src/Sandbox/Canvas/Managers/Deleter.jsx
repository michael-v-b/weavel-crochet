import { useEffect, forwardRef, useImperativeHandle, useState } from "react";
import { useThree } from "@react-three/fiber";
import useStore from "../../DevTools/store";

/**
 * @typedef {Deleter} - A class that is in charge of deleting items
 * from the canvas, and hierarchy
 *@property {SelectionManagerReference} selectionManagerRef - SelectionManager.
 *@property {MeshSpawnerRef} - allows access to all MeshSpawner public methods.
 */

const Deleter = forwardRef(
  ({ selectionManagerRef, meshSpawnerRef }, ref) => {
    Deleter.displayName = "Deleter";
    const { scene } = useThree();
    const [action, setAction] = useState(["delete"]);
    const isFocused = useStore((state) => state.isFocused);
    const keysPressed = useStore((state) => state.keysPressed);
    const selectedMeshes = useStore((state) => state.selectedMeshes);
    const meshList = useStore((state) => state.meshList);
    const setMeshList = useStore((state) => state.setMeshList);
    const undoList = useStore((state) => state.undoList);
    const setUndoList = useStore((state) => state.setUndoList);
    const projectFile = useStore((state) => state.projectFile);
    const setProjectFile = useStore((state) => state.setProjectFile);

    /**
     * finds index of provided mesh in meshList.
     *@param {Object} Mesh the mesh to be located.
     *@returns {Number} index of mesh in list, -1 if mesh isn't found.
     */
    const findMesh = (mesh) => {
      for (let i = 0; i < meshList.length; i++) {
        if (meshList[i] == mesh) {
          return i;
        }
      }
      return -1;
    };

    /**
     * Deletes all meshes in objectList by removing them from the scene, meshList, selectionManager and meshSpawner
     * THIS METHOD DOES NOT REMOVE THE GEOMETRY AND MATERIAL, THEY STILL EXIST IN GPU
     * THIS IS SO UNDO CAN BRING BACK OBJECT.
     * @param [{Object}] objectList - all objects to be deleted.
     */
    const deleteMeshes = (objectList,isUndo = false) => {

      const meshIds = [];
      const meshTypes =[];
      const meshInfo = [];
      for (let i = 0; i < objectList.length; i++) {
        //this is crazy man idk
        meshSpawnerRef.current.removeMesh(objectList[i]);
        scene.remove(objectList[i]);
        const meshIndex = findMesh(objectList[i]);

        const saveData = {};

     
        
          const objectData = objectList[i].userData;

          const meshData = objectData.meshData;
             const attributeMap = {
            circum: meshData.circum,
            height: meshData.height,
            half: meshData.half,
            dim: meshData.zDim ? [meshData.xDim,meshData.yDim,meshData.zDim] : [meshData.xDim,meshData.yDim],
            width: meshData.width,
          };

        // if mesh found remove from meshlist
        if (meshIndex != -1) {

          //update info for undo button

          saveData.name = objectList[i].name;
          saveData.position = objectList[i].position.toArray();
          saveData.rotation = objectList[i].rotation.toArray();
          saveData.colorIndex = objectData.colorIndex;
          saveData.type = objectData.meshType;
          saveData.attributeList = meshData.attributeList;

          for(const attribute of meshData.attributeList) {
            saveData[attribute] = attributeMap[attribute];
          }

          meshIds.push(objectData.idNumber);
          meshTypes.push(objectData.meshType);
          meshInfo.push(saveData);
          
          //remove object from meshList

          meshList.splice(meshIndex, 1);

          //update project file
          delete projectFile.meshes[objectData.idNumber];
          setProjectFile({ ...projectFile });
        } else {
          console.log("couldn't find it");
        }
      }

      // update undo list
      if(meshIds.length > 0 && !isUndo) {
        const tempAction = ["delete"];
        tempAction.push(meshIds);
        tempAction.push(meshTypes);
        tempAction.push(meshInfo);
        undoList.push(tempAction);
        setUndoList([...undoList]);
      }


      setMeshList([...meshList]);
      selectionManagerRef.current.clearSelectedList(); //clears selected mesh list
    };

    /**
     * Triggers deleteSelectedMeshes when key is pressed, unles focused on input field.
     * Dependency with keysPressed.
     */
    useEffect(() => {
      if (
        (keysPressed.includes("Backspace") ||
          keysPressed.includes("NumpadDecimal") ||
          keysPressed.includes("Delete")) &&
        !isFocused
      ) {
        deleteMeshes(selectedMeshes);
      }
    }, [keysPressed]);

    useImperativeHandle(ref, () => ({ deleteMeshes }));
  }
);

export default Deleter;
