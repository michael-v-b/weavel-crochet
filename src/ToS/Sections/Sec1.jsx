import {forwardRef} from 'react';

const Sec1 = forwardRef((_,ref) => {
    return <>
        <h2 ref = {ref}>1. Our Services</h2>
        <div>
            The information provided when using the Services is not intended for distribution to or use by any person or entity in any 
            jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to 
            any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services 
            from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the 
            extent local laws are applicable.
        </div>

        <div>
            The services are not tailored to comply with industry-specific regulations (Heal Insurance Portability and Accountability 
            Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such 
            laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Billey Act 
            (GLBA).
        </div>
    </>
});

export default Sec1;