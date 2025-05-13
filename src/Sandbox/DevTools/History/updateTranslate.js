   
   import {Vector3} from 'three';

    /**
     * Does opposite of action for translate
     * @param {[{string},{[Object]},{[x: {Number} y: {Number} z: {Number}]}]} action -
     * a description of the action,
     * action[1] = list of objects translated,
     * action[2] = the displacement.
     * @param {boolean} isUndo - true if undo, false if undo.
     */
    const updateTranslate = (action,projectFile,isUndo,updateAvgPosition) => {

    
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
        return [action,isUndo];
    }

    export default updateTranslate;