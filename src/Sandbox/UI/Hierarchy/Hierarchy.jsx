import "./Hierarchy.css";
import "../../styles.css";
import HierarchyCell from "./HierarchyCell";
import useStore from "../../DevTools/store";
import CellSelector from "./CellSelector";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import useRefStore from "../../DevTools/refStore";

/**
 * @typedef {Hierarchy} - a visual list of all the objects in the scene.
 * @property {SelectionManagerReference} selectionManager - allows access
 * to all of the SelectionManager's public properties and methods.
 *@returns {Component} - a list of Hierarchy Cell objects associated with each mesh in the scene.
 */
const Hierarchy = ({ selectionManager }) => {
  Hierarchy.displayName = "Object List";

  const cellSelectorRef = useRef(null);
  const meshList = useStore((state) => state.meshList);
  const OBJECT_LIMIT = useStore((state) => state.OBJECT_LIMIT);
  const setMultiSelect = useStore((state) => state.setMultiSelect);
  const multiSelect = useStore((state) => state.multiSelect);
  const setRefs = useRefStore((state) => state.setRefs);
  const hierarchyRef = useRef(null);

  useEffect(() => {
    if (hierarchyRef) {
      setRefs("hierarchy", hierarchyRef);
    }
  }, [hierarchyRef]);

  /**
   * only allows one cell to be selected unless control or shit is pressed.
   * @param {Number} id - the id associated with the hier archy that was selected.
   */
  const handleSelection = (id) => {
    cellSelectorRef.current.updateCells(id);
  };

  return (
    <div className="side-window" ref={hierarchyRef}>
      <div className="side-title-bar">
        Object List: {meshList.length}/{OBJECT_LIMIT}
      </div>
      <div className="hierarchy">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setMultiSelect(!multiSelect);
          }}
          className="multi-select"
          style={{ backgroundColor: multiSelect ? "grey" : "white" }}
        >
          Multi-Select
        </motion.div>

        <CellSelector ref={cellSelectorRef} />
        {meshList.map((object) => {
          const index = object.userData.idNumber;
          const cellRef = object.userData.cellRef;
          return (
            <HierarchyCell
              ref={cellRef}
              key={index}
              id={index}
              selectionManager={selectionManager}
              objectRef={object}
              name={object.name}
              updateCells={handleSelection}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hierarchy;
