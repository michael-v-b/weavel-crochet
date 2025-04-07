import { forwardRef, useEffect, useState, useMemo } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";
import { BufferGeometry, BufferAttribute } from "three";

const SiloMesh = forwardRef(({ id, ...props }, ref) => {
  SiloMesh.displayName = "Silo Mesh";
  
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);
  const circum_radius_convert = useStore((state)=>state.circum_radius_convert);
  const height_convert = useStore((state)=>state.height_convert);
  const meshLoading = useStore((state)=>state.meshLoading);

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);


  const attributeList = ["circum", "height"];
  const segments = 20;
  const [height, setHeight] = useState(DEF_HEIGHT);
  const [circum, setCircum] = useState(DEF_CIRCUM);
  const [radius, setRadius] = useState(circum_radius_convert(DEF_CIRCUM));



  const inRange = (a, length, bottom) => {
    return (a % length) + bottom;
  };

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const vertices = [];
    const indices = [];

    //horizontal circle radius/height
    for (let i = 0; i < segments + 1; i++) {
      //keeps phi the same on final entry
      const phi = Math.min(
        (((segments - 1) / segments) * Math.PI) / 2,
        ((i / segments) * Math.PI) / 2
      );
      const RING_HEIGHT =
        i != segments ? height_convert((height/2))-radius : -((height_convert(height/2)));
      if(i == 0 ) {
      console.log("10 in game is " + height_convert(10));
      console.log("5 in game is " + height_convert(5));
      console.log("radius is " + radius);
      console.log("RING_HEIGHT is: " + RING_HEIGHT);
      console.log("cos phi" + Math.cos(phi))
      console.log("phi: " + phi);
      console.log("y: " + (Math.cos(phi)*radius + RING_HEIGHT));
      }
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
    if(!meshLoading) {
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
      ref={ref}
      meshType="silo"
      boxDim = {[radius*2,height_convert(height),radius*2]}
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
      {...props}
    >
      <primitive object={geometry} />
    </SelectableMesh>
  );
});

export default SiloMesh;
