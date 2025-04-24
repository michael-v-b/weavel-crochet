import { useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle } from "react";
import { Vector3, Euler } from "three";

/**
 * @typedef {CameraTracker} - Tracks the camera position and rotation on rerenders.
 */
const CameraTracker = forwardRef((_, ref) => {
  CameraTracker.displayName = "CameraTracker";
  const { camera } = useThree();

    
  /**
   * Sets the camera's position on first opening of project.
   * @param {[Number]} posArray - position camera should be set to 
   */
  const setCameraPosition = (posArray) => {
    camera.position.copy(new Vector3().fromArray(posArray));
  };

  /**
   * Sets camera's rotation when opening project.
   * @param {[Number]} rotArray - camera's euler rotation.
   */
  const setCameraRotation = (rotArray) => {
    camera.rotation.copy(new Euler().fromArray(rotArray));
  };

  /**
   * @returns {[Number]} Camera's current position.
   */
  const getCameraPosition = () => {
    return camera.position.toArray();
  };

  /**
   * 
   * @returns {[Number]} - camera's current euler rotation.
   */
  const getCameraRotation = () => {
    const tempRotation = camera.rotation.toArray();
    return [tempRotation[0], tempRotation[1], tempRotation[2]];
  };

  useImperativeHandle(ref, () => ({
    getCameraPosition,
    getCameraRotation,
    setCameraRotation,
    setCameraPosition,
  }));
});
export default CameraTracker;
