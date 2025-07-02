import {useEffect,forwardRef,useImperativeHandle} from 'react';

/**
 * 
 * @returns Div shows up after hover
 */
const MouseHover = forwardRef(({},ref) => {

    const startTimer = (element) => {
        console.log("start timer for " + element);
    }

    useImperativeHandle(ref,()=>({startTimer}));

    return <div>
        This happens.
    </div>
});

export default MouseHover;