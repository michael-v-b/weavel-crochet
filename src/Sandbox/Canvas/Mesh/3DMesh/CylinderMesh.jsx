import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import { DoubleSide, FrontSide } from "three";
import useStore from "../../../DevTools/store";

/**
 * @typedef {CylinderMesh} - Gives properties for Cylinder Mesh, inherits Selectable Mesh
 */
const CylinderMesh = forwardRef(({ id, ...props }, ref) => {
  CylinderMesh.displayName = "Cylinder Mesh";

  const attributeList = ["circum", "height", "open"];
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const approx = Math.ceil(CONV_RATE * 2);
  const [height, setHeight] = useState(approx);
  const [circum, setCircum] = useState(DEF_CIRCUM);
  const [radius, setRadius] = useState(1);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const newMesh = projectFile.meshes[id];
    newMesh.attributeList = attributeList;
    newMesh.circum = circum;
    newMesh.radius = radius;
    newMesh.open = open;
    setProjectFile({ ...projectFile });
  }, []);

  return (
    <SelectableMesh
      id={id}
      meshType="cylinder"
      meshData={{
        open,
        setOpen,
        height,
        setHeight,
        circum,
        setCircum,
        radius,
        setRadius,
        attributeList,
      }}
      materialProps={{ side: open ? DoubleSide : FrontSide }}
      ref={ref}
      {...props}
    >
      <cylinderGeometry
        args={[radius, radius, height / CONV_RATE, 10, 10, open]}
      />
    </SelectableMesh>
  );
});

export default CylinderMesh;
