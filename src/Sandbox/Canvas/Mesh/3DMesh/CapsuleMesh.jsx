import  { forwardRef, useState, useEffect } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";

/**
 *@typedef {CapsuleMesh} - Gives properties for Capsule Mesh, inherits Selectable Mesh
 */
const CapsuleMesh = forwardRef(({ id, ...props }, ref) => {
  CapsuleMesh.displayName = "Capsule Mesh";
  const attributeList = ["circum", "height"];

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const height_convert = useStore((state)=>state.height_convert);
  const meshLoading = useStore((state)=>state.meshLoading);

  const [height, setHeight] = useState(DEF_HEIGHT*2);
  const [radius, setRadius] = useState(1);
  const [circum, setCircum] = useState(DEF_CIRCUM);

  const dependencyList = [height,radius];

  useEffect(() => {

    if(!meshLoading) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.circum = circum;
      newMesh.height = height;
      setProjectFile({ ...projectFile });
    }
    
  }, []);

  return (
    <SelectableMesh
      meshType="capsule"
      dependencyList=  {dependencyList}
      boxDim = {[radius,height_convert(height/2),radius]}
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
      <capsuleGeometry args={[radius,height_convert(height)/2, 10, 10]} />
    </SelectableMesh>
  );
});

export default CapsuleMesh;
