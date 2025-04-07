import { useState, forwardRef, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

/**
 * @typedef {BallMesh} -Gives properties for Ball Mesh, inherits Selectable Mesh
 */
const BallMesh = forwardRef(({ id, ...props }, ref) => {
  BallMesh.displayName = "Ball Mesh";
  const attributeList = ["circum"];

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const meshLoading = useStore((state)=>state.meshLoading);

  const [radius, setRadius] = useState(1);
  const [circum, setCircum] = useState(DEF_CIRCUM);

  useEffect(() => {
    // makes sure circum doesn't reset if loading
    if (!meshLoading) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.circum = circum;
      setProjectFile({ ...projectFile });
    }
  }, []);

  return (
    <SelectableMesh
      meshType="ball"
      ref={ref}
      meshData={{ radius, setRadius, circum, setCircum, attributeList }}
      id={id}
      {...props}
    >
      <sphereGeometry args={[radius, 10, 10]} />
    </SelectableMesh>
  );
});

export default BallMesh;
