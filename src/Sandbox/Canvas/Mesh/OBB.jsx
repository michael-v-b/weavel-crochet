

const OBB = ({boxDim}) => {

    const debug = true;

    return <mesh>
        <boxGeometry args = {boxDim}/>
        <meshBasicMaterial color = "green" wireframe = {debug}/>
    </mesh>

}

export default OBB;