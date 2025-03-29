import { forwardRef, useEffect, useState, useMemo } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";
import { BufferGeometry, BufferAttribute } from "three";

const SiloMesh = forwardRef(({ id, ...props }, ref) => {
  const DEF_CIRCUM = useStore((state) => state.DEF_CIRCUM);
  const CONV_RATE = useStore((state) => state.CONV_RATE);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const attributeList = ["circum", "height"];
  const segments = 20;
  const approx = Math.ceil(CONV_RATE * 4);
  const [height, setHeight] = useState(approx);
  const [circum, setCircum] = useState(DEF_CIRCUM);
  const [radius, setRadius] = useState(circum / (2 * Math.PI * CONV_RATE));

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
        i != segments ? height / (CONV_RATE * 4) : -height / (CONV_RATE * 2);

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
    const newMesh = projectFile.meshes[id];
    newMesh.attributeList = attributeList;
    newMesh.height = height;
    newMesh.circum = circum;
    newMesh.radius = radius;
    setProjectFile({ ...projectFile });
  }, []);

  return (
    <SelectableMesh
      ref={ref}
      meshType="silo"
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
