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

  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const height_convert = useStore((state)=>state.height_convert);
  const meshLoading = useStore((state)=>state.meshLoading);

  const [height,setHeight] = useState(DEF_HEIGHT);
  const [circum, setCircum] = useState(DEF_CIRCUM);
  const [radius, setRadius] = useState(1);
  const [open, setOpen] = useState(true);

  const updateList = [open,radius,height];

  useEffect(() => {
    if(!meshLoading){
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.circum = circum;
      newMesh.radius = radius;
      newMesh.open = open;
      setProjectFile({ ...projectFile });
    }
  }, []);

  return (
    <SelectableMesh
      id={id}
      meshType="cylinder"
      updateList = {updateList}
      boxDim = {[radius,height_convert(height/2),radius]}
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
        args={[radius, radius, height_convert(height), 10, 10, open]}
      />
    </SelectableMesh>
  );
});

export default CylinderMesh;
