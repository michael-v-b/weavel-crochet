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
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const approxX = Math.ceil(CONV_RATE * 2);
  const approxY = Math.ceil(CONV_RATE * 2);
  const [xDim, setX] = useState(approxX);
  const [yDim, setY] = useState(approxY);
  const [linked, setLinked] = useState(false);

  useEffect(() => {
    const newMesh = projectFile.meshes[id];
    newMesh.attributeList = attributeList;
    newMesh.dim = [xDim, yDim];
    setProjectFile({ ...projectFile });
  }, []);

  return (
    <SelectableMesh
      id={id}
      meshType="square"
      meshData={{ xDim, setX, yDim, setY, linked, setLinked, attributeList }}
      ref={ref}
      {...props}
    >
      <boxGeometry
        args={[approxX / CONV_RATE, approxY / CONV_RATE, 1 / CONV_RATE]}
      />
    </SelectableMesh>
  );
});

export default SquareMesh;
