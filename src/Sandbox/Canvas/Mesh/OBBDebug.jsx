import {forwardRef,useState,useRef,useEffect} from 'react';
import {useFrame} from "@react-three/fiber";
import {Matrix4,Euler} from "three";

const OBBDebug = ({obbRef,obbDebugColor}) => {
    
    const debugRef = useRef(null);
    const [debugPos, setDebugPos] = useState([0,1,0]);
    const [args,setArgs] = useState([2,2,2]);
    const debug = true;

    useFrame(()=>{
        if(obbRef.current ) {
            setDebugPos(obbRef.current.center.toArray());
            const tempArgs = obbRef.current.halfSize.toArray()
            setArgs([tempArgs[0]*2,tempArgs[1]*2,tempArgs[2]*2])
            if(debugRef) {
                const tempMatrix3 = obbRef.current.rotation;
                const rotationMatrix = new Matrix4().setFromMatrix3(tempMatrix3);
                const tempEuler = new Euler().setFromRotationMatrix(rotationMatrix);
                debugRef.current.setRotationFromEuler(tempEuler);
            }
        }
    });




    return <>
        {debug && <mesh ref = {debugRef} position = {debugPos}>
            <boxGeometry args = {args}/>
            <meshBasicMaterial color = {obbDebugColor} wireframe = {true} />
        </mesh>}</>

};

export default OBBDebug;