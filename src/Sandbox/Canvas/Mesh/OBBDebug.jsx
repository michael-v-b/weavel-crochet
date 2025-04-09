import {forwardRef,useState} from 'react';
import {useFrame} from "@react-three/fiber";

const OBBDebug = forwardRef(({obbRef,obbDebugColor},ref) => {
    
    OBBDebug.displayName = "OBB Debug";
    const [debugPos, setDebugPos] = useState([0,1,0]);
    const [args,setArgs] = useState([2,2,2]);
    const debug = true;

    useFrame(()=>{
        if(obbRef.current) {
            setDebugPos(obbRef.current.center.toArray());
            const tempArgs = obbRef.current.halfSize.toArray()
            setArgs([tempArgs[0]*2,tempArgs[1]*2,tempArgs[2]*2])
        }
    });



    return <>
        {debug && <mesh ref = {ref} position = {debugPos}>
            <boxGeometry args = {args}/>
            <meshBasicMaterial color = {obbDebugColor} wireframe = {true} />
        </mesh>}</>

});

export default OBBDebug;