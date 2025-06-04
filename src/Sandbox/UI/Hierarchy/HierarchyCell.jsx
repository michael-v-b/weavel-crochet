import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import "./Hierarchy.css";
import { motion } from "framer-motion";
import { setWireframeOverride } from "@react-three/drei/materials/WireframeMaterial";

/**
 * @typedef {HierarchyCell} - a single portion of the hierarchy, each cell represents a single mesh.
 * @property {MeshReference} objectRef - object cell responds to.
 * @property {SelectionManagerRef} selectionManager - allows access to all of the selection manager's public methods
 * @property {string} name - Name of the object to be displayed on cell.
 * @property {UpdateCellsCallback} updateCells - call back function for when mouse is pressed.
 * @returns {Component} - a component with the name of the object inside of it.
 */
// eslint-disable-next-line react/display-name
const HierarchyCell = forwardRef(
  ({ id, objectRef, selectionManager, name, updateCells, ...props }, ref) => {
    const [isPressed, setPressed] = useState(false);
    const [cellName, setName] = useState(name);
    /**
     * sets the cell to the pressed state and selects its corresponding object.
     * Should only occur after being clicked.
     */
    const handleClick = () => {
      updateCells(id);
      setSelection(!isPressed);
    };

    const setSelection = (selection) => {
      setPressed(selection);
      selectionManager.current.setObjectSelected(objectRef, selection);
    };

    useImperativeHandle(ref, () => ({
      isPressed,
      setPressed,
      setName,
      setSelection,
      id,
    }));

    useEffect(() => {
      setName(objectRef.name);
    }, []);

    return (
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",

          userSelect: "none",
          overflow: "hidden",
          textWrap: "nowrap",
          backgroundColor: isPressed ? "#76b8e3" : "#d6eaf8",
          color: "black",
          borderRadius: "5px",

          height: "4vh",
          width: "95%",

          marginBottom: "3px",
          paddingLeft: "10px",

          fontSize: "2.5vh",
        }}
        whileHover={{
          scale: 1.05,
          backgroundColor: isPressed ? "#9cccec" : "#FFFFFF",
          color: "black",
          transition: { duration: 0.1 },
        }}
        whileTap={{
          scale: 0.95,
          backgroundColor: "#76b8e3",
          transition: { duration: 0.1 },
        }}
        className="cell clickable"
        onClick={handleClick}
        {...props}
      >
        {objectRef.name}
      </motion.div>
    );
  }
);

export default HierarchyCell;
