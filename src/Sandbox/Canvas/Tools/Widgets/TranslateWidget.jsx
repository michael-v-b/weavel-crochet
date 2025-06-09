import { useFrame, useThree} from "@react-three/fiber";
import  {forwardRef,useState,useEffect} from "react";
import IBox from "../../Mesh/InteractiveMeshes/IBox.jsx";
import ILine from "../../Mesh/InteractiveMeshes/ILine.jsx";
import useStore from  "../../../DevTools/store";

/**
 *@typedef {TranslateWidget} - The visual element of the Rotater
 *@returns {Component} - a component with 3 lines, red, green, and blue,
 *which are associated with the x, y, and z axis respectively
 */
const TranslateWidget = forwardRef(({ ...props }, ref) => {
  TranslateWidget.displayName = "Translate Widget";
  const lineSize = 0.15;
  const [key,setKey] = useState(-1);
  const [onPhone,setOnPhone] = useState(false);
  const meshList = useStore((state)=>state.meshList);
  const { camera } = useThree();
  

  /**
   *updates size of widget to match distance to camera every frame.
   */
  useFrame(() => {
    if (!ref) {
      return;
    }
    const distance = ref.current.position.distanceTo(camera.position);
    const scale = onPhone ? distance/7 : distance / 10;
    ref.current.scale.set(scale, scale, scale);
  });

  //rerenders widget on selection
  useEffect(()=>{
    setKey(key*-1);
  },[meshList]);

  useEffect(()=>{
    const handleResize = () => {
      if(window.innerHeight > 480) {
        setOnPhone(false);
      } else {
        setOnPhone(true);
      }
    }
    handleResize();
    window.addEventListener('resize',handleResize);

    return () => {window.removeEventListener('resize',handleResize)}
  },[]);

  const LineCone = ({color, axisLock}) => {
    return <mesh position = {[0,1,0]}>
      <coneGeometry args = {[0.25,.5]}userData ={{axisLock:axisLock}} layer = {3}/>
      <meshBasicMaterial depthTest = {false} color = {color}/>
    </mesh>
  }

  return (
    <>
     <mesh ref={ref}  key = {key} {...props} layer={3}>
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
        >
          <LineCone color = "#00FF00" axisLock = "y"/>
        </ILine>

        <ILine
          lineWidth={lineSize}
          meshProps={{
            userData: { axisLock: "x" },
            rotation: [0, 0, -Math.PI / 2],
            position: [1.25, 0, 0],
            layer: 3,
          }}
          materialProps={{ depthTest: false, color: "#FF0000" }}
        >
          <LineCone color = "#FF0000" axisLock = "x"/>
        </ILine>
        <ILine
          lineWidth={lineSize}
          meshProps={{
            userData: { axisLock: "z" },
            rotation: [Math.PI / 2, 0, 0],
            position: [0, 0, 1.25],
            layer: 3,
          }}
          materialProps={{ depthTest: false, color: "#0000FF" }}
        >
          <LineCone axisLock = "z" color = "#0000ff"/>
        </ILine>
      </mesh>
    </>
  );
});

export default TranslateWidget;
