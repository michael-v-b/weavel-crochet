import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

const ChainMesh = forwardRef(({ id, ...props }, ref) => {
  ChainMesh.displayName = "Chain Mesh";
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const height_convert = useStore((state) => state.height_convert);
  const circum_radius_convert = useStore((state)=>state.circum_radius_convert);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  
  const attributeList = ["height"];
  const line = circum_radius_convert(1);
  const [height, setHeight] = useState(DEF_HEIGHT);

  useEffect(() => {
    const newMesh = projectFile.meshes[id];
    newMesh.attributeList = attributeList;
    newMesh.height = height;
    setProjectFile({ ...projectFile });
  }, []);

  return (
    <SelectableMesh
      id={id}
      ref={ref}
      meshType="chain"
      meshData={{ height, setHeight, attributeList }}
      {...props}
    >
      <cylinderGeometry args={[line, line, height_convert(height)]} />
    </SelectableMesh>
  );
});

export default ChainMesh;
