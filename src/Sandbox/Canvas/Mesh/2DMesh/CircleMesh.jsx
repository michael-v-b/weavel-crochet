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
  const height_convert = useStore((state)=>state.height_convert);
  const [radius, setRadius] = useState(1);
  const [circum, setCircum] = useState(DEF_CIRCUM);

  useEffect(() => {
    const newMesh = projectFile.meshes[id];
    newMesh.attributeList = attributeList;
    newMesh.circum = circum;
    setProjectFile({ ...projectFile });
  }, []);

  return (
    <SelectableMesh
      id={id}
      meshType="circle"
      meshData={{ radius, setRadius, circum, setCircum, attributeList }}
      ref={ref}
      {...props}
    >
      <cylinderGeometry args={[radius, radius, height_convert(1), 20]} />
    </SelectableMesh>
  );
});

export default CircleMesh;
