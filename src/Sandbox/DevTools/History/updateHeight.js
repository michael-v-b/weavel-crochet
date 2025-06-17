/**
     *Undoes an object's height.
     *@param {[{string}, {object}, {Number},{Number}]} action-
     *action[0] - name of action.
     *action[1] - object whose height changed.
     *action[2] - old height.
     *action[3] - new height.
     */
    const updateHeight = (action, projectFile) => {

      const objects = action[1];
      const oldHeights = action[2];
      const newHeights = action[3];
      
      for(let i= 0; i < objects.length;i++) {
        objects[i].userData.meshData.setHeight(oldHeights[i]);

        const id = objects[i].userData.idNumber;
        projectFile.meshes[id].height = oldHeights[i];
      };

      action[3] = oldHeights;
      action[2] = newHeights;
      //updateLists(action, isUndo);
      return action;
    };

    export default updateHeight;