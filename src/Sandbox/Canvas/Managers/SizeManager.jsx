import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useStore from "../../DevTools/store";

const SizeManager = () => {
  const meshList = useStore((state) => state.meshList);
  const meshLoading = useStore((state) => state.meshLoading);
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

    setProjectDims([xDim,yDim,zDim]);
  });

  /*const getPosition = () => {
    const output = [0, 0, 0];
    for (let i = 0; i < projectDims.length; i++) {
      output[i] =
        (projectDims[i][0] - projectDims[i][1]) / 2 + projectDims[i][1];
    }
    return output;
  };

  const axisDim = (axis) => {
    const output = projectDims[axis][0] - projectDims[axis][1];
    return output;
  };

  /return (
    <>
      <mesh position={getPosition()}>
        <boxGeometry args={[axisDim(0), axisDim(1), axisDim(2)]} />
        <meshStandardMaterial color="green" wireframe />
      </mesh>
    </>
  );*/
};
export default SizeManager;
