import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

/**
 * @typdef {ChainMesh} - A cylinder that represents a crochet chain.
 * @prop {string} id - unique string that is this object's id number.
 * @returns {SelectableMesh}
 */
const ChainMesh = forwardRef(({ id, ...props }, ref) => {
  ChainMesh.displayName = "Chain Mesh";
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const height_convert = useStore((state) => state.height_convert);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const meshLoading = useStore((state)=>state.meshLoading);
  
  const attributeList = ["height"];
  const line = 0.125/2;
  const [height, setHeight] = useState(DEF_HEIGHT);

  const dependencyList = [height];


  useEffect(() => {
    if(!meshLoading && projectFile.meshes[id]) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.height = height;
      setProjectFile({ ...projectFile });
    }
  }, []);

  return (
    <SelectableMesh
      id={id}
      ref={ref}
      dependencyList = {dependencyList}
      meshType="chain"
      meshData={{ height, setHeight, attributeList }}
      {...props}
    >
      <cylinderGeometry args={[line, line, height_convert(height)]} />
    </SelectableMesh>
  );
});

export default ChainMesh;
