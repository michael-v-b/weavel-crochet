import TranslateWidget from "./Widgets/TranslateWidget";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { useThree } from "@react-three/fiber";
import { Vector3, Plane } from "three";
import useStore from "../../DevTools/store";

/**
 *@typedef {Translater} - Tool used for translating objects.
 *@property {function} updatePosition - updates the position in the App and
 *ToolManager after interaction.
 *@property {GetPositionCallback} - gets current translater's position
 *@property {Raycaster} raycaster - raycaster object, used mainly for intersectPlane function.
 *@property {[Mesh]} selectedList - list of all selected meshes.
 *@property {[x: {Number}, y: {Number}, z: {Number}]} - length 3 vector that represents object's coordinates,
 *is passed onto Translate Widget
 */
const Translater = forwardRef(({ raycaster, ...props }, ref) => {
  Translater.displayName = "Translater";
  const meshRef = useRef(null);
  let selectedPositionMapRef = useRef(null);
  let tempDisplacement = [0, 0, 0];
  const { camera, scene, gl } = useThree();
  const [axisLock, setAxisLock] = useState("none");
  const [isDragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState(new Vector3());
  const [plane, setPlane] = useState(new Vector3());
  const [offset, setOffset] = useState(new Vector3());

  const [action, setAction] = useState(["translate"]);

  const selectedList = useStore((state) => state.selectedMeshes);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const avgPosition = useStore((state) => state.avgPosition);
  const updatePosition = useStore((state) => state.updateAvgPosition);
  const tool = useStore((state) => state.tool);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  /**
   * makes selected axis when new ray is cast.
   * @param {[Mesh]} rayMeshes - list of widget meshes intersected by ray
   * @param {Event} event - used primarily for intersectPlane object and offset.
   * @returns {TranslateWidget}
   */
  const handleRay = (rayMeshes, event) => {
    if (rayMeshes.length <= 0) {
      return;
    }

    const object = rayMeshes[0];
    let newPlane = null;
    const mesh = meshRef.current;
    const tempAxisLock = object.userData.axisLock;
    let planeNormal = null;

    setInitialPosition(
      new Vector3(mesh.position.x, mesh.position.y, mesh.position.z)
    );

    const cameraPlane = camera.getWorldDirection(new Vector3());

    //creates plane to face camera except for selected axis.
    if (tempAxisLock == "none") {
      planeNormal = cameraPlane;
    } else if (tempAxisLock == "x") {
      planeNormal = new Vector3(0, cameraPlane.y, cameraPlane.z);
    } else if (tempAxisLock == "y") {
      planeNormal = new Vector3(cameraPlane.x, 0, cameraPlane.z);
    } else if (tempAxisLock == "z") {
      planeNormal = new Vector3(cameraPlane.x, cameraPlane.y, 0);
    }

    newPlane = new Plane(planeNormal, -mesh.position.clone().dot(planeNormal));

    //set associate all selected meshes with their position in a pseudo-map.
    const keyPairs = selectedList.map((mesh) => [
      mesh,
      new Vector3(mesh.position.x, mesh.position.y, mesh.position.z),
    ]);

    //create map based on keyPairs.
    selectedPositionMapRef.current = new Map(keyPairs);

    const intersection = raycaster.current.castRayPlane(newPlane, event);

    //use mouse position as offset so mesh center doesn't teleport to mouse position.
    const newOffset = mesh.position.clone().sub(intersection);

    //update state.
    setOffset(newOffset);
    setPlane(newPlane);
    setAxisLock(tempAxisLock);
    setDragging(true);
  };

  /**
    *updates the position of multiple selected objects based on widget displacement.
    *@param {THREE.Vector3()} displacement - amount the widget's new position differs 
    from its original position based on x, y and z. 
    Used to add update all meshes based on that displacement
    */
  const updateSelectedObjects = (displacement) => {
    tempDisplacement = displacement.toArray();
    for (let i = 0; i < selectedList.length; i++) {
      selectedList[i].position.copy(
        selectedPositionMapRef.current
          .get(selectedList[i])
          .clone()
          .add(displacement)
      );
    }
  };

  /**
   *changes the object's position based on mouse position while object is being dragged.
   *@param {Event} event - used to find ray intersection location from pointer in castRayPlane.
   */
  const handleDrag = (event) => {
    if (!isDragging) {
      return;
    }
    const object = meshRef.current;
    const intersection = raycaster.current.castRayPlane(plane, event);

    const mousePosition = intersection.clone().add(offset);
    const newPosition = new Vector3();

    //set locked axis of newPosition to mousePosition
    if (axisLock == "none") {
      newPosition.copy(mousePosition);
    } else if (axisLock == "x") {
      newPosition.copy(
        new Vector3(mousePosition.x, initialPosition.y, initialPosition.z)
      );
    } else if (axisLock == "y") {
      newPosition.copy(
        new Vector3(initialPosition.x, mousePosition.y, initialPosition.z)
      );
    } else if (axisLock == "z") {
      newPosition.copy(
        new Vector3(initialPosition.x, initialPosition.y, mousePosition.z)
      );
    }

    object.position.copy(newPosition);
    updatePosition();
    const displacement = newPosition.clone().sub(initialPosition);
    updateSelectedObjects(displacement);
  };
  /**
   * sets isDragging to false.
   */
  const handleDrop = () => {
    //undo button
    action.push([...selectedList]);
    action.push(tempDisplacement);
    undoList.push(action);
    setUndoList([...undoList]);
    setAction(["translate"]);

    //update project file
    for (let i = 0; i < selectedList.length; i++) {
      const id = selectedList[i].userData.idNumber;
      projectFile.meshes[id].position = selectedList[i].position.toArray();
    }
    setProjectFile({ ...projectFile });

    setDragging(false);
  };

  /**
   * updates event listeners depending on whether the object is being dragged.
   */
  useEffect(() => {
    if (isDragging) {
      gl.domElement.addEventListener("pointermove", handleDrag);
      gl.domElement.addEventListener("pointerup", handleDrop);
    }

    return () => {
      gl.domElement.removeEventListener("pointermove", handleDrag);
      gl.domElement.removeEventListener("pointerup", handleDrop);
    };
  }, [isDragging]);

  useImperativeHandle(ref, () => ({ handleRay }));

  return (
    <>
      {selectedList.length > 0 && tool == "translate" && (
        <TranslateWidget ref={meshRef} position={avgPosition} {...props} />
      )}
    </>
  );
});
export default Translater;
