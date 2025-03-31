import { forwardRef, useImperativeHandle} from "react";

import useStore from "../../DevTools/store";

/**
 *@typedef {SelectionManager} manages which objects are selected and updates them on canvas, hierarchy and InfoWindow
 *disables SelectionManager when in camera mode.
 */
const SelectionManager = forwardRef(( _,ref) => {
  SelectionManager.displayName = "SelectionManager";

  let widgetList = [];
  let objectList = [];

  const keysPressed = useStore((state) => state.keysPressed);
  const mode = useStore((state) => state.mode);
  const setSelectedMeshes = useStore((state) => state.setSelectedMeshes);
  const selectedList = useStore((state) => state.selectedMeshes);
  const setSelectedList = useStore((state) => state.setSelectedMeshes);


  let tempSelectedList = selectedList; //templist so updates can happen immediately, before state is changed

  /**
   * Deselects all entries both tempList and selectedList
   */
  const clearSelectedList = () => {
    for (let i = 0; i < selectedList.length; i++) {
      selectedList[i].userData.setSelected(false);

      selectedList[i].userData.cellRef.current.setPressed(false);
    }
    tempSelectedList = [];
    setSelectedMeshes(tempSelectedList);
  };

  /**
   * sets the object and hierarchy cell's selected value to either selected or deselected
   * @param {Mesh} object - the object whose cell and selected value are being changed.
   * @param {bolean} selected - select if true, deselect if false.
   */
  const setObjectSelected = (object, selected) => {
    //select object
    if (selected) {
      object.userData.setSelected(true);
      tempSelectedList = [...tempSelectedList, object];

      //deselect object
    } else {
      object.userData.setSelected(false);
      let objectIndex = tempSelectedList.indexOf(object);
      tempSelectedList.splice(objectIndex);
      tempSelectedList = [
        ...tempSelectedList.slice(0, objectIndex),
        ...tempSelectedList.slice(objectIndex + 1),
      ];
    }

   object.userData.cellRef.current.setPressed(selected);
    setSelectedList(tempSelectedList);
  };

  /**
   * Getter method for an object's selected status
   *@param {Mesh} object - object whose selection status is being questioned
   *@returns {boolean} - object's selected status.
   */
  const getObjectSelected = (object) => {
    return object.userData.selected;
  };

  /**
   * checks provided list for first selected entry
   *@param {[Mesh]} list - list of meshes being checked for first selected
   *@return {Number} - the index of the first selected object, if no object is selected return -1.
   */
  const checkList = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (getObjectSelected(list[i])) {
        return i;
      }
    }
    return -1;
  };

  /**
   *@TODO might have to change this to be less bulky
   *Selects or deselects based on objects intersected by ray.
   *@param {[[Widget],[Mesh]]} clickedList - a 2d list of meshes that intersected with ray
   * first entry is a list of widgets, second intry is a list of Meshes.
   */
  const handleSelections = (clickedList) => {
    widgetList = clickedList[0];
    objectList = clickedList[1];
    //clear if clicked on nothing clear selection list
    if (widgetList.length <= 0 && objectList.length <= 0) {
      clearSelectedList();
      setSelectedList(tempSelectedList);
      return null;
    }
    //ignore if widget is selected, it gives priority
    if (widgetList.length > 0 || mode == "camera") {
      return null;
    }
    //if shift is pressed, then it will add an object
    if (
      keysPressed.includes("ShiftLeft") ||
      keysPressed.includes("ShiftRight")
    ) {
      if (!selectedList.includes(objectList[0])) {
        setObjectSelected(objectList[0], true);
      }

      //otherwise it will either swap or only select one object
    } else if (objectList.length == 1) {
      clearSelectedList();
      setObjectSelected(objectList[0], !getObjectSelected(objectList[0]));
    } else {
      let currentIndex = checkList(objectList);

      if (currentIndex == -1) {
        setObjectSelected(objectList[0], true);
      } else {
        setObjectSelected(objectList[currentIndex], false);
        currentIndex = (currentIndex + 1) % objectList.length;
        setObjectSelected(objectList[currentIndex], true);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleSelections,
    setObjectSelected,
    clearSelectedList,
  }));
});
export default SelectionManager;
