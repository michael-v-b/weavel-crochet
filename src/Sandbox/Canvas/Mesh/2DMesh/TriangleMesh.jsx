import { forwardRef, useState, useEffect, useMemo } from "react";
import SelectableMesh from "../SelectableMesh";
import useStore from "../../../DevTools/store";
import { BufferGeometry, BufferAttribute } from "three";

/**
 * @typedef {TriangleMesh} - Gives properties for Circle Mesh, inherits Selectable Mesh
 */
const TriangleMesh = forwardRef(({ id, ...props }, ref) => {
  TriangleMesh.displayName = "Triangle Mesh";
  const attributeList = ["height", "width"];
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const DEF_HEIGHT = useStore((state) => state.DEF_HEIGHT);
  const height_convert = useStore((state) => state.height_convert);
  const meshLoading = useStore((state) => state.meshLoading);
  const [height, setHeight] = useState(DEF_HEIGHT/2);
  const [width, setWidth] = useState(DEF_HEIGHT/2);

  const dependencyList = [height, width];

  useEffect(() => {
    if (!meshLoading) {
      const newMesh = projectFile.meshes[id];
      newMesh.attributeList = attributeList;
      newMesh.height = height;
      newMesh.width = width;
      setProjectFile({ ...projectFile });
    }
  }, []);

  const geometry = useMemo(() => {
    const vertices = [];
    const indices = [];
    const geo = new BufferGeometry();
    const segments = 3;
    let DEPTH_OFFSET = 0.125;

    for (let i = 0; i < 2; i++) {
      const bottomLeft = [
        -height_convert(width),
        -height_convert(height),
        DEPTH_OFFSET,
      ];
      const bottomRight = [
        height_convert(width),
        -height_convert(height),
        DEPTH_OFFSET,
      ];
      const top = [0, height_convert(height), DEPTH_OFFSET];

      vertices.push(...top);
      vertices.push(...bottomLeft);
      vertices.push(...bottomRight);

      DEPTH_OFFSET *= -1;
    }

    indices.push(0, 1, 2);
    indices.push(3, 5, 4);

    const inRange = (a, length, bottom) => {
      return (a % length) + bottom;
    };

    for (let i = 0; i < 3 + 1; i++) {
      const a = inRange(i, segments, 0);
      const b = inRange(i + 1, segments, 0);
      const c = inRange(i, segments, 3);
      const d = inRange(i + 1, segments, 3);
      indices.push(b, c, d, a, c, b);
    }

    geo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3)
    );
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  },[height,width]);

  return (
    <SelectableMesh
      id={id}
      dependencyList={dependencyList}
      meshType="triangle"
      meshData={{ height, setHeight, width, setWidth, attributeList }}
      ref={ref}
      {...props}
    >
      <primitive object={geometry} />
    </SelectableMesh>
  );
});

export default TriangleMesh;
