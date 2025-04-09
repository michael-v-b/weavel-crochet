import { Outlines } from "@react-three/drei";
import {
  forwardRef,
  useEffect,
  useState,
  useRef,
} from "react";
import { DoubleSide} from "three";
import {OBB} from "three/addons/math/OBB.js";
import OBBDebug from "./OBBDebug";
import {Vector3} from "three";


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
    { id, colorList,  boxDim, meshType, meshData,  children, hierarchyRef, materialProps, ...props },
    ref
  ) => {
    SelectableMesh.displayName = "Selectable Mesh";
    

    const [selected, setSelected] = useState(false);
    const [outlineWeight, setOutlineWeight] = useState(0);
    const cellRef = useRef(hierarchyRef);
    const obbRef = useRef(null);
    const [colorIndex, setColorIndex] = useState(1);
    const idNumber = id;

    const [obbDebugColor, setOBBDebugColor] = useState("green");

    /**
     * Initializes ObbRef/changes when boxDim changes
     */
    useEffect(()=>{
      if(!ref.current){
        return;
      }
      if(!obbRef.current) {
        const obb = new OBB(ref.current.position,new Vector3().fromArray(boxDim));
        obbRef.current = obb;
      } else {
        obbRef.current.halfSize = new Vector3().fromArray(boxDim);
      }
    },[boxDim])

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
      <OBBDebug obbRef = {obbRef} obbDebugColor = {obbDebugColor}  />
      <mesh
        ref={ref}
        userData={{
          idNumber,
          selected,
          setSelected,
          colorIndex,
          setColorIndex,
          setOBBDebugColor,
          cellRef,
          obbRef,
          meshType: meshType,
          meshData,
        }}
        {...props}
        layer={2}
      >

        {/**bounding box*/}
        
    
      
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
