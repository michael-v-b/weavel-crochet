
import {useImperativeHandle,forwardRef} from 'react';
import {useThree} from '@react-three/fiber';

const Screenshotter = forwardRef(({},ref)=> {
    const {gl,scene,camera} = useThree();

    const takeScreenshot = () => {
        gl.render(scene,camera);

        return gl.domElement.toDataURL('image/png');
    }

    useImperativeHandle(ref,()=>({takeScreenshot}));
});

export default Screenshotter;