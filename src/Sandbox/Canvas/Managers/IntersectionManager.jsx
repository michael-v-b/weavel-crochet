import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Matrix4 } from "three";
import useStore from "../../DevTools/store";

const IntersectionManager = forwardRef((_, ref) => {
  IntersectionManager.displayName = "IntersectionManager";
  const meshList = useStore((state) => state.meshList);
  const selectedMeshes = useStore((state) => state.selectedMeshes);
  const avgPosition = useStore((state) => state.avgPosition);
  const isDragging = useStore((state) => state.isDragging);
  const setIntersecting = useStore((state)=>state.setIntersecting);

  const [nonSelectedMeshes, setNonSelected] = useState(meshList);

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

  /*useFrame(()=>{
        if(isDragging) {
            testIntersectionDrag();
        }
    })*/

  useImperativeHandle(ref, () => ({}));
});

export default IntersectionManager;
