
import {forwardRef,useState,useRef,useImperativeHandle,useEffect} from "react";
import useStore from "../../DevTools/store";
import {Vector3,Box3} from "three";
import {useFrame} from "@react-three/fiber";



const BVH = forwardRef(({meshRef,position},ref) => {
    BVH.displayName = "BVH";

    const [dim,setDim] = useState([1,1,1]);
    const [pos,setPos] = useState(position? position : [0,0,0]);
    const [debugColor, setDebugColor] = useState('green');
    const boxRef = useRef(null);



    const testIntersection = (otherBVH) => {
        const output = boxRef.current.intersectsBox(otherBVH.boxRef.current);
        setDebugColor(output ? 'red' : 'green');
        otherBVH.setDebugColor(output ? 'red' : 'green');
        return output;
    }

    

    useFrame(()=>{
        if(meshRef.current) {
            if(!boxRef.current) {
                boxRef.current = new Box3().setFromObject(meshRef.current,true);
            } else {
                boxRef.current.setFromObject(meshRef.current,true);
            }
            
            const hi = boxRef.current.max;
            const lo = boxRef.current.min;
            setDim([hi.x-lo.x,hi.y-lo.y,hi.z-lo.z])
            setPos(boxRef.current.getCenter(new Vector3(0,0,0)).toArray());
        }
    })


    useImperativeHandle(ref,()=>({testIntersection,setDebugColor,boxRef}));

    return <>
        <mesh position = {pos}>
            <boxGeometry args = {dim}/>
            <meshBasicMaterial wireframe = {true} color = {debugColor}/>
        </mesh>
    </>

});

export default BVH;