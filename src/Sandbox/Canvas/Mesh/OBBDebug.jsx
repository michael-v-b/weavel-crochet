import {forwardRef, useEffect,useState} from 'react';
import useStore from "../../DevTools/store";

const OBBDebug = forwardRef(({obbRef},ref) => {
    OBBDebug.displayName = "OBB Debug";
    const [debugPos, setDebugPos] = useState([0,1,0]);
    const draggingNum = useStore((state)=>state.draggingNum);

    const debug = true;

    useEffect(()=>{
        if(obbRef.current) {
            setDebugPos(obbRef.current.center);
        }
    },[obbRef?.current]);
    
    useEffect(()=>{
        console.log("center changes");
        if(obbRef.current) {
            setDebugPos(obbRef.current.center.toArray());
        }
    },[draggingNum]);


    return <mesh ref = {ref} position = {debugPos}>
        <boxGeometry args = {[2,2,2]}/>
        <meshBasicMaterial color = "green" wireframe = {debug}/>
    </mesh>

});

export default OBBDebug;