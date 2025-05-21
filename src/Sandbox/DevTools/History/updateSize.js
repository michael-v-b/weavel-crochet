
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
    const object = action[1];
      const oldSize = action[2];
      const newSize = action[3];

      object.userData.meshData.setSize(oldSize);

      const id = object.userData.idNumber;
      projectFile.meshes[id].size = oldSize;

      action[3] = oldSize;
      action[2] = newSize;
      //updateLists(action, isUndo);
      return action;
}

export default updateSize;