

import {useRef,useEffect,useState,forwardRef} from "react";
import {Outlines} from '@react-three/drei';
import {useFrame} from "@react-three/fiber";
import useStore from "../../DevTools/store";
import {DoubleSide} from "three";

/**
 * @typedef {MeshVisuals} - the visual component of the mesh, the main mesh is simply a hitbox.
 * @returns {Mesh}
 */
const MeshVisuals = forwardRef(({hitboxRef,selected, dependencyList,colorIndex},ref) => {
    MeshVisuals.displayName = "Mesh Visuals";
    const colorList = useStore((state)=>state.colorList);
    const isIntersecting = useStore((state)=>state.isIntersecting);
    const [geo,setGeo] = useState();
    const [isEye,setEye] = useState(false);
    const [eyeSize,setEyeSize] = useState(0);
    const [outlineWeight,setOutlineWeight] = useState(1);
    const [outlineColor,setOutlineColor] = useState('black');


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
        if(hitboxRef?.current?.userData?.meshType =='eye') {
            setEye(true);
            const tempEyeSize = hitboxRef.current.userData.meshData.size;
            setEyeSize((tempEyeSize/2.5/10));
        }
        
    },[...dependencyList]);

    //run initial rerender
    useEffect(()=>{
        if(ref?.current) {
            rerender();
        }
    },[ref.current]);

    useEffect(()=>{
        if(hitboxRef?.current?.userData?.meshType =='eye') {
            setEye(true);
            const tempEyeSize = hitboxRef.current.userData.meshData.size;
            setEyeSize((tempEyeSize/2.5/10));
        }
    },[hitboxRef]);

    useEffect(()=>{
        setOutlineWeight(selected ?  5 : 1);
        setOutlineColor(selected ? "#ff8800": 'black');
    },[selected]);



    
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
        {!isEye && <meshStandardMaterial roughness = {1} color = {colorList[colorIndex-1]} side = {DoubleSide}/>}
        {isEye && <>
        <meshStandardMaterial roughness = {0.15} metalness = {20} color = 'black'/>
        <mesh rotation = {[Math.PI,0,0]} position = {[0,-eyeSize/5,0]}>
            <coneGeometry args = {[eyeSize/5,eyeSize/2]}/>
            <meshStandardMaterial color = "black"/>
        </mesh>
        </>}
        
        {geo && <Outlines thickness = {outlineWeight} color = {outlineColor}/>}
        </mesh>

});

export default MeshVisuals;