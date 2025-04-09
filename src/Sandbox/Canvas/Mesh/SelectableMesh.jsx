import { Outlines } from "@react-three/drei";
import {
  forwardRef,
  useEffect,
  useState,
  useRef,
} from "react";
import { DoubleSide,Box3 } from "three";
import {OBB} from "three/addons/math/OBB.js";
import OBBDebug from "./OBBDebug";
import useStore from "../../DevTools/store";
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


  

    /**
     * Initializes ObbRef
     */
    useEffect(()=>{
      if(!ref.current){
        return;
      }
      const obb = new OBB(ref.current.position,new Vector3().fromArray(boxDim));
      obbRef.current = obb;
    },[])

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
      <OBBDebug obbRef = {obbRef} boxDim = {boxDim}  />
      <mesh
        ref={ref}
        userData={{
          idNumber,
          selected,
          setSelected,
          colorIndex,
          setColorIndex,
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
