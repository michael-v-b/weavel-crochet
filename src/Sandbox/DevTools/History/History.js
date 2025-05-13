import { forwardRef, useImperativeHandle, useEffect } from "react";
import useStore from "../store";
import updateTranslate from './updateTranslate';
import updateRotate from "./updateRotate";
import updateCreate from './updateCreate';
import updateDelete from "./updateDelete";
import updateHeight from "./updateHeight";
import updateCircum from "./updateCircum";
import updateDim from "./updateDim";
import updateName from "./updateName";

/**
 * undo dim
 * undo name change
 */
const History = forwardRef(
  ({ rotaterRef, deleterRef, meshSpawnerRef }, ref) => {
    History.displayName = "History";

    const keysPressed = useStore((state) => state.keysPressed);
    const isFocused = useStore((state) => state.isFocused);
    const undoList = useStore((state) => state.undoList);
    const resetUndoList = useStore((state) => state.resetUndoList);
    const redoList = useStore((state) => state.redoList);
    const setRedoList = useStore((state) => state.setRedoList);
    const updateAvgPosition = useStore((state) => state.updateAvgPosition);
    const projectFile = useStore((state) => state.projectFile);
    const setProjectFile = useStore((state) => state.setProjectFile);
    const isDragging = useStore((state) => state.isDragging);
    const circum_radius_convert = useStore(
      (state) => state.circum_radius_convert
    );

    useEffect(()=>{
      console.log("====================")
      console.log("undoList: " + undoList);
      console.log("redoList: " + redoList);
    },[undoList,redoList]);
    /**
     * applies the action to the correct list
     * @param {[Oject]} action - action to be added.
     * @param {boolean} isUndo - whether list should go to redo or undo list.
     */
    const updateLists = (action, isUndo) => {
      console.log("action: " + action);
      if (isUndo) {
        console.log("updateLists ~~~~~~~~~~~~~~~~~~~");
        console.log("undoList: " + undoList);
        console.log("redoList: " + redoList);
        redoList.push(action);
        setRedoList([...redoList]);
      } else {
        undoList.push(action);
        resetUndoList([...undoList]);
      }
    };
    

    const actionHandler = {
      translate: (action,projectFile)=>{return updateTranslate(action,projectFile,updateAvgPosition)},
      rotate: (action,projectFile) => {return updateRotate(action,projectFile,rotaterRef)},
      create: (action,_) => {return updateCreate(action,deleterRef)},
      delete: (action,projectFile) => {
        setRedoList([]);
        return updateDelete(action,
          projectFile,
          setProjectFile,
          meshSpawnerRef,
          circum_radius_convert)
      },
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
        const tempAction = handler(action,projectFile);
        updateLists(tempAction,isUndo);
      }
      setProjectFile({ ...projectFile });
    };

    useImperativeHandle(ref, () => ({ makeAction }));

    //keyboard short cut
    useEffect(() => {
      if (isDragging) {
        return;
      }

      if (
        (keysPressed.includes("ControlLeft") ||
          keysPressed.includes("ControlRight")) &&
        !isFocused
      ) {
        if (keysPressed.includes("KeyZ")) {
          makeAction(undoList, true);
        } else if (keysPressed.includes("KeyY")) {
          makeAction(redoList, false);
        }
      }
    }, [keysPressed]);
  }
);

export default History;
