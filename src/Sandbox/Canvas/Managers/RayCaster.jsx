import { useThree } from "@react-three/fiber";
import { useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { Vector2,Vector3} from "three";

/**
 *@typedef {RayCaster} a class used to fire rays and provide information from those rays
 */
const RayCaster = forwardRef((_, ref) => {
  RayCaster.displayName = "RayCaster";
  const { scene, camera, gl } = useThree();
  const pointer = useRef(new Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  let canvasBounds = 0;
  let meshList = []; // list of meshes intersected by ray
  let widgetList = []; // list of widget intersected by ray

  /**
   * Updates the x and y of the pointer object.
   * @param {Pointer} pointer - refers to the mouse pointer in the scene.
   * @param {Event} event - used to get information about the provided event,
   * expects the "pointermove" event.
   */
  const setPointer = (pointer, event) => {
    pointer.current.x =
      ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    pointer.current.y =
      -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
  };

  /**
   * Getter method for pointer object after updating its x and y.
   * @param {Event} event - used for setPointer method.
   * @returns {Pointer} Updated pointer object.
   */
  const getPointer = (event) => {
    setPointer(pointer, event);
    return pointer;
  };

  /**
   * Casts a ray at the position of the mouse
   * and finds the list of relevant objects that the ray intersects
   *@param {Event} event - used for setPointer method to update pointer's x and y
   *@returns {[widgetList: [Reference],meshLst: [Reference]]} A 2d list that has
   * a list of the  references to the intersected widgets in the first index
   * and a list of the references to the intersected meshes in the second.
   */
  const castRayObject = (event) => {
    canvasBounds = gl.domElement.getBoundingClientRect();
    setPointer(pointer, event);
    meshList = [];
    widgetList = [];
    raycaster.current.setFromCamera(pointer.current, camera);
    const intersections = raycaster.current.intersectObjects(scene.children);

    // objects in layer 2 are meshes.
    // objects in layer 3 are widgets.
    if (intersections.length > 0) {
      console.dir(intersections);
      //for each mesh intersected add it to meshList or widgetList depending on layer
      intersections.map((intersection, index) => {
        const object = intersection.object;
        
        if (object.layer == 2 && !meshList.includes(object)) {
          console.log("object: " + object.name + " found");
          meshList.push(object);
        } else if (object.layer == 3 && !widgetList.includes(object)) {
          widgetList.push(object);
        }
      });
    }
    return [widgetList, meshList];
  };

  /**
   *casts a ray from the mouse's location to a mathematical plane
   *@param {THREE.Plane} plane - the plane that the ray is intersecting
   *@param {Event} event - used for setPointer method and is used to get pointer's x and y.
   @returns {THREE.Vector3} - the coordinates of where the ray intersects with the plane.
   */
  const castRayPlane = (plane, event) => {
    setPointer(pointer, event);
    const intersection = new Vector3();
    raycaster.current.setFromCamera(pointer.current, camera);
    raycaster.current.ray.intersectPlane(plane, intersection);
    return intersection;
  };

  useImperativeHandle(ref, () => ({ castRayObject, castRayPlane, getPointer }));
});
export default RayCaster;
