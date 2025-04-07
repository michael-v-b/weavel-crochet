import {forwardRef} from "react";

const OBBDebug = forwardRef(({boxDim},ref) => {
    OBBDebug.displayName = "OBB Debug";
    

    const debug = true;

    return <mesh ref = {ref}>
        <boxGeometry args = {boxDim}/>
        <meshBasicMaterial color = "green" wireframe = {debug}/>
    </mesh>

});

export default OBBDebug;