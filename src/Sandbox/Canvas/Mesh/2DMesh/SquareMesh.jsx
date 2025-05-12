import { forwardRef, useState, useEffect} from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

/**
 *@typedef {SquareMesh} - Gives properties for Square Mesh, inherits Selectable Mesh
 */
const SquareMesh = forwardRef(({ id, ...props }, ref) => {
  SquareMesh.displayName = "SquareMesh";
  const attributeList = ["dim"];
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const height_convert = useStore((state)=>state.height_convert);

  const meshLoading = useStore((state)=>state.meshLoading);

  const [xDim, setX] = useState(DEF_HEIGHT);
  const [yDim, setY] = useState(DEF_HEIGHT);
  const [linked, setLinked] = useState(false);
  const dependencyList = [xDim,yDim];

  useEffect(() => {
    if(!meshLoading) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.dim = [xDim, yDim];
      setProjectFile({ ...projectFile });
    }
  }, []);

  return (
    <SelectableMesh
      id={id}
      dependencyList = {dependencyList}
      meshType="square"
      meshData={{ xDim, setX, yDim, setY, linked, setLinked, attributeList }}
      ref={ref}
      {...props}
    >
      <boxGeometry
        args={[height_convert(xDim),height_convert(yDim) , 0.125/2]}
      />
    </SelectableMesh>
  );
});

export default SquareMesh;
