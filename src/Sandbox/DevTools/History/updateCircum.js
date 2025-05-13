 /**
     *Undoes an object's circum.
     *@param {[{string}, {object}, {Number},{Number}]} action-
     *action[0] - name of action.
     *action[1] - object whose color changed.
     *action[2] - old circum.
     *action[3] - new circum.
     *action[4] - old radius.
     *action[5] - new radius. */
    const updateCircum = (action, projectFile) => {
      const object = action[1];
      const oldRadius = action[2];
      const newRadius = action[3];
      const oldCircum = action[4];
      const newCircum = action[5];

      object.userData.meshData.setRadius(oldRadius);
      object.userData.meshData.setCircum(oldCircum);

      const id = object.userData.idNumber;

      projectFile.meshes[id].circum = oldCircum;

      action[3] = oldRadius;
      action[2] = newRadius;
      action[4] = newCircum;
      action[5] = oldCircum;
      //updateLists(action, isUndo);
      return action
    };
    export default updateCircum;