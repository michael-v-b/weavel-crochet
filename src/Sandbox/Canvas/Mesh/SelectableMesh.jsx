import { Outlines } from "@react-three/drei";
import { forwardRef, useEffect, useState, useRef } from "react";
import { DoubleSide, BufferGeometry, Box3, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import MeshVisuals from "./MeshVisuals";
import { computeBoundsTree } from "three-mesh-bvh";
import useStore from "../../DevTools/store";

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

    const [colorIndex, setColorIndex] = useState(1);
    const bvhRef = useRef(null);
    const visualRef = useRef(null);
    const cellRef = useRef(hierarchyRef);
    const [distanceFromCamera, setDistanceFromCamera] = useState(0);

    const [hasEyes, setEyes] = useState([]);

    const idNumber = id;

    const { camera } = useThree();

    const isIntersecting = useStore((state) => state.isIntersecting);

    BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;

    useFrame(() => {
      if (ref.current) {
        const geo = ref.current.geometry;
        geo.computeBoundsTree(geo);
      }
      setDistanceFromCamera(camera.position.distanceTo(ref.current.position));
    });

    /**
     * update outline weight of mesh when selected.
     *run every time selected changes.
     */

    //change for draggability
    return (
      <>
        <MeshVisuals
          ref={visualRef}
          selected={selected}
          hitboxRef={ref}
          dependencyList={dependencyList}
          colorIndex={colorIndex}
        />

        <mesh
          ref={ref}
          scale={[0.95, 0.95, 0.95]}
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
            hasEyes,
            setEyes,
          }}
          {...props}
          layer={2}
        >
          {children}

          <meshBasicMaterial visible={false} />
          <Outlines thickness={1 / distanceFromCamera} color="yellow" />
        </mesh>
      </>
    );
  }
);

export default SelectableMesh;
