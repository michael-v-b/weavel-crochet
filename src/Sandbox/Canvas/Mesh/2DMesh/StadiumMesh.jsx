import SelectableMesh from "../SelectableMesh";
import { forwardRef, useMemo, useEffect, useState } from "react";
import { BufferGeometry, BufferAttribute } from "three";
import useStore from "../../../DevTools/store";

const StadiumMesh = forwardRef(({ id, ...props }, ref) => {
  StadiumMesh.displayName = "StadiumMesh";

 
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const height_convert = useStore((state)=>state.height_convert);
  const DEF_HEIGHT = useStore((state)=>state.DEF_HEIGHT);

  const meshLoading = useStore((state)=>state.meshLoading);

  const segments = 20;
  const attributeList = ["height"];
  const half = (segments - 2) / 2;
  const [height, setHeight] = useState(DEF_HEIGHT);
  const FRONT_OFFSET = segments + 2;
  const DEPTH_OFFSET = 0.125;

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();

    const vertices = [];
    const indices = [];

    //0 and 1 are center vertices 0 = top 1 = bottom

    //make vertices
    //front
    for (let i = 0; i < 2; i++) {
      //seperates front from back
      const z = i == 0 ? DEPTH_OFFSET : -DEPTH_OFFSET;
      const IS_FRONT = FRONT_OFFSET * i;

      vertices.push(
        ...[0, height_convert(DEF_HEIGHT), z, 0, -height_convert(DEF_HEIGHT), z]
      );

      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < half + 1; k++) {
          //go around circle until half theta = math.pi then offset
          const theta = j * Math.PI + (k / half) * Math.PI;
          const x = Math.cos(theta);
          const y =
            j == 0
              ? Math.sin(theta) + height_convert(DEF_HEIGHT)
              : Math.sin(theta) - height_convert(DEF_HEIGHT);

          vertices.push(x, y, z);

          //set indices of faces the *j just activates the half
          if (k > 0) {
            const temp = k + (half + 1) * j + IS_FRONT;
            if (IS_FRONT) {
              indices.push(temp + 2, temp + 1, j + IS_FRONT);
            } else {
              indices.push(j + IS_FRONT, temp + 1, temp + 2);
            }
          }
        }
      }

      const a = segments + IS_FRONT + 1;
      const b = half + IS_FRONT + 3;
      const c = half + IS_FRONT + 2;
      const d = IS_FRONT + 2;
      if (IS_FRONT) {
        indices.push(a, b, c);
        indices.push(d, a, c);
      } else {
        indices.push(c, b, a);
        indices.push(c, a, d);
      }
    }

    const inRange = (a, length, bottom) => {
      return (a % length) + bottom;
    };
    //connect walls
    for (let i = 0; i < segments + 1; i++) {
      const a = inRange(i, segments, 2);
      const b = inRange(i + 1, segments, 2);
      const c = inRange(i, segments, FRONT_OFFSET + 2);
      const d = inRange(i + 1, segments, FRONT_OFFSET + 2);
      indices.push(c, b, a, d, b, c);
    }

    geo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3)
    );
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [height]);

  useEffect(() => {
    if(!meshLoading) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.height = height;
      setProjectFile({ ...projectFile });
    }
  }, []);

  
  return (
    <SelectableMesh
      id={id}
      ref={ref}
      boxDim = {[1,height_convert((height+2)/2),DEPTH_OFFSET/2]}
      meshType="stadium"
      meshData={{ height, setHeight, attributeList }}
      {...props}
    >
      <primitive object={geometry} />
    </SelectableMesh>
  );
});

export default StadiumMesh;
