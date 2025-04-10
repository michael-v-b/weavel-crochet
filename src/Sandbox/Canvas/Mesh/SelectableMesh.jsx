import { Outlines } from "@react-three/drei";
import {
  forwardRef,
  useEffect,
  useState,
  useRef,
} from "react";
import { DoubleSide,Box3,Vector3} from "three";
import {useFrame} from "@react-three/fiber";
import BVH from "./BVH";


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
    { id, colorList,  meshType, meshData,  children, hierarchyRef, materialProps, ...props },
    ref
  ) => {
    SelectableMesh.displayName = "Selectable Mesh";
    

    const [selected, setSelected] = useState(false);
    const [outlineWeight, setOutlineWeight] = useState(0);

    const [colorIndex, setColorIndex] = useState(1);
    const bvhRef = useRef(null);
    const cellRef = useRef(hierarchyRef);
 
    
    const idNumber = id;


    /**
     * update outline weight of mesh when selected.
     *run every time selected changes.
     */
    useEffect(() => {
      setOutlineWeight(selected ? 5 : 0);
    }, [selected]);
  
    //change for draggability
    return (
      <>
      <BVH ref = {bvhRef} meshRef = {ref}/>
      <mesh
        ref={ref}
        userData={{
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
       
        <meshStandardMaterial
          color={colorList[colorIndex - 1]}
          roughness={1}
          {...materialProps}
          side={DoubleSide}
        />
        {selected && <Outlines thickness={outlineWeight} color="#ff8800" />}
      </mesh>
      </>
    );
  }
);

export default SelectableMesh;
