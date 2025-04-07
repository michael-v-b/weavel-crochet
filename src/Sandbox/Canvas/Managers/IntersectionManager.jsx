

import {forwardRef,useEffect,useImperativeHandle,useState} from "react";
import useStore from "../../DevTools/store";

const IntersectionManager = forwardRef((_,ref) => {
    IntersectionManager.displayName = "IntersectionManager";
    const meshList = useStore((state)=>state.meshList);
    const selectedMeshes = useStore((state)=>state.selectedMeshes);
    const [nonSelectedMeshes,setNonSelected] = useState(meshList);


    //sets all non selected objects when selected meshes changes
    useEffect(()=>{
        const tempNonSelect = [];
        meshList.forEach((mesh)=>{
            if (!selectedMeshes.includes(mesh)) {
                tempNonSelect.push(mesh);
            }
        });
        setNonSelected(...tempNonSelect);

    },[selectedMeshes]);

    const intersectsObjects = () => {
        nonSelectedMeshes.forEach((nonSelectedMesh) => {
            selectedMeshes.forEach((selectedMesh)=> {
                if(selectedMesh.OBB.intersectObjects(nonSelectedMesh.OBB)) {
                    return true;
                }
            });
        });
        return false;
    }

    useImperativeHandle(ref,()=>(intersectsObjects));
});

export default IntersectionManager