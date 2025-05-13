/**
     *Undoes an object's height.
     *@param {[{string}, {object}, {Number},{Number}]} action-
     *action[0] - name of action.
     *action[1] - object whose color changed.
     *action[2] - old height.
     *action[3] - new height.
     */
    const updateHeight = (action, projectFile) => {

      const object = action[1];
      const oldHeight = action[2];
      const newHeight = action[3];

      object.userData.meshData.setHeight(oldHeight);

      const id = object.userData.idNumber;
      projectFile.meshes[id].height = oldHeight;

      action[3] = oldHeight;
      action[2] = newHeight;
      //updateLists(action, isUndo);
      return action;
    };

    export default updateHeight;