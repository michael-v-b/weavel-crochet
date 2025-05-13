    /**
     * Undoes an object's dimensions.
     *@param {[{string},{object},{[{Number}]},{[{Number}]}]} action -
     * action[0] - name of action.
     * action[1] - object whose dimensions are being undone.
     * action[2] - dimensions.
     * action[3] - list of old dimensions.
     * action[4] - list of new dimensions.
     */
    const updateDim = (action,projectFile) => {
      const object = action[1];
      const dimensions = action[2];
      const oldDims = action[3];
      const newDims = action[4];
      const objectData = object.userData.meshData;

      objectData.setX(oldDims[0]);
      objectData.setY(oldDims[1]);

      if (dimensions == 3) {
        objectData.setZ(oldDims[2]);
      }

      const id = object.userData.idNumber;
      projectFile.meshes[id].dim = oldDims;

      action[3] = newDims;
      action[4] = oldDims;

      //updateLists(action, isUndo);
      return action;
    };

    export default updateDim;