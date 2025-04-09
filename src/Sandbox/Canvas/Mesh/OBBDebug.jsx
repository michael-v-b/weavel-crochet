import {forwardRef,useState} from 'react';
import {useFrame} from "@react-three/fiber";

const OBBDebug = forwardRef(({obbRef,obbDebugColor},ref) => {
    
    OBBDebug.displayName = "OBB Debug";
    const [debugPos, setDebugPos] = useState([0,1,0]);
    const debug = true;

    useFrame(()=>{
        if(obbRef.current) {
            setDebugPos(obbRef.current.center.toArray());
        }
    });



    return <mesh ref = {ref} position = {debugPos}>
        <boxGeometry args = {[2,2,2]}/>
        <meshBasicMaterial color = {obbDebugColor} wireframe = {debug}/>
    </mesh>

});

export default OBBDebug;