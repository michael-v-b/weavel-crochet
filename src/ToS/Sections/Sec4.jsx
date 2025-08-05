import {forwardRef} from "react";

const Sec4 = forwardRef((_,ref)=>{
    return <>
    <h2 ref = {ref}>4. User Registration</h2>

    <div>
        You may be required to register to use the Services. You agree to keep your password confidential and will be responsible 
        for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we 
        determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
    </div>
</>
});

export default Sec4;