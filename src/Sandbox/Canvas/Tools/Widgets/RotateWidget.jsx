import IRing from "../../Mesh/InteractiveMeshes/IRing";
import IBall from "../../Mesh/InteractiveMeshes/IBall";
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
  const meshList = useStore((state)=>state.meshList);
  const [key,setKey] = useState(1);
  const { camera } = useThree();
  const [xPos,setXPos] = useState([0,0,2]);
  const [yPos,setYPos] = useState([2,0,0]);
  const [zPos,setZPos] = useState([0,2,0]);
  const [onPhone,setOnPhone] = useState(false);
  const widgetRef = useRef(null);
  const lineWidth = 0.05;
  const transparency = 0.65;

  /**
   *updates size of widget to match distance to camera every frame.
   */
  useFrame(() => {
    if (!widgetRef.current) {
      return;
    }
    const distance = widgetRef.current.position.distanceTo(camera.position);
    const scale = onPhone ? distance/7 : distance / 10;
    widgetRef.current.scale.set(scale, scale, scale);
  });

  //rerender widget on changed selection
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



  useImperativeHandle(ref, () => ({ widgetRef,setXPos,setYPos,setZPos }));
  return (
    <>
      <mesh ref={widgetRef} key = {key} {...props}>
        {
          //X RING
        }
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
            transparent:true,
            opacity:transparency
          }}
        />
        <IBall 
      
        dim ={0.33}
        meshProps ={{position: xPos,userData: {axis:"x"},layer: 3}}
        materialProps = {{depthTest:false,color:"#FF0000",transparent:true,opacity:transparency}}/>

        {
          //Z AXIS
        }

        <IRing
          lineWidth={lineWidth}
          meshProps={{ layer: 3, userData: { axis: "z" } }}
          materialProps={{ color: "#0000FF", depthTest: false,transparent:true,opacity:transparency }}
        />
        <IBall dim = {0.33} meshProps = {{position: zPos, layer:3,userData:{axis:"z"}}} 
        materialProps = {{color:"#0000FF",depthTest:false,transparent:true,opacity:transparency}}/>

        {
          //Y AXIS
        }

        <IBall dim = {0.33} meshProps = {{position: yPos, layer:3, userData: {axis:"y"}}} 
        materialProps = {{color:"#00FF00",depthTest:false,transparent:true,opacity:transparency}}/>
        <IRing
          lineWidth={lineWidth}
          meshProps={{
            rotation: [Math.PI / 2, 0, 0],
            layer: 3,
            userData: { axis: "y" },
          }}
          materialProps={{ color: "#00FF00", depthTest: false,transparent:true,opacity:transparency}}
        />
      </mesh>
    </>
  );
});
export default RotateWidget;
