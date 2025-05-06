

import AuthTester from "../../AuthTester";
import "./verification.css";

const Verification = () => {
    return (
    <>
    <AuthTester reverse = {true} reroute ={"/projects"}/>
    <div className = "web-container center">
        <div className = "register-window center">
            <div className=  "verification-text">
                Please verify your account by clicking the link in your email.
            </div>
        </div>
    </div>
    </>);
}

export default Verification;