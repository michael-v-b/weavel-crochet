

import {forwardRef,useEffect,useImperativeHandle,useState} from "react";
import {useFrame} from "@react-three/fiber";
import useStore from "../../DevTools/store";

const IntersectionManager = forwardRef((_,ref) => {
    
    IntersectionManager.displayName = "IntersectionManager";
    const meshList = useStore((state)=>state.meshList);
    const selectedMeshes = useStore((state)=>state.selectedMeshes);
    const avgPosition = useStore((state)=>state.avgPosition);
    const isDragging = useStore((state)=>state.isDragging);

    const [nonSelectedMeshes,setNonSelected] = useState(meshList);
    
  

    const testIntersection =() => {
       
        selectedMeshes.forEach((selectedMesh) => {
            
            const obbA = selectedMesh.userData.obbRef.current;
            const aData = selectedMesh.userData;
            nonSelectedMeshes.forEach((nonSelectedMesh) => {
                
                const bData = nonSelectedMesh.userData;
                const obbB = bData.obbRef.current;
                if(obbA.intersectsOBB(obbB)) {
                    console.log(selectedMesh.name + " and " + nonSelectedMesh.name + " intersect");
                    aData.setOBBDebugColor('red');
                    bData.setOBBDebugColor('red');
                
                } else {
                    console.log(selectedMesh.name + " and " + nonSelectedMesh.name + " don't intersect");
                    aData.setOBBDebugColor('green');
                    bData.setOBBDebugColor('green');
                }
            });
        })
    }


    //sets all non selected objects when selected meshes changes
    useEffect(()=>{
        const tempNonSelect = [];
        meshList.forEach((mesh)=>{
            if (!selectedMeshes.includes(mesh)) {
                tempNonSelect.push(mesh);
            }
        });
        setNonSelected([...tempNonSelect]);

    },[selectedMeshes,meshList]);

    useFrame(()=>{
        if(isDragging) {
            testIntersection();
        }
    })

    useImperativeHandle(ref,()=>(testIntersection));



});

export default IntersectionManager