 /**
     * Rotates object in opposite direction
     * @param {[{string} {[Object]}, {Number}, {string} {Quaternion}]} action -
     * action[0]- name of action,
     * action[1] - list of objects being rotated
     * action[2] - angle of rotation
     * action [3] - axis of rotation as string (used for groups can be edited if need be)
     * action[4] - axis of rotation quaternion
     * action[5] - rotation point
     * @param {boolean} isUndo - true if undo, fals if redo.
     */
const updateRotate = (action,projectFile,isUndo,rotaterRef) => {
const objectList = action[1];
      const angle = action[2];
      const axisString = action[3];
      const angleAxis = action[4];
      const rotationPoint = action[5];
      rotaterRef.current.rotateGroup(
        objectList,
        -angle,
        axisString,
        angleAxis,
        rotationPoint
      );

      //update projectFile
      for (let i = 0; i < objectList.length; i++) {
        const object = objectList[i];
        const id = object.userData.idNumber;
        projectFile.meshes[id].position = object.position.toArray();
        projectFile.meshes[id].rotation = object.rotation.toArray();
      }

      action[2] = action[2] * -1;
      //updateLists(action, isUndo);
      return [action,isUndo];
}

export default updateRotate;