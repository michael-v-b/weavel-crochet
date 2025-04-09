import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

/**
 * @typedef {CircleMesh} - Gives properties for Circle Mesh, inherits Selectable Mesh
 */
const CircleMesh = forwardRef(({ id, ...props }, ref) => {
  CircleMesh.displayName = "Circle Mesh";
  const attributeList = ["circum"];
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const meshLoading = useStore((state)=>state.meshLoading);
  const [radius, setRadius] = useState(1);
  const [circum, setCircum] = useState(DEF_CIRCUM);

  useEffect(() => {
    if(!meshLoading) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.circum = circum;
      setProjectFile({ ...projectFile });
    }
  }, []);

  return (
    <SelectableMesh
      id={id}
      meshType="circle"
      boxDim = {[radius,0.125/2,radius]}
      meshData={{ radius, setRadius, circum, setCircum, attributeList }}
      ref={ref}
      {...props}
    >
      <cylinderGeometry args={[radius, radius, 0.125, 20]} />
    </SelectableMesh>
  );
});

export default CircleMesh;
