import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

const ChainMesh = forwardRef(({ id, ...props }, ref) => {
  ChainMesh.displayName = "Chain Mesh";
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const attributeList = ["height"];
  const lineCircum = 1 / (CONV_RATE * 2);
  const approx = Math.ceil(CONV_RATE * 2);
  const [height, setHeight] = useState(approx);

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
      <cylinderGeometry args={[lineCircum, lineCircum, height / CONV_RATE]} />
    </SelectableMesh>
  );
});

export default ChainMesh;
