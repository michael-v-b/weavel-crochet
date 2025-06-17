/**
     *Undoes an object's height.
     *@param {[{string}, {object}, {Number},{Number}]} action-
     *action[0] - name of action.
     *action[1] - object whose width changed.
     *action[2] - old width.
     *action[3] - new width.
     */
    const updateWidth = (action, projectFile) => {

      const objects = action[1];
      const oldWidths = action[2];
      const newWidths = action[3];
      
      for(let i =0;i < objects.length;i++) {
        const object = objects[i];
        const oldWidth = oldWidths[i];
        object.userData.meshData.setWidth(oldWidth);

        const id = object.userData.idNumber;
        projectFile.meshes[id].width = oldWidth;
      }

      action[3] = oldWidths;
      action[2] = newWidths;
      //updateLists(action, isUndo);
      return action;
    };

    export default updateWidth;