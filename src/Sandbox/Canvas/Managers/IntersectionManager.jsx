

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
    
  

    
    
    const testIntersectionDrag =() => {
        for(let i = 0; i < selectedMeshes.length;i++) {
            const selectedMesh = selectedMeshes[i];
            
            const obbA = selectedMesh.userData.obbRef.current;
            const aData = selectedMesh.userData;

            for(let j = 0 ;j < nonSelectedMeshes.length; j++) {
                const nonSelectedMesh = nonSelectedMeshes[j];
                
                const bData = nonSelectedMesh.userData;
                const obbB = bData.obbRef.current;
                if(obbA.intersectsOBB(obbB)) {
                    console.log("intersects and returns true");
                    aData.setOBBDebugColor('red');
                    bData.setOBBDebugColor('red');
                    return true;
                
                } else {
                    aData.setOBBDebugColor('green');
                    bData.setOBBDebugColor('green');
                }
            };
        };
        console.log("returns false");
        return false;
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

   /*useFrame(()=>{
        if(isDragging) {
            testIntersectionDrag();
        }
    })*/

    useImperativeHandle(ref,()=>({testIntersectionDrag}));



});

export default IntersectionManager