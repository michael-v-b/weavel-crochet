import { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import { DoubleSide, FrontSide } from "three";
import useStore from "../../../DevTools/store";

/**
 * @typedef {ConeMesh} - Gives properties for Cone Mesh, inherits Selectable Mesh
 */
const ConeMesh = forwardRef(({ id, ...props }, ref) => {
  ConeMesh.displayName = "Cone Mesh";
  const attributeList = ["circum", "height", "open"];

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const height_convert = useStore((state)=>state.height_convert);

  const [radius, setRadius] = useState(1);
  const [circum, setCircum] = useState(DEF_CIRCUM);
  const [height, setHeight] = useState(DEF_HEIGHT);
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
      <coneGeometry args={[radius, height_convert(height), 10, 10, open]} />
    </SelectableMesh>
  );
});

export default ConeMesh;
