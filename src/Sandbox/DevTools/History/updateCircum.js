 /**
     *Undoes an object's circum.
     *@param {[{string}, {object}, {Number},{Number}]} action-
     *action[0] - name of action.
     *action[1] - object whose color changed.
     *action[2] - old radius.
     *action[3] - new radius. 
     *action[4] - old circum.
     *action[5] - new circum.*/
    
    const updateCircum = (action, projectFile) => {
      const objects = action[1];
      const oldRadii= action[2];
      const newRadii = action[3];
      const oldCircums = action[4];
      const newCircums = action[5];

      for(let i =0 ; i < objects.length;i++) {
        objects[i].userData.meshData.setRadius(oldRadii[i]);
        objects[i].userData.meshData.setCircum(oldCircums[i]);

        const id = objects[i].userData.idNumber;
        projectFile.meshes[id].circum = oldCircums[i];
      }



      action[3] = oldRadii;
      action[2] = newRadii;
      action[4] = newCircums;
      action[5] = oldCircums;
      //updateLists(action, isUndo);
      return action
    };
    export default updateCircum;