

import {forwardRef,useEffect,useImperativeHandle,useState} from "react";
import useStore from "../../DevTools/store";

const IntersectionManager = forwardRef((_,ref) => {
    IntersectionManager.displayName = "IntersectionManager";
    const meshList = useStore((state)=>state.meshList);
    const selectedMeshes = useStore((state)=>state.selectedMeshes);
    const avgPosition = useStore((state)=>state.avgPosition);
    const draggingNum = useStore((state)=>state.draggingNum);
    const setDraggingNum = useStore((state)=>state.setDraggingNum);

    const [nonSelectedMeshes,setNonSelected] = useState(meshList);
    

    useEffect(()=>{
        
        selectedMeshes.forEach((mesh) => {
            mesh.userData.obbRef.current.center = mesh.position;
        })
        setDraggingNum(draggingNum*-1);
    },[avgPosition]);


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