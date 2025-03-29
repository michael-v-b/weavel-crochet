import  { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

/**
 *@typedef {CapsuleMesh} - Gives properties for Capsule Mesh, inherits Selectable Mesh
 */
const CapsuleMesh = forwardRef(({ id, ...props }, ref) => {
  const attributeList = ["circum", "height"];

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const approx = Math.ceil(CONV_RATE * 4);
  const [height, setHeight] = useState(approx);
  const [radius, setRadius] = useState(1);
  const [circum, setCircum] = useState(DEF_CIRCUM);

  useEffect(() => {
    const newMesh = projectFile.meshes[id];
    newMesh.attributeList = attributeList;
    newMesh.circum = circum;
    newMesh.height = height;
    setProjectFile({ ...projectFile });
  }, []);

  return (
    <SelectableMesh
      meshType="capsule"
      meshData={{
        height,
        setHeight,
        radius,
        setRadius,
        circum,
        setCircum,
        attributeList,
      }}
      id={id}
      ref={ref}
      {...props}
    >
      <capsuleGeometry args={[radius, height / (2 * CONV_RATE), 10, 10]} />
    </SelectableMesh>
  );
});

export default CapsuleMesh;
