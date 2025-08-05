import {forwardRef} from 'react';

const Sec12 = forwardRef((_,ref) => {
    return <>
    <h2 ref = {ref}>12. Privacy Policy</h2>

    <div>
        We care about data privacy and security. Please review our Privacy Policy: 
        <span className = "link not-added">weavelcrochet.com/privacy</span>. By using the Services, you agree to be bound by our 
        Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States. 
        If you access the SErvices from any other region of the world with laws or other requirements governing personal data 
        collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the 
        Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and 
        processed in the United States.
    </div>
</>
});

export default Sec12