import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useStore from "../../DevTools/store";

const SizeManager = () => {
  const meshList = useStore((state) => state.meshList);
  const meshLoading = useStore((state) => state.meshLoading);
  const projectDims = useStore((state)=>state.projectDims);
  const setProjectDims = useStore((state)=>state.setProjectDims);

  useFrame(() => {
    const dims = [
      [-Number.MAX_VALUE, Number.MAX_VALUE],
      [-Number.MAX_VALUE, Number.MAX_VALUE],
      [-Number.MAX_VALUE, Number.MAX_VALUE],
    ];
    if (meshLoading) {
      return;
    }
    //[0] axis [1] max,min

    let differs = false;
    
    for (const mesh of meshList) {
      mesh.geometry.computeBoundingBox();

      const meshBox = mesh.geometry.boundingBox;

      const position = mesh.position.toArray();

      const max = meshBox.max.toArray();
      const min = meshBox.min.toArray();

      //iterates through axises
      for (let i = 0; i < position.length; i++) {
        dims[i][0] = Math.max(max[i] + position[i], dims[i][0]);

        dims[i][1] = Math.min(min[i] + position[i], dims[i][1]);
      }
    }

    const xDim = dims[0][1]-dims[0][0];
    const yDim = dims[1][1]-dims[1][0];
    const zDim = dims[2][1] - dims[2][0];
    if(xDim!=projectDims[0] || yDim != projectDims[1] || zDim != projectDims[2]){
      setProjectDims([xDim,yDim,zDim]);
    }
  });


};
export default SizeManager;
