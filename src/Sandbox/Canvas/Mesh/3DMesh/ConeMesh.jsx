import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import { DoubleSide, FrontSide } from "three";
import useStore from "../../../DevTools/store";

/**
 * @typedef {ConeMesh} - Gives properties for Cone Mesh, inherits Selectable Mesh
 */
const ConeMesh = forwardRef(({ id, ...props }, ref) => {
  const attributeList = ["circum", "height", "open"];

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const approx = Math.ceil(CONV_RATE * 2);
  const [radius, setRadius] = useState(1);
  const [circum, setCircum] = useState(DEF_CIRCUM);
  const [height, setHeight] = useState(approx);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const newMesh = projectFile.meshes[id];
    newMesh.attributeList = attributeList;
    newMesh.circum = circum;
    newMesh.height = height;
    newMesh.open = open;
    setProjectFile({ ...projectFile });
  }, []);

  return (
    <SelectableMesh
      meshType="cone"
      id={id}
      meshData={{
        open,
        setOpen,
        radius,
        setRadius,
        circum,
        setCircum,
        height,
        setHeight,
        attributeList,
      }}
      ref={ref}
      materialProps={{ side: open ? DoubleSide : FrontSide }}
      {...props}
    >
      <coneGeometry args={[radius, height / CONV_RATE, 10, 10, open]} />
    </SelectableMesh>
  );
});

export default ConeMesh;
