

import {useRef,useEffect} from "react";
import {useFrame} from "@react-three/fiber";

const VisualMesh = ({hitboxRef}) => {

    const ref = useRef(null);

    useEffect(()=>{
        console.log("hitboxRef");
        console.dir(hitboxRef);
    },[])

    useEffect(()=>{
        console.log("ref");
        console.dir(ref);
    },[])

    useFrame(()=>{
    
        if(ref?.current && hitboxRef?.current) {
            ref.current.position.copy(hitboxRef.current.position.clone());

        }
    })
    return <mesh ref = {ref}>
        <boxGeometry/>
        </mesh>

}

export default VisualMesh;