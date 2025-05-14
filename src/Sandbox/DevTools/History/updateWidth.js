/**
     *Undoes an object's height.
     *@param {[{string}, {object}, {Number},{Number}]} action-
     *action[0] - name of action.
     *action[1] - object whose width changed.
     *action[2] - old width.
     *action[3] - new width.
     */
    const updateWidth = (action, projectFile) => {

      const object = action[1];
      const oldWidth = action[2];
      const newWidth = action[3];
      
      object.userData.meshData.setWidth(oldWidth);

      const id = object.userData.idNumber;
      projectFile.meshes[id].width = oldWidth;

      action[3] = oldWidth;
      action[2] = newWidth;
      //updateLists(action, isUndo);
      return action;
    };

    export default updateWidth;