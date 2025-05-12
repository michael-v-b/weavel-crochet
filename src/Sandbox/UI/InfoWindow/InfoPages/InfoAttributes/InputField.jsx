
import {forwardRef} from 'react';

/**
 * Component made to prevent ctrl+z interference while maintianing ctrl+c and ctrl+v
 * @typedef {InputField}
 * @returns {HTMLElement} - input field that is highly customizable but has ctrl+z and ctrl+y functionality
 * disabled.
 */
const InputField = forwardRef(({...props},ref) => {

    const handleKeyPressed = (event) => {
        if(event.ctrlKey && (event.code == 'KeyZ' || event.code == 'KeyY')) {
            event.preventDefault();
        }
    }

    return <input ref = {ref} onKeyDown ={handleKeyPressed}{...props}/>
});

export default InputField;