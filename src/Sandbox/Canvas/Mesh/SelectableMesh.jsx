import { Outlines } from "@react-three/drei";
import {
  forwardRef,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { DoubleSide } from "three";

/**
 *@typedef {SelectableMesh} - creates a mesh that can be selected or deselected.
 *@property {String} meshType - name of the type of mesh being created
 *@property {Set} meshData - custom data assigned by each different mesh type.
 *@property {Component} children - used to add child components of the different mesh types.
 *@property {string} color - color of the object.
 * @returns {Component} - SelectableMesh component.
 */
const SelectableMesh = forwardRef(
  (
    { id, colorList, meshType, meshData, children, materialProps, ...props },
    ref
  ) => {
    const [selected, setSelected] = useState(false);
    const [outlineWeight, setOutlineWeight] = useState(0);
    const cellRef = useRef(null);
    const [colorIndex, setColorIndex] = useState(1);
    const idNumber = id;
    const meshRef = useRef(null);

    /**
     *sets cellRef value in the object.
     * @param {HierarchyCellReference} tempCellRef - the ref cellRef is set to.
     */
    const handleCellRef = (tempCellRef) => {
      cellRef.current = tempCellRef;
    };

    /**
     * update outline weight of mesh when selected.
     *run every time selected changes.
     */
    useEffect(() => {
      setOutlineWeight(selected ? 5 : 0);
    }, [selected]);

    //change for draggability
    return (
      <mesh
        ref={ref}
        userData={{
          idNumber,
          selected,
          setSelected,
          handleCellRef,
          colorIndex,
          setColorIndex,
          cellRef,
          meshType: meshType,
          meshData,
        }}
        {...props}
        layer={2}
      >
        {children}
        <meshStandardMaterial
          color={colorList[colorIndex - 1]}
          roughness={1}
          {...materialProps}
          side={DoubleSide}
        />
        {selected && <Outlines thickness={outlineWeight} color="#ff8800" />}
      </mesh>
    );
  }
);

export default SelectableMesh;
