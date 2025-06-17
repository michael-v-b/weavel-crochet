
/**
 * undoes when an object is converted to half (inverts is half value)
 * @param {List} action -
 * action[0] - action name
 * action[1] - object
 * action[2] - old values
 * action[3] - new values
 */
const updateHalf=  (action,projectFile) => {
    const objects = action[1];
    const oldValues = action[2];
    const newValues = action[3];
    
    for(let i= 0 ; i< objects.length;i++) {
        const object=  objects[i];

        const objectData = object.userData.meshData;
        
        objectData.setHalf(oldValues[i]);
        const id = object.userData.idNumber;

        projectFile.meshes[id].isHalf = oldValues[i];
    };

    action[2] = newValues;
    action[3] = oldValues;

    return action
}

export default updateHalf;