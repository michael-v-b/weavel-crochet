import useStore from "../../DevTools/store";
import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const CellSelector = forwardRef(({...props}, ref) => {
  CellSelector.displayName = "CellSelector";

  const meshList = useStore((state) => state.meshList);
  const keysPressed = useStore((state) => state.keysPressed);
  const [controlPressed, setControlPressed] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);

  /**
   *Helper functions
   */

  /**
   * fills cells from lo to hi
   *@param {Number} lo - low number
   *@param {Number} hi - high number
   */
  const fillCells = (lo, hi) => {
    for (let i = lo; i < hi; i++) {
      const cellRef = meshList[i].userData.cellRef;
      cellRef.current.setSelection(true);
    }
  };
  /**
   * turns on all the update cells between selected cell and not
   */
  const shiftUpdateCells = (id) => {

    let lo = -1;
    let clickedCellFound = false;

    for (let i = 0; i < meshList.length; i++) {

      //current Cell
      const currentCell = meshList[i].userData.cellRef.current;
      

      // if current cell was most recently pressed
      if (currentCell.id == id) {
        clickedCellFound = true;

        //if this is lowest number set lo
        if (lo == -1) {
          lo = i;
        } else {
          //end and fill all cells
          fillCells(lo, i);
          return;
        }
      
      } else if (currentCell.isPressed) {
        //if already passed clicked cell and new cell is pressed end
        if (clickedCellFound) {
          fillCells(lo, i);
          return;
        //otherwise continue
        } else {
          lo = i;
        }
      }
    }
  };

  const updateCells = (id) => {
    if (controlPressed) {
      return;
    }

    if (shiftPressed) {
      shiftUpdateCells(id);
      return;
    }

    //deactivates all entries
    for (let i = 0; i < meshList.length; i++) {

 
      
      const cellRef = meshList[i].userData.cellRef;
      if (cellRef.current.id != id) {
        cellRef.current.setSelection(false);
      }
    }
  };

  /**
   * key commands
   */
  useEffect(() => {
    if (
      keysPressed.includes("ShiftLeft") ||
      keysPressed.includes("ShiftRight")
    ) {
      setShiftPressed(true);
      setControlPressed(false);
    } else if (
      keysPressed.includes("ControlLeft") ||
      keysPressed.includes("ControlRight")
    ) {
      setControlPressed(true);
    } else {
      setControlPressed(false);
      setShiftPressed(false);
    }
  }, [keysPressed]);

  useImperativeHandle(ref, () => ({ updateCells }));
});

export default CellSelector;
