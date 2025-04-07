import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

/**
 * @typedef {BoxMesh} - Gives properties for Box Mesh, inherits Selectable Mesh
 */
const BoxMesh = forwardRef(({ id, ...props }, ref) => {
  BoxMesh.displayName = "Box Mesh";
  const attributeList = ["dim"];
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const height_convert = useStore((state)=>state.height_convert);
  const meshLoading = useStore((state)=>state.meshLoading);

  const [xDim, setX] = useState(DEF_HEIGHT);
  const [yDim, setY] = useState(DEF_HEIGHT);
  const [zDim, setZ] = useState(DEF_HEIGHT);

  const [linked, setLinked] = useState(false);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  useEffect(() => {
    if(!meshLoading) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.dim = [xDim, yDim, zDim];
      setProjectFile({ ...projectFile });
    }
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
        args={[height_convert(xDim), height_convert(yDim), height_convert(zDim), 2]}
      />
    </SelectableMesh>
  );
});

export default BoxMesh;
