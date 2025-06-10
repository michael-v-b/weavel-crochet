import { useFrame, useThree} from "@react-three/fiber";
import  {forwardRef,useState,useEffect} from "react";
import IBox from "../../Mesh/InteractiveMeshes/IBox.jsx";
import ILine from "../../Mesh/InteractiveMeshes/ILine.jsx";
import IPlane from "../../Mesh/InteractiveMeshes/IPlane.jsx";
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
  const transparency = 0.4;
  const planeTransparency = 0.3;
  const planeDistance = 1.8;
  const planeDim = 1.5;
  

  /**
   *updates size of widget to match distance to camera every frame.
   */
  useFrame(() => {
    if (!ref) {
      return;
    }
    const distance = ref.current.position.distanceTo(camera.position);
    const scale = onPhone ? distance/7 : distance / 12;
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
    return <mesh position = {[0,1,0]} layer = {3} userData ={{axisLock:axisLock}}>
      <coneGeometry args = {[0.25,.5]} />
      <meshBasicMaterial depthTest = {false} color = {color} transparent = {true} opacity = {transparency}/>
    </mesh>
  }

  return (
    <>
     <mesh ref={ref}  key = {key} {...props} layer={3}>
      {/**PLANES WIDGET */}

      <IPlane dim = {planeDim} meshProps = {
        {position:[planeDistance,planeDistance,0],
        layer:3,
        userData: {axisLock:"xy"}}}
        materialProps = {{
          color:"#FF0000",
          depthTest:false,
          transparent:true,
          opacity:planeTransparency
        }}
      />

      <IPlane dim = {planeDim} meshProps = {
        {position:[0,planeDistance,planeDistance],
        rotation:[0,Math.PI/2,0],
        layer:3,
        userData: {axisLock:"yz"}}}
        materialProps = {{
          color:"#00FF00",
          depthTest:false,
          transparent:true,
          opacity:planeTransparency
        }}
      />

      <IPlane dim = {planeDim} meshProps = {
        {position:[planeDistance,0,planeDistance],
        rotation:[-Math.PI/2,0,0],
        layer:3,
        userData: {axisLock:"xz"}}}
        materialProps = {{
          color:"#0000FF",
          depthTest:false,
          transparent:true,
          opacity:planeTransparency
        }}
      />

      {/**MAIN TRANSLATER WIDGET========================================================== */}
        <IBox
          dim={0.5}
          meshProps={{
            userData: { axisLock: "none" },
            layer: 3,
          }}
          materialProps={{ color: "#ffffff", depthTest: false,transparent:true,opacity:transparency }}
        />

        <ILine
          lineWidth={lineSize}
          meshProps={{
            userData: { axisLock: "y" },
            position: [0, 1.25, 0],
            layer: 3,
          }}
          materialProps={{ depthTest: false, color: "#00FF00",transparent:true,opacity:transparency}}
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
          materialProps={{ depthTest: false, color: "#FF0000",transparent:true,opacity:transparency }}
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
          materialProps={{ depthTest: false, color: "#0000FF",transparent:true,opacity:transparency }}
        >
          <LineCone axisLock = "z" color = "#0000ff"/>
        </ILine>
      </mesh>
    </>
  );
});

export default TranslateWidget;
