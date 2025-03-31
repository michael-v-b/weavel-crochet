import "./Hierarchy.css";
import "../../styles.css";
import HierarchyCell from "./HierarchyCell";
import useStore from "../../DevTools/store";
import CellSelector from "./CellSelector";
import  {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

/**
 * @typedef {Hierarchy} - a visual list of all the objects in the scene.
 * @property {SelectionManagerReference} selectionManager - allows access
 * to all of the SelectionManager's public properties and methods.
 *@returns {Component} - a list of Hierarchy Cell objects associated with each mesh in the scene.
 */
const Hierarchy = forwardRef(({ selectionManager, ...props }, ref) => {
  const cellSelectorRef = useRef(null);
  const meshList = useStore((state) => state.meshList);
  const keysPressed = useStore((state) => state.keysPressed);
  const selectedMeshes = useStore((state) => state.selectedMeshes);

  /**
   * only allows one cell to be selected unless control or shit is pressed.
   * @param {Number} id - the id associated with the hier archy that was selected.
   */
  const handleSelection = (id) => {
    cellSelectorRef.current.updateCells(id);
  };

  return (
    <div className="side-window">
      <div className="side-title-bar">Object List</div>
      <div className="hierarchy">
        <CellSelector ref={cellSelectorRef} />
        {meshList.map((object) => {
          const index = object.userData.idNumber;
          return (
            <HierarchyCell
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
});

export default Hierarchy;
