

import {forwardRef,useEffect,useImperativeHandle,useState} from "react";
import {useFrame} from "@react-three/fiber";
import useStore from "../../DevTools/store";

const IntersectionManager = forwardRef((_,ref) => {
    
    IntersectionManager.displayName = "IntersectionManager";
    const meshList = useStore((state)=>state.meshList);
    const selectedMeshes = useStore((state)=>state.selectedMeshes);
    const avgPosition = useStore((state)=>state.avgPosition);

    const [nonSelectedMeshes,setNonSelected] = useState(meshList);
    
  



    //sets all non selected objects when selected meshes changes
    useEffect(()=>{
        const tempNonSelect = [];
        meshList.forEach((mesh)=>{
            if (!selectedMeshes.includes(mesh)) {
                tempNonSelect.push(mesh);
            }
        });
        setNonSelected([...tempNonSelect]);

    },[selectedMeshes]);



});

export default IntersectionManager