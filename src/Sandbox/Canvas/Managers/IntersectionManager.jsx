import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Matrix4 } from "three";
import useStore from "../../DevTools/store";

/**
 * @typedef {IntersectionManager} - Tracks whether any of the objects are intersecting wit hone another
 */
const IntersectionManager = forwardRef((_, ref) => {
  IntersectionManager.displayName = "IntersectionManager";
  const meshList = useStore((state) => state.meshList);
  const selectedMeshes = useStore((state) => state.selectedMeshes);
  const setIntersecting = useStore((state)=>state.setIntersecting);

  const [nonSelectedMeshes, setNonSelected] = useState(meshList);

  /**
   * 
   * @returns {boolean} returns true if any 2 objects are intersection, false if not.
   */
  const testIntersections = () => {
    for (let i = 0; i < selectedMeshes.length; i++) {
      const selectedMesh = selectedMeshes[i];
      for (let j = 0; j < nonSelectedMeshes.length; j++) {
        const nonSelectedMesh = nonSelectedMeshes[j];

        //CHAT GPT CODE
        const matrix = new Matrix4();
        matrix.copy(nonSelectedMesh.matrixWorld).invert();
        matrix.multiply(selectedMesh.matrixWorld);

        const bTree = nonSelectedMesh.geometry.boundsTree;
        console.log("bTree: " + bTree);
        const intersects = bTree.intersectsGeometry(
          selectedMesh.geometry,
          matrix
        );
        if (intersects) {
          setIntersecting(true);
          return true;
        }
      }
    }
    setIntersecting(false);
    return false;
  };

  /**
   * test intersections every frame
   */
  useFrame(() => {
    testIntersections();
  });

  //sets all non selected objects when selected meshes changes
  useEffect(() => {
    const tempNonSelect = [];
    meshList.forEach((mesh) => {
      if (!selectedMeshes.includes(mesh)) {
        tempNonSelect.push(mesh);
      }
    });
    setNonSelected([...tempNonSelect]);
  }, [selectedMeshes, meshList]);

  useImperativeHandle(ref, () => ({}));
});

export default IntersectionManager;
