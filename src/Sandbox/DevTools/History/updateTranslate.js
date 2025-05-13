   
   import {Vector3} from 'three';

    /**
     * Does opposite of action for translate
     * @param {[{string},{[Object]},{[x: {Number} y: {Number} z: {Number}]}]} action -
     * a description of the action,
     * action[1] = list of objects translated,
     * action[2] = the displacement.
     */
    const updateTranslate = (action,projectFile,updateAvgPosition) => {

        const objectList = action[1];
        const displacement = new Vector3().fromArray(action[2]);

        objectList.forEach((object) => {
            object.position.sub(displacement);
            const id = object.userData.idNumber;

            //update projectFile
            projectFile.meshes[id].position = object.position.toArray();
        });
        updateAvgPosition();

        action[2] = displacement.multiplyScalar(-1).clone().toArray();
        //updateLists(action, isUndo);

        const output = action;
        return output;
    }

    export default updateTranslate;