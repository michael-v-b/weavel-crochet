import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import useStore from "./store";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import updateMesh from "../DevTools/MeshUpdater";

/**
 * undo dim
 * undo name change
 */
const History = forwardRef(
  ({ rotaterRef, deleterRef, meshSpawnerRef}, ref) => {
    History.displayName = "History";

    const { scene } = useThree();

    const keysPressed = useStore((state) => state.keysPressed);
    const isFocused = useStore((state) => state.isFocused);
    const undoList = useStore((state) => state.undoList);
    const resetUndoList = useStore((state) => state.resetUndoList);
    const redoList = useStore((state) => state.redoList);
    const setRedoList = useStore((state) => state.setRedoList);
    const updateAvgPosition = useStore((state) => state.updateAvgPosition);
    const projectFile = useStore((state) => state.projectFile);
    const setProjectFile = useStore((state) => state.setProjectFile);
    const isDragging = useStore((state)=>state.isDragging);
    const circum_radius_convert = useStore((state)=>state.circum_radius_convert);


    /**
     * applies the action to the correct list
     * @param {[Oject]} action - action to be added.
     * @param {boolean} isUndo - whether list should go to redo or undo list.
     */
    const updateLists = (action, isUndo) => {
      if (isUndo) {
        redoList.push(action);
        setRedoList([...redoList]);
      } else {
        undoList.push(action);
        resetUndoList([...undoList]);
      }
    };


    /**
     * Does opposite of action for translate
     * @param {[{string},{[Object]},{[x: {Number} y: {Number} z: {Number}]}]} action -
     * a description of the action,
     * action[1] = list of objects translated,
     * action[2] = the displacement.
     * @param {boolean} isUndo - true if undo, false if undo.
     */
    const updateTranslate = (action, isUndo) => {
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
      updateLists(action, isUndo);
    };

    /**
     * Rotates object in opposite direction
     * @param {[{string} {[Object]}, {Number}, {string} {Quaternion}]} action -
     * action[0]- name of action,
     * action[1] - list of objects being rotated
     * action[2] - angle of rotation
     * action [3] - axis of rotation as string (used for groups can be edited if need be)
     * action[4] - axis of rotation quaternion
     * action[5] - rotation point
     * @param {boolean} isUndo - true if undo, fals if redo.
     */
    const updateRotate = (action, isUndo) => {


      const objectList = action[1];
      const angle = action[2];
      const axisString = action[3];
      const angleAxis = action[4];
      const rotationPoint = action[5];
      rotaterRef.current.rotateGroup(
        objectList,
        -angle,
        axisString,
        angleAxis,
        rotationPoint
      );

      //update projectFile
      for (let i = 0; i < objectList.length; i++) {
        const object = objectList[i];
        const id = object.userData.idNumber;
        projectFile.meshes[id].position = object.position.toArray();
        projectFile.meshes[id].rotation = object.rotation.toArray();
      }

      action[2] = action[2] * -1;
      updateLists(action, isUndo);
    };

    /**
     * @TODO UPDATE CREATE AND DELETE
     * 
     * 
     * Undoes creation of an object.
     * @param {[{string}, {[ObjectRef]}]} action -
     * action[0] - name of action
     * action[1] - reference to object created
     * @param {boolean} isUndo - true if undo and false if redo.
     */
    const updateCreate = (action, isUndo) => {
      const objects = [...action[1]];
      const objectTypes = [];
      const objectIds = [];

      const objectInfo = [];

      for (let i = 0; i < objects.length; i++) {
        objects[i] = objects[i].current;
        if(objects[i]){
          const objectData = objects[i].userData;
          const saveData = {};

          //save data
          saveData.name = objects[i].name;
          saveData.position = objects[i].position.toArray();
          saveData.rotation = objects[i].rotation.toArray(); 
          saveData.colorIndex = objectData.colorIndex;
          saveData.attributeList = objectData.meshData.attributeList;

          objectInfo.push(saveData);
          //ids
          objectIds.push(objectData.idNumber);
          //shape types
          objectTypes.push(objectData.meshType);
        }
        //console.dir(objectData);
      }
      deleterRef.current.deleteMeshes(objects);

      action[0] = "delete";
      action[1] = objectIds;
      action[2] = objectTypes;
      action[3] = objectInfo;
      updateLists([...action], isUndo);
    };

    /**
     * Undoes deletion of object.
     * @param {[{string},{ObjectRef}]} action -
     * action[0] - name of action
     * action[1] - object ids
     * action[2] - object mesh types
     * action[3] - object data/attribute lists
     * @param {boolean} isUndo - true if undo and false if redo.
     */
    const updateDelete = (action, isUndo) => {

      const spawner = meshSpawnerRef.current;
      const meshIds=  [...action[1]];
      const meshTypes = [...action[2]];
      const meshData = [...action[3]];

      let objectRefs = []; //used for undo/redo

      for (let i = 0; i < meshIds.length; i++) {
        objectRefs = spawner.spawnMeshes(meshTypes,meshIds,false)
      }

      console.log("objectRefs: ");
      console.dir(objectRefs);

      //update refs just spawned.
      for(let i = 0; i < objectRefs.length;i++) {
        updateMesh(objectRefs[i],meshData[i],circum_radius_convert);
      }


      action[0] = "create";
      action[1] = objectRefs;

      updateLists(action, isUndo);
    };

    /**
     *Undoes an object's height.
     *@param {[{string}, {object}, {Number},{Number}]} action-
     *action[0] - name of action.
     *action[1] - object whose color changed.
     *action[2] - old height.
     *action[3] - new height.
     *@param {boolean} isUndo - Is true when being undone and true when redone.
     */
    const updateHeight = (action, isUndo) => {
      const object = action[1];
      const oldHeight = action[2];
      const newHeight = action[3];

      object.userData.meshData.setHeight(oldHeight);

      const id = object.userData.idNumber;
      projectFile.meshes[id].height = oldHeight;

      action[3] = oldHeight;
      action[2] = newHeight;
      updateLists(action, isUndo);
    };

    /**
     *Undoes an object's circum.
     *@param {[{string}, {object}, {Number},{Number}]} action-
     *action[0] - name of action.
     *action[1] - object whose color changed.
     *action[2] - old circum.
     *action[3] - new circum.
     *action[4] - old radius.
     *action[5] - new radius.
     *@param {boolean} isUndo - Is true when being undone and true when redone.
     */
    const updateCircum = (action, isUndo) => {
      const object = action[1];
      const oldRadius = action[2];
      const newRadius = action[3];
      const oldCircum = action[4];
      const newCircum = action[5];

      object.userData.meshData.setRadius(oldRadius);
      object.userData.meshData.setCircum(oldCircum);

      const id = object.userData.idNumber;


      projectFile.meshes[id].circum = oldCircum;

      action[3] = oldRadius;
      action[2] = newRadius;
      action[4] = newCircum;
      action[5] = oldCircum;
      updateLists(action, isUndo);
    };

    /**
     * Undoes an object's dimensions.
     *@param {[{string},{object},{[{Number}]},{[{Number}]}]} action -
     * action[0] - name of action.
     * action[1] - object whose dimensions are being undone.
     * action[2] - dimensions.
     * action[3] - list of old dimensions.
     * action[4] - list of new dimensions.
     * @param {boolean} isUndo -  Is true when being undone and true when redone.
     */
    const updateDim = (action, isUndo) => {
      const object = action[1];
      const dimensions = action[2];
      const oldDims = action[3];
      const newDims = action[4];
      const objectData = object.userData.meshData;

      objectData.setX(oldDims[0]);
      objectData.setY(oldDims[1]);

      if (dimensions == 3) {
        objectData.setZ(oldDims[2]);
      }

      const id = object.userData.idNumber;
      projectFile.meshes[id].dim = oldDims;

      action[3] = newDims;
      action[4] = oldDims;

      updateLists(action, isUndo);
    };

    /**
     * Undoes an object's name
     * @param {[{string},{Object},{string},{string}]} action-
     * action[0] - name of action.
     * action[1] - object whose name was changed.
     * action[2] - old name.
     * action[3] - new name.
     * @param {boolean} isUndo - Is true when being undone and true when redone.
     */
    const updateName = (action, isUndo) => {

      const object = action[1];
      const oldName = action[2];
      const newName = action[3];

      //object.userData.cellRef.setName(oldName);
      object.name = oldName;

      const id = object.userData.idNumber;
      projectFile.meshes[id].name = oldName;

      action[2] = newName;
      action[3] = oldName;

      updateLists(action, isUndo);
    };

    const actionHandler = {
      translate: updateTranslate,
      rotate: updateRotate,
      create: updateCreate,
      delete: updateDelete,
      height: updateHeight,
      circum: updateCircum,
      dim: updateDim,
      name: updateName,
    };

    /**
     * determine which action is being taken using actionHandler list
     * @param {[{string}]} actionList - a list of the various things necessary for a given action to be undone.
     * @param {boolean} isUndo - is true the the action is being undone, is false when it's redone.
     */
    const makeAction = (actionList, isUndo) => {
      if (actionList.length <= 0) {
        return;
      }

      const action = actionList.pop();

      const handler = actionHandler[action[0]];


      if (handler) {
        handler(action, isUndo);
      }



      setProjectFile({ ...projectFile });
    };

    useImperativeHandle(ref, () => ({ makeAction }));

    //keyboard short cut
    useEffect(() => {
      if(isDragging) {
        return;
      }

      if (
        (keysPressed.includes("ControlLeft") ||
          keysPressed.includes("ControlRight")) &&
        !isFocused
      ) {
        if (keysPressed.includes("KeyZ")) {
          makeAction(undoList, true);
        }
        if (keysPressed.includes("KeyY")) {
          makeAction(redoList, false);
        }
      }
    }, [keysPressed]);
  }
);

export default History;
