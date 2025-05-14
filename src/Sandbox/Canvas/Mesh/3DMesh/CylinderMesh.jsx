import { forwardRef, useState, useEffect,useRef } from "react";
import SelectableMesh from "../SelectableMesh";
import { DoubleSide, FrontSide } from "three";
import useStore from "../../../DevTools/store";

/**
 * @typedef {CylinderMesh} - Gives properties for Cylinder Mesh, inherits Selectable Mesh
 */
const CylinderMesh = forwardRef(({ id, ...props }, ref) => {
  CylinderMesh.displayName = "Cylinder Mesh";

  const attributeList = ["circum", "height"];
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const height_convert = useStore((state)=>state.height_convert);
  const meshLoading = useStore((state)=>state.meshLoading);

  const [height,setHeight] = useState(DEF_HEIGHT);
  const [circum, setCircum] = useState(DEF_CIRCUM);
  const [radius, setRadius] = useState(1);

  const geoRef = useRef(null);

  const dependencyList = [radius,height];


  useEffect(() => {
    if(!meshLoading && projectFile.meshes[id]){
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.circum = circum;
      newMesh.radius = radius;
      newMesh.height = height;
      setProjectFile({ ...projectFile });
    }
  }, []);

 

  return (
    <SelectableMesh
      id={id}
      meshType="cylinder"
      dependencyList = {dependencyList}
      meshData={{
        height,
        setHeight,
        circum,
        setCircum,
        radius,
        setRadius,
        attributeList,
      }}
      materialProps={{ side: DoubleSide}}
      ref={ref}
      {...props}
    >
      <cylinderGeometry 
        args = {[radius,radius,height_convert(height),10,10,true]}
      />
    </SelectableMesh>
  );
});

export default CylinderMesh;
