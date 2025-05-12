import { Outlines } from "@react-three/drei";
import { forwardRef, useEffect, useState, useRef } from "react";
import { DoubleSide, BufferGeometry, Box3, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import MeshVisuals from "./MeshVisuals";
import { computeBoundsTree } from "three-mesh-bvh";

/**
 *@typedef {SelectableMesh} - creates a mesh that can be selected or deselected.
 *@property {String} meshType - name of the type of mesh being created
 *@property {Set} meshData - custom data assigned by each different mesh type.
 *@property {Component} children - used to add child components of the different mesh types.
 *@property {string} color - color of the object.
 * @returns {Component} - SelectableMesh component, this acts as hitbox, visual component is in VisualMesh.
 */
const SelectableMesh = forwardRef(
  (
    {
      id,
      dependencyList,
      colorList,
      meshType,
      meshData,
      children,
      hierarchyRef,
      intersectionManagerRef,
      materialProps,
      ...props
    },
    ref
  ) => {
    SelectableMesh.displayName = "Selectable Mesh";

    const [selected, setSelected] = useState(false);
    const [outlineWeight, setOutlineWeight] = useState(0);
    const[outlineColor,setOutlineColor] = useState('black');

    const [colorIndex, setColorIndex] = useState(1);
    const bvhRef = useRef(null);
    const visualRef = useRef(null);
    const cellRef = useRef(hierarchyRef);

    const idNumber = id;


    BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;

    useFrame(() => {
      if (ref.current) {
        const geo = ref.current.geometry;
        geo.computeBoundsTree(geo);
      }
    });

    /**
     * update outline weight of mesh when selected.
     *run every time selected changes.
     */
    useEffect(() => {
      setOutlineWeight(selected ? 5 : 1);
      setOutlineColor(selected ? "#ff8800": 'black');
    }, [selected]);



    //change for draggability
    return (
      <>
        <MeshVisuals ref = {visualRef} hitboxRef = {ref} dependencyList = {dependencyList} colorIndex = {colorIndex}/>
       
        <mesh
          ref={ref}
          userData={{
            visualRef,
            idNumber,
            selected,
            setSelected,
            colorIndex,
            setColorIndex,
            cellRef,
            meshType: meshType,
            meshData,
            bvhRef,
          }}
          {...props}
          layer={2}
        >
          {children}

          <meshBasicMaterial
            visible = {false}
          />
          <Outlines thickness={outlineWeight} color= {outlineColor}/>
        </mesh>
      </>
    );
  }
);

export default SelectableMesh;
