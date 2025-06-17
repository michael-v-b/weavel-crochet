
/**
 * 
 *  
 * @param {Object} projectFile - a list of all the entries in the project file 
 * @param {*} action
     *action[0] - name of action.
     *action[1] - object whose size changed.
     *action[2] - old size.
     *action[3] - new size.
     */
const updateSize = (action, projectFile) => {
    const objects = action[1];
      const oldSizes = action[2];
      const newSizes = action[3];

      for(let i =0; i < objects.length;i++) {
        objects[i].userData.meshData.setSize(oldSizes[i]);
        const id = objects[i].userData.idNumber;
        projectFile.meshes[id].size = oldSizes[i];
      }
      action[3] = oldSizes;
      action[2] = newSizes;
      //updateLists(action, isUndo);
      return action;
}

export default updateSize;