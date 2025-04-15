

import {useRef,useEffect,useState,forwardRef} from "react";
import {useFrame} from "@react-three/fiber";
import useStore from "../../DevTools/store";
import {DoubleSide} from "three";

const MeshVisuals = forwardRef(({hitboxRef,dependencyList,colorIndex},ref) => {
    MeshVisuals.displayName = "Mesh Visuals";
    const colorList = useStore((state)=>state.colorList);
    const isIntersecting = useStore((state)=>state.isIntersecting);
    const [geo,setGeo] = useState();


    const rerender = () => {
        setGeo(hitboxRef.current.geometry);
    }


    useEffect(()=>{
        rerender();
    },[...dependencyList]);

    useEffect(()=>{
        if(ref?.current) {
            rerender();
        }
    },[ref.current]);


 
    useFrame(()=>{
        if(ref?.current && hitboxRef?.current) {
            
            const visualMesh = ref.current;
            const hitbox = hitboxRef.current;

            //standard syncs
            if(!isIntersecting) {
                if(!visualMesh.position.equals(hitbox.position)) {
                    visualMesh.position.copy(hitbox.position);
                }
                if(!visualMesh.rotation.equals(hitbox.rotation)) {
                    visualMesh.rotation.copy(hitbox.rotation);
                }
            }

        }
    });


    return <mesh ref = {ref}>
        {geo && <primitive object = {geo}/>}
        <meshStandardMaterial roughness = {1} color = {colorList[colorIndex-1]} side = {DoubleSide}/>
        </mesh>

});

export default MeshVisuals;