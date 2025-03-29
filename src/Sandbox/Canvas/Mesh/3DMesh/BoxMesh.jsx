import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

/**
 * @typedef {BoxMesh} - Gives properties for Box Mesh, inherits Selectable Mesh
 */
const BoxMesh = forwardRef(({ id, ...props }, ref) => {
  const attributeList = ["dim"];
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const approx = Math.ceil(CONV_RATE * 2);
  const [xDim, setX] = useState(approx);
  const [yDim, setY] = useState(approx);
  const [zDim, setZ] = useState(approx);
  const [linked, setLinked] = useState(false);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  useEffect(() => {
    const newMesh = projectFile.meshes[id];
    newMesh.attributeList = attributeList;
    newMesh.dim = [xDim, yDim, zDim];
    setProjectFile({ ...projectFile });
  }, []);
  return (
    <SelectableMesh
      meshType="box"
      meshData={{
        xDim,
        yDim,
        zDim,
        setX,
        setY,
        setZ,
        linked,
        setLinked,
        attributeList,
      }}
      id={id}
      ref={ref}
      {...props}
    >
      <boxGeometry
        args={[xDim / CONV_RATE, yDim / CONV_RATE, zDim / CONV_RATE, 2]}
      />
    </SelectableMesh>
  );
});

export default BoxMesh;
