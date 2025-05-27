import RotateWidget from "./Widgets/RotateWidget";
import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { Vector3, Quaternion,Plane} from "three";
import { useThree} from "@react-three/fiber";
import useStore from "../../DevTools/store";

/**
 *@typedef {Rotater} - Tool that rotates all selected objects when clicked on by mouse.
 *@returns {RotateWidget}
 */
const Rotater = forwardRef(({raycaster}, ref) => {
  Rotater.displayName = "Rotater";
  const selectedList = useStore((state) => state.selectedMeshes);
  const avgPosition = useStore((state) => state.avgPosition);
  const undoList = useStore((state) => state.undoList);
  const setUndoList = useStore((state) => state.setUndoList);
  const tool = useStore((state) => state.tool);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const setCurrentRotation = useStore((state)=>state.setCurrentRotation);
  const isDragging = useStore((state)=>state.isDragging);
  const setDragging = useStore((state)=>state.setDragging)

  let totalAngle = 0;
  const { camera, gl } = useThree();
  const [action, setAction] = useState(["rotate"]);

  const [rotationAxis, setAxis] = useState("x");
  const [axisVector, setAxisVector] = useState(new Vector3(0, 0, 0));
  
  const prevAngle = useRef(0);
  const widgetRef = useRef(null);

  const [widgetPosition, setWidgetPosition] = useState(
    new Vector3(avgPosition[0], avgPosition[1], avgPosition[2])
  );

  

  /**
   *sets the axis based on which part of widget is selected.
   *Also initializes axis vector and sets draggin to true.
   *@param {[Meshes]} meshList - a list of all widget meshes intersecting with ray.
   */
  const handleRay = (meshList) => {

    const ringValue = Math.round(Math.abs(Math.cos(camera.rotation.z)));
    const tempAxis = meshList[0].userData.axis;
    if (ringValue == 1) {
      setVertAxis("x");
    } else {
      setVertAxis("z");
    }

    if (tempAxis == "x") {
      setAxisVector(new Vector3(1, 0, 0));
    } else if (tempAxis == "y") {
      setAxisVector(new Vector3(0, 1, 0));
    } else if (tempAxis == "z") {
      setAxisVector(new Vector3(0, 0, 1));
    }

    action.push(selectedList);
    setDragging(true);
    setAxis(tempAxis);
    setWidgetPosition(new Vector3().fromArray(avgPosition));
    //updates the sensitivity based on the distance from the camera.
    const distance = widgetPosition.distanceTo(camera.position);
    setSensitivity(camera.rotation.z >= 0 ? -distance / 500 : distance / 500);
  };

  /**
   * Method used for rotating a single object
   *@param {Mesh} object - object being rotated.
   *@param {Number} angle - amount the object should be rotated around the axisVector.
   */
  const rotateOne = (object, angle, tempAxisVector) => {
    const quaternion = new Quaternion().setFromAxisAngle(tempAxisVector, angle);



    //change object's angle
    object.quaternion.premultiply(quaternion);
    setCurrentRotation(object.rotation.toArray())
  };

  /**
   *Rotate a group of objects around the widget's location.
   *@param {Number} angle - amount the group should rotate around the specified axis.
   * @param {THREE.Vector3} rotationPoint - the point that the objects rotate around.
   */
  const rotateGroup = (
    objectList,
    angle,
    tempRotationAxis,
    tempAxisVector,
    rotationPoint
  ) => {
    const axisIndex = tempRotationAxis.charCodeAt(0) - "x".charCodeAt(0);
    const valueOne = (axisIndex + 1) % 3;
    const valueTwo = (axisIndex + 2) % 3;

    /**
     * for each object set its values not associated with the selected axis
     * to the sine and cosine of the angle.
     *Also rotate the angle around the central point
     */

    for (let i = 0; i < objectList.length; i++) {
      const current = objectList[i];

      const relativePos = current.position.clone().sub(rotationPoint);
      //set x and y to value one and 2 for easy viewing.
      const x = relativePos.getComponent(valueOne);
      const y = relativePos.getComponent(valueTwo);

      //get distance to set as radius of circle.
      const distance = Math.sqrt(x * x + y * y);

      //find initial angle from x and y.
      const initAngle = Math.atan2(y, x);

      //calculate new x and way based off of new angle
      const newX = Math.cos(initAngle + angle) * distance;
      const newY = Math.sin(initAngle + angle) * distance;

      //create new position based off new x and y values.
      const newPosition = new Vector3(0, 0, 0);
      newPosition.setComponent(valueOne, newX);
      newPosition.setComponent(valueTwo, newY);
      newPosition.setComponent(axisIndex, relativePos.getComponent(axisIndex));

      //update object's position
      current.position.copy(rotationPoint.clone().add(newPosition));

      //rotate object based on angle
      rotateOne(objectList[i], angle, tempAxisVector);
    }
  };

  /**
   *sets angle object should be rotated depending on difference in pointer
   * when dragging.
   *@param (Event) event - used for mouse location.
   */
  const handleDrag = (event) => {

    const tempPlanePosition = new Vector3().fromArray(avgPosition);
    const rotatePlane = new Plane(axisVector,-tempPlanePosition.dot(axisVector));
    const mousePosition = raycaster.current.castRayPlane(rotatePlane,event);
    const relativePosition = mousePosition.sub(tempPlanePosition).toArray();

  

    //get automatic x and y
    const axisIndex = rotationAxis.charCodeAt(0) - "x".charCodeAt(0);
    const valueOne = (axisIndex + 1) % 3;
    const valueTwo = (axisIndex + 2) % 3;

    //set angle based on automatic x and y
    let newAngle = Math.atan(relativePosition[valueTwo]/relativePosition[valueOne]);
    newAngle = relativePosition[valueOne] < 0 ? newAngle+Math.PI : newAngle;


    const sideY = 2*Math.sin(newAngle);
    const sideX = 2*Math.cos(newAngle);

    //used for bal placement
    const tempPos = [0,0,0];
    tempPos[valueOne] = sideX;
    tempPos[valueTwo] = sideY;

    if(rotationAxis == 'x') {
      widgetRef.current.setXPos(tempPos);
    } else if (rotationAxis == 'y') {
      widgetRef.current.setYPos(tempPos);
    } else if (rotationAxis == 'z') {
      widgetRef.current.setZPos(tempPos);

    }

    const angleDiff = newAngle - prevAngle.current;

    prevAngle.current = newAngle;

    totalAngle +=angleDiff;
    


    rotateGroup(
      selectedList,
      angleDiff,
      rotationAxis,
      axisVector,
      widgetPosition
    );
  };

  /**
   *setDraggin false when mouse is dropped
   */
  const handleDrop = () => {
    //update undo
    action.push(totalAngle);
    action.push(rotationAxis);
    action.push(axisVector.clone());
    action.push(widgetPosition.clone());

    undoList.push(action);
    setUndoList([...undoList]);
    setAction(["rotate"]);

    //update file
    for (let i = 0; i < selectedList.length; i++) {
      const object = selectedList[i];
      const id = object.userData.idNumber;
      projectFile.meshes[id].position = object.position.toArray();
      projectFile.meshes[id].rotation = object.rotation.toArray();
    }
    setProjectFile({ ...projectFile });
    totalAngle = 0;
    setDragging(false);
  };

  /**
   *update pointer events based on whether mouse is dragging, update every time
   *isDragging is changed.
   */
  useEffect(() => {
    if (isDragging && tool == "rotate") {
      gl.domElement.addEventListener("pointermove", handleDrag);
      gl.domElement.addEventListener("pointerup", handleDrop);
    }
    return () => {
      gl.domElement.removeEventListener("pointermove", handleDrag);
      gl.domElement.removeEventListener("pointerup", handleDrop);
    };
  }, [isDragging,tool]);

  useImperativeHandle(ref, () => ({
    handleRay,
    rotateGroup,
  }));
  return (
    <>
      {selectedList.length > 0 && tool == "rotate" && (
        <RotateWidget ref = {widgetRef} position={avgPosition} />
      )}
    </>
  );
});

export default Rotater;
