/**
     * Undoes an object's name
     * @param {[{string},{Object},{string},{string}]} action-
     * action[0] - name of action.
     * action[1] - objects whose names were changed.
     * action[2] - old names.
     * action[3] - new names.
     */
    const updateName = (action,projectFile) => {
      const objects = action[1];
      const oldNames = action[2];
      const newNames = action[3];

      //object.userData.cellRef.setName(oldName);

      for(let i = 0; i < objects.length;i++) {
        objects[i].name = oldNames[i];
        const id = objects[i].userData.idNumber;
        projectFile.meshes[id].name = oldNames[i];
      }
      action[2] = newNames;
      action[3] = oldNames;

      //updateLists(action, isUndo);
      return action;
    };

    export default updateName;