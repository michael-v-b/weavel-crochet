import SelectableMesh from "../SelectableMesh";
import { forwardRef, useMemo, useEffect, useState } from "react";
import { BufferGeometry, BufferAttribute } from "three";
import useStore from "../../../DevTools/store";

/**
 * A mesh for an eye object.
 * @prop {string} id - a unique string that is this object's id number
 * @returns {SelectableMesh}
 */
const EyeMesh = forwardRef(({ id, ...props }, ref) => {
  EyeMesh.displayName = "StadiumMesh";

  const meshLoading = useStore((state)=>state.meshLoading);

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);


  const attributeList = ["size"];
  const segments = 10;
  const [size,setSize] = useState(8);

  const dependencyList = [size];


const convertMM = (mm) => {
    return (mm/10)/2.54
}
  const inRange = (a, length, bottom) => {
    return (a % length) + bottom;
  };

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const vertices = [0,0,0];
    const indices = [];

    const radius = convertMM(size)/2;

    //horizontal circle radius/height
    for (let i = 0; i < segments + 1; i++) {
      //keeps phi the same on final entry
      const phi = Math.min(
        (((segments - 1) / segments) * Math.PI) / 2,
        ((i / segments) * Math.PI) / 2
      );

      //creates full horizontal circle
      for (let j = 0; j < segments + 1; j++) {
        if (j < segments) {
          const tempRadius = Math.sin(phi) * radius;
          const theta = (j / segments) * 2 * Math.PI;
          const x = Math.cos(theta) * tempRadius;
          const z = Math.sin(theta) * tempRadius;
          const y = Math.cos(phi) * radius
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

          //if statement is bandage fix to prevent extra faces
          if(a!= 0 && c!= 0 && b!=0 && c!=0) {
            indices.push(a, b, c);
            indices.push(c, b, d);
          }
        }
      }
    }

    const first_vertex = 91;
    for(let i = 0; i < segments +1;i++) {
        const a = inRange(i,segments,first_vertex);
        const b = inRange(i+1,segments,first_vertex);
        indices.push(0,a,b);
    }
    

    geo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3)
    );

    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [size]);

 useEffect(() => {
    if(!meshLoading && projectFile.meshes[id]) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.size = size;
      setProjectFile({ ...projectFile });
    }
  }, []);

  return (
    <SelectableMesh
      id={id}
      ref={ref}
      dependencyList={dependencyList}
      meshType="eye"
      meshData={{
        size,
        setSize,
        attributeList,
      }}
      {...props}
    >
      <primitive object={geometry} />
    </SelectableMesh>
  );
});

export default EyeMesh;
