import SelectableMesh from "../SelectableMesh";
import { forwardRef, useMemo, useEffect, useState } from "react";
import { BufferGeometry, BufferAttribute } from "three";
import useStore from "../../../DevTools/store";

/**
 * A mesh for a stadium object.
 * @prop {string} id - a unique string that is this object's id number
 * @returns {SelectableMesh}
 */
const StadiumMesh = forwardRef(({ id, ...props }, ref) => {
  StadiumMesh.displayName = "StadiumMesh";

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const height_convert = useStore((state) => state.height_convert);
  const DEF_HEIGHT = useStore((state) => state.DEF_HEIGHT);

  const meshLoading = useStore((state) => state.meshLoading);

  const segments = 20;
  const attributeList = ["height", "width", "isHalf"];
  const half = (segments - 2) / 2;

  const [height, setHeight] = useState(DEF_HEIGHT * 2);
  const [width, setWidth] = useState(DEF_HEIGHT);
  const [isHalf, setHalf] = useState(false);

  const dependencyList = [height, width, isHalf];
  const FRONT_OFFSET = isHalf ? (segments + 6) / 2 : segments + 2;
  const DEPTH_OFFSET = 0.125/2;

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();

    let midHeight = height;
    if (isHalf) {
      midHeight = height_convert(height - width / 2) / 2;
    } else {
      midHeight = height_convert(height - width) / 2;
    }

    const radius = height_convert(width / 2);

    const vertices = [];
    const indices = [];

    //0 and 1 are center vertices 0 = top 1 = bottom

    //make vertices
    //front
    for (let i = 0; i < 2; i++) {
      //seperates front from back
      const z = i == 0 ? DEPTH_OFFSET : -DEPTH_OFFSET;

      const IS_FRONT = FRONT_OFFSET * i;

      for (let j = 0; j < 2; j++) {
        //seperated top and bottom

        //add center vertex
        if (j <= 0) {
          vertices.push(...[0, midHeight, z]);
        } else if (!isHalf) {
          vertices.push(...[0, -midHeight, z]);
        }

        //offset between vertex in center at top and at bottom
        const BOTTOM = half + 2;

        for (let k = 0; k < half + 1; k++) {
          //go around circle until half theta = math.pi then offset
          const theta = j * Math.PI + (k / half) * Math.PI;

          const x = radius * Math.cos(theta);
          const y =
            j == 0
              ? radius * Math.sin(theta) + midHeight
              : radius * Math.sin(theta) - midHeight;

          vertices.push(x, y, z);

          if (k > 0) {
            const temp = k + BOTTOM * j + IS_FRONT;

            if (IS_FRONT) {
              indices.push(temp + 1, temp, j * BOTTOM + IS_FRONT);
            } else {
              indices.push(j * BOTTOM + IS_FRONT, temp, temp + 1);
            }
          }
        }
        if (isHalf) {
          break;
        }
      }

      //connect the 2 halves?

      let a = IS_FRONT + 1;
      let b = half + IS_FRONT + 1;
      let c = 0;
      let d = 0;

      //set c and d, and add vertices if isHalf
      if (!isHalf) {
        c = half + IS_FRONT + 3;
        d = segments + IS_FRONT + 1;
      } else {
        c = b + 1;
        d = c + 1;
        vertices.push(-radius, -midHeight, z);
        vertices.push(radius, -midHeight, z);
      }

      if (IS_FRONT) {
        indices.push(a, d, b);
        indices.push(d, c, b);
      } else {
        indices.push(a, b, d);
        indices.push(d, b, c);
      }
    }

    const inRange = (a, length, bottom) => {
      return (a % length) + bottom;
    };
    //connect walls
    for (let i = 0; i < FRONT_OFFSET - 1; i++) {
      let a = inRange(i, FRONT_OFFSET - 1, 1);
      let b = inRange(i + 1, FRONT_OFFSET - 1, 1);
      let c = inRange(i, FRONT_OFFSET - 1, FRONT_OFFSET + 1);
      let d = inRange(i + 1, FRONT_OFFSET - 1, FRONT_OFFSET + 1);
      if (a == segments / 2 + 1 && !isHalf) {
        a += 1;
        c += 1;
      }
      if (b == segments / 2 + 1 && !isHalf) {
        b += 1;
        d += 1;
      }
      indices.push(c, b, a, d, b, c);
    }

    geo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3)
    );
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [height, width, isHalf]);

  useEffect(() => {
    if (!meshLoading && projectFile.meshes[id]) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.height = height;
      newMesh.width = width;
      newMesh.isHalf = isHalf;
      setProjectFile({ ...projectFile });
    }
  }, []);


  return (
    <SelectableMesh
      id={id}
      ref={ref}
      dependencyList={dependencyList}
      meshType="stadium"
      meshData={{
        height,
        setHeight,
        width,
        setWidth,
        isHalf,
        setHalf,
        attributeList,
      }}
      {...props}
    >
      <primitive object={geometry} />
    </SelectableMesh>
  );
});

export default StadiumMesh;
