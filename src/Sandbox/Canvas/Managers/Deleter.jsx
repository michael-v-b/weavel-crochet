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
    const deleteMeshes = (objectList) => {
      for (let i = 0; i < objectList.length; i++) {
        //this is crazy man idk
        meshSpawnerRef.current.removeMesh(objectList[i]);
        scene.remove(objectList[i]);
        const meshIndex = findMesh(objectList[i]);

        // if mesh found remove from meshlist
        if (meshIndex != -1) {
          meshList.splice(meshIndex, 1);

          //update project file
          delete projectFile.meshes[objectList[i].userData.idNumber];
          setProjectFile({ ...projectFile });
        } else {
          console.log("couldn't find it");
        }
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
