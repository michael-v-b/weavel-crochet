import BallMesh from "../Mesh/3DMesh/BallMesh";
import BoxMesh from "../Mesh/3DMesh/BoxMesh";
import CapsuleMesh from "../Mesh/3DMesh/CapsuleMesh";
import SiloMesh from "../Mesh/3DMesh/SiloMesh";
import ConeMesh from "../Mesh/3DMesh/ConeMesh";
import CylinderMesh from "../Mesh/3DMesh/CylinderMesh";
import CircleMesh from "../Mesh/2DMesh/CircleMesh";
import SquareMesh from "../Mesh/2DMesh/SquareMesh";
import StadiumMesh from "../Mesh/2DMesh/StadiumMesh";
import ChainMesh from "../Mesh/2DMesh/ChainMesh";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

import useStore from "../../DevTools/store";

/**
 * @typedef {Object} MeshSpanwer - Class that adds new meshes to scene,
 * and keeps track of all meshes in scene
 * @property {GetMeshesCallback} getMeshes - Callback function from Canvas and App classes for meshList
 * @property {[string]} colorList - a list of colors available in project
 * @returns {Node} - a list of corresponding mesh components according to the meshes list.
 */
const MeshSpawner = forwardRef(( {...props},ref) => {
  MeshSpawner.displayName = "MeshSpawner";
  const [meshes, setMeshes] = useState([]); //used to rerender list once completed
  const [action, setAction] = useState([["create"], []]);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const colorList = useStore((state) => state.colorList);
  const setMeshList = useStore((state) => state.setMeshList);
  const OBJECT_LIMIT = useStore((state) => state.OBJECT_LIMIT);
  const projectFile = useStore((state) => state.projectFile);

  // list of all shapeComponents and the values of their meshTypes
  // add shape here when creating a new shape
  const shapeComponents = {
    ball: BallMesh,
    box: BoxMesh,
    cone: ConeMesh,
    capsule: CapsuleMesh,
    cylinder: CylinderMesh,
    circle: CircleMesh,
    square: SquareMesh,
    stadium: StadiumMesh,
    silo: SiloMesh,
    chain: ChainMesh,
  };

  /**
   *Finds index of mesh in a list
   *@param {MeshRef} meshRef - mesh to be located.
   *@returns {Number} - index of mesh in meshes list, -1 if not found.
   */
  const findMesh = (mesh) => {
    for (let i = 0; i < meshes.length; i++) {
      if (meshes[i][1].current == mesh) {
        return i;
      }
    }
    return -1;
  };

  /**
   * Adds the given 'shape' to the meshList
   * @param {string} shape - a string stating which shape to be added,
   * it's to be later used by shapeComponents
   * @param {boolean} update - says whether the project file/undoList
   * should be updated when creating the mesh.
   */
  const spawnMesh = (shape, tempId = "", update = true) => {
    if (meshes.length >= OBJECT_LIMIT) {
      return;
    }
    const newMeshRef = React.createRef();
    const newCellRef = React.createRef();
    const id = tempId == "" ? crypto.randomUUID() : tempId;
    setMeshes([...meshes, [shape, newMeshRef, id,newCellRef]]);

   
    



    //determines whether action is saved by undo button
    if (update) {
      //update project file
      projectFile.meshes[id] = {};
      const newMesh = projectFile.meshes[id];
      newMesh.type = shape;
      newMesh.name = shape.charAt(0).toUpperCase() + shape.slice(1);
      newMesh.position = [0, 1, 0];
      newMesh.rotation = [0, 0, 0];
      newMesh.colorIndex = 1;

      /*action[1].push(newMeshRef);
      undoList.push([...action]);
      setAction(["create", []]);
      setUndoList([...undoList]);*/
    }
    return shape;
  };

  /**
   * spawns multiple meshes into the scene at once this is mostly for projectReader
   * @param [{string}] shapes - a list of strings stating the types of each mesh
   * @param {boolean} history - determines whether it will be recorded in the history.
   */
  const spawnMeshes = (shapes, Ids, update = true) => {
    const tempMeshes = [];
    const meshRefs = [];

    for (let i = 0; i < shapes.length; i++) {
      const newMeshRef = React.createRef();
      const id = Ids[i];
      meshRefs.push(newMeshRef);
      tempMeshes.push([shapes[i], newMeshRef, id]);
      if (history) {
        action[1].push(newMeshRef);
      }
    }

    //determines whether action is saved by undo button.
    if (update) {
      undoList.push([...action]);
      setAction(["create", []]);
      setUndoList([...undoList]);
    }
    console.log("create meshes");
    setMeshes([...meshes, ...tempMeshes]);
    return meshRefs;
  };

  /**
   *remove the mesh from the scene.
   *@param {MeshRef} meshRef - reference to the mesh that is to be removed.
   */
  const removeMesh = (mesh) => {
    const meshIndex = findMesh(mesh);
    if (meshIndex != -1) {
      meshes.splice(meshIndex, 1);
    } else {
      console.log("mesh not found");
    }
    setMeshes([...meshes]);
  };

  /**
   * Callback function for references to mesh objects.
   */
  const handleMeshes = () => {
    //sets meshObjects to only the references in the [shape,reference] pairs
    const meshObjects = meshes.map((pairs, index) => {
      return pairs[1].current;
    });
    setMeshList(meshObjects);
  };

  useImperativeHandle(ref, () => ({
    spawnMesh,
    spawnMeshes,
    removeMesh,
    meshes,
    setMeshes,
  }));

  /**
   * updates call back function every time meshes list is changed
   */
  useEffect(() => {
    handleMeshes();
  }, [meshes]);

  return (
    <>
      {meshes.map((valuePair) => {
        const meshRef = valuePair[1];
        const shape = valuePair[0];
        const id = valuePair[2];
        const cellRef = valuePair[3];
        const capitalName = shape.charAt(0).toUpperCase() + shape.slice(1);

        //sets MeshComponent to corresponding shape
        const MeshComponent = shapeComponents[shape] || BallMesh;
        return (
          <MeshComponent
            ref={meshRef}
            key={id}
            id={id}
            name={
              shapeComponents[shape] ? capitalName : shape + " not implemented"
            }
            hierarchyRef = {cellRef}
            colorList={colorList}
            position={[0, 1, 0]}
          />
        );
      })}
    </>
  );
});

export default MeshSpawner;
