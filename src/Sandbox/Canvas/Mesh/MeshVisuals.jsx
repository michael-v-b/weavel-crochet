

import {useRef,useEffect,useState,forwardRef} from "react";
import {useFrame} from "@react-three/fiber";
import useStore from "../../DevTools/store";
import {DoubleSide} from "three";

/**
 * @typedef {MeshVisuals} - the visual component of the mesh, the main mesh is simply a hitbox.
 * @returns {Mesh}
 */
const MeshVisuals = forwardRef(({hitboxRef,dependencyList,colorIndex},ref) => {
    MeshVisuals.displayName = "Mesh Visuals";
    const colorList = useStore((state)=>state.colorList);
    const isIntersecting = useStore((state)=>state.isIntersecting);
    const [geo,setGeo] = useState();


    /**
     * Rerender geometry when it changes.
     */
    const rerender = () => {
        setGeo(hitboxRef.current.geometry);
    }


    /**
     * Rerender visuals whenever something affects their meshes.
     */
    useEffect(()=>{
        rerender();
    },[...dependencyList]);

    //run initial rerender
    useEffect(()=>{
        if(ref?.current) {
            rerender();
        }
    },[ref.current]);


    
    //update visuals every frame.
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