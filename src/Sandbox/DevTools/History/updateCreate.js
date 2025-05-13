    /**
     * Undoes creation of an object.
     * @param {[{string}, {[ObjectRef]}]} action -
     * action[0] - name of action
     * action[1] - reference to object created
     * @param {boolean} isUndo - true if undo and false if redo.
     */
    const updateCreate = (action, isUndo,deleterRef) => {
      const objects = [...action[1]];
      const objectTypes = [];
      const objectIds = [];

      const objectInfo = [];

      for (let i = 0; i < objects.length; i++) {
        objects[i] = objects[i].current;
        if (objects[i]) {
          const objectData = objects[i].userData;
          const meshData = objectData.meshData;

          const attributeMap = {
            circum: meshData.circum,
            height: meshData.height,
            half: meshData.half,
            dim: meshData.dim,
            width: meshData.width,
          };

          const saveData = {};

          //save data
          saveData.name = objects[i].name;
          saveData.position = objects[i].position.toArray();
          saveData.rotation = objects[i].rotation.toArray();
          saveData.colorIndex = objectData.colorIndex;
          saveData.attributeList = objectData.meshData.attributeList;
          saveData.type = objectData.meshType;

          const attributeList = saveData.attributeList;

          //set attributeList
          for (const attribute of attributeList) {
            saveData[attribute] = attributeMap[attribute];
          }

          objectInfo.push(saveData);
          //ids
          objectIds.push(objectData.idNumber);
          //shape types
          objectTypes.push(objectData.meshType);
        }
        //console.dir(objectData);
      }
      deleterRef.current.deleteMeshes(objects);
      action = [];
      action[0] = "delete";
      action[1] = objectIds;
      action[2] = objectTypes;
      action[3] = objectInfo;
      //updateLists([...action], isUndo);
      return [action,isUndo];
    };

    export default updateCreate;