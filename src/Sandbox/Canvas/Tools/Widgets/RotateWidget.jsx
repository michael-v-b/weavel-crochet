import IRing from "../../Mesh/InteractiveMeshes/IRing";
import { forwardRef, useRef, useImperativeHandle, useEffect,useState} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../../../DevTools/store";

/**
 *@typedef {RotateWidget} - The visual element of the Rotater
 *@returns {Component} - a component with 3 toruses, red, green, and blue,
 *which are associated with the x, y, and z axis respectively
 */
const RotateWidget = forwardRef(({ ...props }, ref) => {
  RotateWidget.displayName = "Rotate Widget";
  const selectedMeshes = useStore((state)=>state.selectedMeshes);
  const [isVisible,setVisible] = useState(true);
  const { camera } = useThree();
  const widgetRef = useRef(null);
  const lineWidth = 0.05;

  /**
   *updates size of widget to match distance to camera every frame.
   */
  useFrame(() => {
    if (!widgetRef.current) {
      return;
    }
    const distance = widgetRef.current.position.distanceTo(camera.position);
    const scale = distance / 10;
    widgetRef.current.scale.set(scale, scale, scale);
  });

  //initiate blink to rerender widget so it appears on top of newly created objects
  useEffect(()=>{
    setVisible(false);
  },[selectedMeshes])
  //blink
  useEffect(()=>{
    if(!isVisible) {
      setVisible(true)
    }
  },[isVisible])

  useImperativeHandle(ref, () => ({ widgetRef }));
  return (
    <>
      {isVisible && <mesh ref={widgetRef} {...props}>
        <IRing
          lineWidth={lineWidth}
          meshProps={{
            renderOrder: 999,
            rotation: [0, Math.PI / 2, 0],
            layer: 3,
            userData: { axis: "x" },
          }}
          materialProps={{
            depthTest: false,
            color: "#FF0000",
            opacity: 0,
          }}
        />
        <IRing
          lineWidth={lineWidth}
          meshProps={{ layer: 3, userData: { axis: "z" } }}
          materialProps={{ color: "#0000FF", depthTest: false }}
        />
        <IRing
          lineWidth={lineWidth}
          meshProps={{
            rotation: [Math.PI / 2, 0, 0],
            layer: 3,
            userData: { axis: "y" },
          }}
          materialProps={{ color: "#00FF00", depthTest: false }}
        />
      </mesh>}
    </>
  );
});
export default RotateWidget;
