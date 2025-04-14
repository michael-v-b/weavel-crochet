

import {useRef,useEffect,useState} from "react";
import {useFrame} from "@react-three/fiber";
import useStore from "../../DevTools/store";
import {DoubleSide} from "three";

const VisualMesh = ({hitboxRef,dependencyList,colorIndex}) => {
    const colorList = useStore((state)=>state.colorList);
    const [geo,setGeo] = useState();
    const ref = useRef(null);


    const rerender = () => {
        setGeo(hitboxRef.current.geometry);
    }

    useEffect(()=>{
        console.log("geo");
    },[geo]);

    useEffect(()=>{
        rerender();
    },[...dependencyList]);

    useEffect(()=>{
        if(ref?.current) {
            rerender();
        }
    },[ref.current]);

    useEffect(()=>{
        console.log("ref");
        console.dir(ref);
    },[]);

    useFrame(()=>{
        if(ref?.current && hitboxRef?.current) {
            
            const visualMesh = ref.current;
            const hitbox = hitboxRef.current;

            //standard syncs
            if(!visualMesh.position.equals(hitbox.position)) {
                console.log("position updated");
                visualMesh.position.copy(hitbox.position);
            }
            if(!visualMesh.rotation.equals(hitbox.rotation)) {
                visualMesh.rotation.copy(hitbox.rotation);
            }

            //specific mesh syncs

        }
    });


    return <mesh ref = {ref}>
        {geo && <primitive object = {geo}/>}
        <meshStandardMaterial roughness = {1} color = {colorList[colorIndex-1]} side = {DoubleSide}/>
        </mesh>

}

export default VisualMesh;