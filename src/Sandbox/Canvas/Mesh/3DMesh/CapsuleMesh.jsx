import  { forwardRef, useState, useEffect,useMemo } from "react";
import {BufferAttribute,BufferGeometry} from 'three';
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


  const inRange = (a, length, bottom) => {
    return (a % length) + bottom;
  };

  const segments = 10;

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const vertices = [];
    const indices = [];

    //horizontal circle radius/height
    for (let i = 0; i < segments+1/*segments + 1*/; i++) {
      //keeps phi the same on final entry
      const phi =  (i/segments) * Math.PI;
      const RING_HEIGHT =
        i < (segments/2) ? height_convert((height/2))-radius : -((height_convert(height/2)-radius));

      //creates full horizontal circle
      for (let j = 0; j < segments + 1; j++) {
        if (j < segments) {
          const tempRadius = Math.sin(phi) * radius;
          const theta = (j / segments) * 2 * Math.PI;
          const x = Math.cos(theta) * tempRadius;
          const z = Math.sin(theta) * tempRadius;
          const y = Math.cos(phi) * radius + RING_HEIGHT;
          vertices.push(x, y, z);
        }

        if (j > 0 && i > 0) {
          //a-b
          //c-d

          //top segments
          const a = inRange(j - 1, segments, (i - 1) * segments);
          const b = inRange(j, segments, (i - 1) * segments);
          const c = inRange(j - 1, segments, i * segments);
          const d = inRange(j, segments, i * segments);
          indices.push(a, b, c);
          indices.push(c, b, d);
        }
      }
    }

    geo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3)
    );

    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [height, circum]);

  useEffect(() => {
    if(!meshLoading && projectFile.meshes[id]) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.height = height;
      newMesh.circum = circum;
      newMesh.radius = radius;
      setProjectFile({ ...projectFile });
    }
  }, []);

  return (
    <SelectableMesh
      meshType="capsule"
      dependencyList=  {dependencyList}
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
      {/*<capsuleGeometry args={[radius,height_convert(height)/2, 10, 10]} />*/}
      <primitive object = {geometry}/>
    </SelectableMesh>
  );
});

export default CapsuleMesh;
