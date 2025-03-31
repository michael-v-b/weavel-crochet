import { useFrame, useThree } from "@react-three/fiber";
import  {forwardRef } from "react";
import IBox from "../../Mesh/InteractiveMeshes/IBox.jsx";
import ILine from "../../Mesh/InteractiveMeshes/ILine.jsx";

/**
 *@typedef {TranslateWidget} - The visual element of the Rotater
 *@returns {Component} - a component with 3 lines, red, green, and blue,
 *which are associated with the x, y, and z axis respectively
 */
const TranslateWidget = forwardRef(({ ...props }, ref) => {
  TranslateWidget.displayName = "Translate Widget";
  const lineSize = 0.2;
  const { camera } = useThree();

  /**
   *updates size of widget to match distance to camera every frame.
   */
  useFrame(() => {
    if (!ref) {
      return;
    }
    const distance = ref.current.position.distanceTo(camera.position);
    const scale = distance / 10;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      <mesh ref={ref} {...props} layer={3}>
        <IBox
          dim={0.5}
          meshProps={{
            userData: { axisLock: "none" },
            layer: 3,
          }}
          materialProps={{ color: "#ffffff", depthTest: false }}
        />
        <ILine
          lineWidth={lineSize}
          meshProps={{
            userData: { axisLock: "y" },
            position: [0, 1.25, 0],
            layer: 3,
          }}
          materialProps={{ depthTest: false, color: "#00FF00" }}
        />
        <ILine
          lineWidth={lineSize}
          meshProps={{
            userData: { axisLock: "x" },
            rotation: [0, 0, Math.PI / 2],
            position: [1.25, 0, 0],
            layer: 3,
          }}
          materialProps={{ depthTest: false, color: "#FF0000" }}
        />
        <ILine
          lineWidth={lineSize}
          meshProps={{
            userData: { axisLock: "z" },
            rotation: [Math.PI / 2, 0, 0],
            position: [0, 0, 1.25],
            layer: 3,
          }}
          materialProps={{ depthTest: false, color: "#0000FF" }}
        />
      </mesh>
    </>
  );
});

export default TranslateWidget;
