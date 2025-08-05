import {forwardRef} from 'react';

const Sec3 = forwardRef((_,ref) => {
    return <>
        <h2 ref = {ref}>3. User Representations</h2>

        <div>
            By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate,
             current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration 
             information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are 
             not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human 
             means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorized 
             purpose; and (7) your use of the Services will not violate any applicable law or regulation.
        </div>

        <div>
            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or 
            terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
        </div>

    </>
})

export default Sec3;