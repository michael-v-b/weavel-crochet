import {useThree} from "@react-three/fiber";
import {forwardRef,useImperativeHandle} from 'react';
import {Vector3,Euler} from 'three';

const CameraTracker = forwardRef((_,ref) => {
    CameraTracker.displayName = "CameraTracker";
    const {camera} = useThree();

    const setCameraPosition = (posArray) => {
        console.log("camera");
        console.dir(camera);
        camera.position.copy(new Vector3().fromArray(posArray));
    }

    const setCameraRotation =(rotArray) => {
        camera.rotation.copy(new Euler().fromArray(rotArray));

    }
    const getCameraPosition = () => {
        return camera.position.toArray();
    }

    const getCameraRotation = () => {
        const tempRotation = camera.rotation.toArray();
        return [tempRotation[0],tempRotation[1],tempRotation[2]];
    }


    useImperativeHandle(ref,()=>({getCameraPosition,getCameraRotation,setCameraRotation,setCameraPosition}));

});
export default CameraTracker