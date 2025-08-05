import {forwardRef} from "react";
import Sec6 from "../../Privacy/Sections/Sec6";

const Sec5 = forwardRef((_,ref)=>{
    return <>
        <h2 ref = {ref}>5. Purchases and Payment</h2>

        <div>All purchases are non-refundable.</div>

        <div>We accept the following forms of payment:</div>
        <ul>
            <li>Paypal</li>
        </ul>
        <div>
            You agree to provide current, complete, and accurate purchase and account information for all purchases made via the 
            Services. You further agree to promptly update account and payment information, including email address, payment method, 
            and payment card expiration date, so that we can complete your transactions and contact you as needed. All payments shall 
            be in US dollars.
        </div>

    </>
});

export default Sec5;