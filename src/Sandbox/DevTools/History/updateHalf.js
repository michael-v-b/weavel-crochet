
/**
 * undoes when an object is converted to half (inverts is half value)
 * @param {List} action -
 * action[0] - action name
 * action[1] - object
 */
const updateHalf=  (action,projectFile) => {
    const object = action[1];
    const objectData = object.userData.meshData;
    const id = object.userData.idNumber;

    projectFile.meshes[id].isHalf = !objectData.isHalf
    objectData.setHalf(!objectData.isHalf);

    return action
}

export default updateHalf;