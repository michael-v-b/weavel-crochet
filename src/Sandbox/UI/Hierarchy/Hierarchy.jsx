import "./Hierarchy.css";
import "../../styles.css";
import HierarchyCell from "./HierarchyCell";
import useStore from "../../DevTools/store";
import CellSelector from "./CellSelector";
import  {
  useEffect,
  useRef,
} from "react";

/**
 * @typedef {Hierarchy} - a visual list of all the objects in the scene.
 * @property {SelectionManagerReference} selectionManager - allows access
 * to all of the SelectionManager's public properties and methods.
 *@returns {Component} - a list of Hierarchy Cell objects associated with each mesh in the scene.
 */
const Hierarchy = ({ selectionManager}) => {
  Hierarchy.displayName = "Object List";

  const cellSelectorRef = useRef(null);
  const meshList = useStore((state) => state.meshList);

  /**
   * only allows one cell to be selected unless control or shit is pressed.
   * @param {Number} id - the id associated with the hier archy that was selected.
   */
  const handleSelection = (id) => {
    cellSelectorRef.current.updateCells(id);
  };

  useEffect(()=>{
    console.log("meshList: ")
    console.dir(meshList);
  },[meshList]);

  return (
    <div className="side-window">
      <div className="side-title-bar">Object List</div>
      <div className="hierarchy">
        <CellSelector ref={cellSelectorRef} />
        {meshList.map((object) => {
          const index = object.userData.idNumber;
          const cellRef = object.userData.cellRef;
          return (
            <HierarchyCell
              ref = {cellRef}
              key={index}
              id={index}
              selectionManager={selectionManager}
              objectRef={object}
              name={object.name}
              updateCells={handleSelection}
            >
              {object.name}
            </HierarchyCell>
          );
        })}
      </div>
    </div>
  );
};

export default Hierarchy;
