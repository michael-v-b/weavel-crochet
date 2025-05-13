/**
     * Undoes an object's name
     * @param {[{string},{Object},{string},{string}]} action-
     * action[0] - name of action.
     * action[1] - object whose name was changed.
     * action[2] - old name.
     * action[3] - new name.
     */
    const updateName = (action,projectFile) => {
      const object = action[1];
      const oldName = action[2];
      const newName = action[3];

      //object.userData.cellRef.setName(oldName);
      object.name = oldName;

      const id = object.userData.idNumber;
      projectFile.meshes[id].name = oldName;

      action[2] = newName;
      action[3] = oldName;

      //updateLists(action, isUndo);
      return action;
    };

    export default updateName;